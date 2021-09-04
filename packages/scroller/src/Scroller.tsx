import { Color, composeRefs, StyleMargin, StylePadding } from "@apptane/react-ui-core";
import { useComponentSize } from "@apptane/react-ui-hooks";
import { ScrollerVisualAppearance, ScrollerVisualStyle, useVisualAppearance } from "@apptane/react-ui-theme";
import { css } from "@emotion/react";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { ScrollerProps, ScrollerPropTypes } from "./Scroller.types";

const StyleContainer = (style: ScrollerVisualStyle, thumbColor: Color, trackColor = "transparent") => css`
  flex: 1 1 0;
  position: relative;
  z-index: 0; // establish stacking context
  overflow: auto;
  box-sizing: border-box;
  scrollbar-width: thin;
  scrollbar-color: ${thumbColor} ${trackColor};
  &::-webkit-scrollbar {
    width: ${style.thumbSize}px;
    height: ${style.thumbSize}px;
  }
  &::-webkit-scrollbar-track {
    background: ${trackColor};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${thumbColor};
    border-radius: ${style.thumbSize}px;
    border: ${style.thumbSize * 0.5}px solid ${trackColor};
  }
`;

const StyleShadow = (style: ScrollerVisualStyle) => css`
  z-index: 2;
  position: sticky;
  display: flex;
  content: "";
  left: 0;
  width: 100%;
  height: ${style.shadowSize}px;
`;

const StyleShadowTop = (appearance: ScrollerVisualAppearance, style: ScrollerVisualStyle) => css`
  &::before {
    ${StyleShadow(style)};
    top: -${style.shadowSize + 1}px;
    background: #fff;
    box-shadow: 0 1px 6px 6px ${appearance.shadow};
    border-radius: 0 0 100% 100%;
    margin-top: -${style.shadowSize}px;
  }
`;

const StyleShadowBottom = (appearance: ScrollerVisualAppearance, style: ScrollerVisualStyle) => css`
  &::after {
    ${StyleShadow(style)};
    bottom: -${style.shadowSize + 1}px;
    background: #fff;
    box-shadow: 0 1px 6px 6px ${appearance.shadow};
    border-radius: 100% 100% 0 0;
    margin-bottom: -${style.shadowSize}px;
  }
`;

/**
 * `Scroller` component — container with vertical and horizontal scrolling.
 */
const Scroller = forwardRef((props: ScrollerProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    children,
    colorMode,
    appearance,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    m,
    mt,
    mr,
    mb,
    ml,
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    p,
    pt,
    pr,
    pb,
    pl,
    width,
    height,
    maxWidth,
    maxHeight,
    shadow,
    scrollOffsetX,
    scrollOffsetY,
    onScrollX,
    onScrollY,
  } = props;

  const [visualAppearance, theme] = useVisualAppearance<ScrollerVisualAppearance>("scroller", colorMode, appearance);
  const visualStyle = theme.components.scroller.style;

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const [shadowState, setShadowState] = useState({
    top: false,
    bottom: false,
  });

  // forces re-render when scroll area size changes
  const { width: scrollAreaWidth, height: scrollAreaHeight } = useComponentSize(scrollAreaRef);

  const threshold = visualStyle.shadowThreshold;

  // check container scroll positions and run callbacks accordingly
  const onScroll = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      const scrollTop = container.scrollTop;
      const scrollLeft = container.scrollLeft;

      if (onScrollY && typeof onScrollY === "function") {
        if (scrollTop >= 0 && scrollTop + container.clientHeight <= scrollAreaHeight) {
          onScrollY(scrollTop);
        } else {
          // this prevents scrolling past edges — looks a bit weird on Windows
          // when it does this and you have the bottom shadow showing; however,
          // we probably shouldn't do this for Mac as the expected behavior is
          // to allow the scroll bounce effect to happen
          container.scrollTop = scrollTop < 0 ? 0 : scrollAreaHeight - container.clientHeight;
        }
      }

      if (onScrollX && typeof onScrollX === "function") {
        if (scrollLeft >= 0 && scrollLeft + container.clientWidth <= scrollAreaWidth) {
          onScrollX(scrollLeft);
        } else {
          container.scrollLeft = scrollLeft < 0 ? 0 : scrollAreaWidth - container.clientWidth;
        }
      }

      // update shadows if necessary
      if (shadow) {
        const top = scrollTop - threshold > 0;
        const bottom = scrollTop + threshold <= scrollAreaHeight - container.clientHeight;
        setShadowState((prevShadowState) =>
          prevShadowState.top === top && prevShadowState.bottom === bottom ? prevShadowState : { top, bottom }
        );
      }
    }
  }, [onScrollX, onScrollY, scrollAreaWidth, scrollAreaHeight, shadow, threshold, containerRef]);

  // run onScroll logic when scroll area changes
  useEffect(() => {
    onScroll();
  }, [onScroll]);

  // handle passed in offsets
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // using a timeout here so that children of the scroller have a chance
      // to render before applying the new scroll positions
      setTimeout(() => {
        if (scrollOffsetY != null) {
          container.scrollTop = scrollOffsetY;
        }
        if (scrollOffsetX != null) {
          container.scrollLeft = scrollOffsetX;
        }
      }, 0);
    }
  }, [scrollOffsetX, scrollOffsetY, containerRef]);

  const marginProps = { margin, marginTop, marginRight, marginBottom, marginLeft, m, mt, mr, mb, ml };
  const paddingProps = { padding, paddingTop, paddingRight, paddingBottom, paddingLeft, p, pt, pr, pb, pl };
  return (
    <div
      onScroll={onScroll}
      ref={composeRefs(containerRef, ref)}
      css={[
        StyleContainer(visualStyle, visualAppearance.thumb),
        StyleMargin(marginProps),
        shadowState.top && StyleShadowTop(visualAppearance, visualStyle),
        shadowState.bottom && StyleShadowBottom(visualAppearance, visualStyle),
        {
          width: width ? `${width}px` : "100%",
          height: height ? `${height}px` : "100%",
          maxWidth: maxWidth,
          maxHeight: maxHeight,
        },
      ]}>
      <div css={[StylePadding(paddingProps)]} ref={scrollAreaRef}>
        {children}
      </div>
    </div>
  );
});

Scroller.displayName = "Scroller";
Scroller.propTypes = ScrollerPropTypes;

export default Scroller;
