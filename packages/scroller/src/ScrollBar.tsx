import { coerce } from "@apptane/react-ui-core";
import { ScrollerVisualAppearance, ScrollerVisualStyle, useVisualAppearance } from "@apptane/react-ui-theme";
import { css } from "@emotion/react";
import { useCallback, useEffect, useState } from "react";
import { ScrollBarProps, ScrollBarPropTypes } from "./ScrollBar.types";

const StyleDefault = css`
  cursor: pointer;
  position: absolute;
`;

const StyleVert = (style: ScrollerVisualStyle) => css`
  ${StyleDefault};
  height: 100%;
  width: ${style.thumbSize}px;
  top: 0;
  right: 1px;
`;

const StyleHorz = (style: ScrollerVisualStyle) => css`
  ${StyleDefault};
  width: 100%;
  height: ${style.thumbSize}px;
  bottom: 1px;
  left: 0;
`;

const StyleThumbDefault = (appearance: ScrollerVisualAppearance, style: ScrollerVisualStyle) => css`
  position: relative;
  background: ${appearance.thumb};
  border-radius: ${style.thumbSize}px;
  &:hover,
  &:focus {
    background: ${appearance.active};
  }
`;

const StyleThumbVert = (appearance: ScrollerVisualAppearance, style: ScrollerVisualStyle) => css`
  ${StyleThumbDefault(appearance, style)};
  width: ${style.thumbSize}px;
`;

const StyleThumbHorz = (appearance: ScrollerVisualAppearance, style: ScrollerVisualStyle) => css`
  ${StyleThumbDefault(appearance, style)};
  height: ${style.thumbSize}px;
`;

function getTouchPageOffset(event: TouchEvent | React.TouchEvent, vertical?: boolean) {
  if (event.changedTouches && event.changedTouches.length > 0) {
    const touch = event.changedTouches[0];
    return vertical ? touch.pageY : touch.pageX;
  }
  return 0;
}

function getMousePageOffset(event: MouseEvent | React.MouseEvent, vertical?: boolean) {
  return vertical ? event.pageY : event.pageX;
}

type DragInfo = {
  startPositionPx: number;
};

/**
 * Custom theme-aware scrollbar.
 */
function ScrollBar({
  theme,
  colorMode,
  appearance,
  orientation,
  containerSize,
  scrollAreaOffset,
  scrollAreaSize,
  onChange,
}: ScrollBarProps) {
  const [drag, setDrag] = useState<DragInfo | null>(null);
  const vertical = orientation === "vertical";

  // maximum value the relative scrollbar offset can go up to
  const max = 1 - coerce(containerSize / scrollAreaSize, 0, 1);

  // fires onChange callback with new position expressed as a relative offset (0-max)
  const setScrollPosition = useCallback(
    (position) => {
      if (typeof onChange === "function") {
        onChange(coerce(position, 0, max), orientation);
      }
    },
    [onChange, orientation, max]
  );

  const updateScrollPositionOnDrag = useCallback(
    (offset) => {
      if (drag) {
        const delta = offset - drag.startPositionPx;
        setScrollPosition(delta / containerSize);
      }
    },
    [setScrollPosition, containerSize, drag]
  );

  const pageSize = coerce(containerSize / scrollAreaSize, 0, 1);
  const thumbSizePx = Math.max(theme.components.scroller.style.thumbSize, containerSize * pageSize);
  const thumbOffset = coerce(scrollAreaOffset / scrollAreaSize, 0, 1 - thumbSizePx / containerSize);

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const { top, left, width, height } = event.currentTarget.getBoundingClientRect();
      const offset = vertical ? (event.clientY - top) / height : (event.clientX - left) / width;

      // if clicked above the thumb - go up one page
      // if clicked below the thumb - go down one page
      // otherwise, do nothing
      if (!isNaN(offset)) {
        if (offset < thumbOffset) {
          setScrollPosition(thumbOffset - pageSize);
        } else if (offset > thumbOffset + pageSize) {
          setScrollPosition(thumbOffset + pageSize);
        }
      }
    },
    [setScrollPosition, vertical, thumbOffset, pageSize]
  );

  const startDrag = useCallback(
    (offset) => {
      const thumbOffsetPx = thumbOffset * containerSize;
      setDrag({
        startPositionPx: offset - thumbOffsetPx,
      });
    },
    [setDrag, thumbOffset, containerSize]
  );

  const onMouseStartDrag = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      startDrag(getMousePageOffset(event, vertical));
    },
    [startDrag, vertical]
  );

  const onTouchStartDrag = useCallback(
    (event: React.TouchEvent) => {
      event.preventDefault();
      startDrag(getTouchPageOffset(event, vertical));
    },
    [startDrag, vertical]
  );

  const stopDrag = useCallback(() => setDrag(null), [setDrag]);

  const onMouseDrag = useCallback(
    (event: MouseEvent) => updateScrollPositionOnDrag(getMousePageOffset(event, vertical)),
    [updateScrollPositionOnDrag, vertical]
  );

  const onTouchDrag = useCallback(
    (event: TouchEvent) => updateScrollPositionOnDrag(getTouchPageOffset(event, vertical)),
    [updateScrollPositionOnDrag, vertical]
  );

  useEffect(() => {
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchend", stopDrag);
    document.addEventListener("mousemove", onMouseDrag);
    document.addEventListener("touchmove", onTouchDrag);

    return () => {
      document.removeEventListener("mouseup", stopDrag);
      document.removeEventListener("touchend", stopDrag);
      document.removeEventListener("mousemove", onMouseDrag);
      document.removeEventListener("touchmove", onTouchDrag);
    };
  }, [stopDrag, onMouseDrag, onTouchDrag]);

  const thumbStyle = vertical
    ? {
        top: `${thumbOffset * 100}%`,
        height: `${thumbSizePx}px`,
      }
    : {
        left: `${thumbOffset * 100}%`,
        width: `${thumbSizePx}px`,
      };

  const [visualAppearance] = useVisualAppearance<ScrollerVisualAppearance>("scroller", colorMode, appearance);
  return (
    <div
      css={vertical ? StyleVert(theme.components.scroller.style) : StyleHorz(theme.components.scroller.style)}
      onClick={onClick}
      onTouchStart={onTouchStartDrag}
      onMouseDown={onMouseStartDrag}>
      <div
        css={
          vertical
            ? StyleThumbVert(visualAppearance, theme.components.scroller.style)
            : StyleThumbHorz(visualAppearance, theme.components.scroller.style)
        }
        style={thumbStyle}
      />
    </div>
  );
}

ScrollBar.displayName = "ScrollBar";
ScrollBar.propTypes = ScrollBarPropTypes;

export default ScrollBar;
