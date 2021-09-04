import { convertToPixels, isOneOf, Placement } from "@apptane/react-ui-core";
import { useFocusCapture } from "@apptane/react-ui-hooks";
import { css } from "@emotion/react";
import { Children, cloneElement, isValidElement, useCallback, useEffect, useRef, useState } from "react";
import Positioner, { AnchorProps } from "./Positioner";
import { TriggerProps, TriggerPropTypes } from "./Trigger.types";

const StyleBase = (width: string, inline?: boolean) => css`
  width: ${width};
  display: ${inline ? "inline-block" : "block"};
`;

/**
 * `Trigger` — extends child element with behavior to show
 * the `component` on triggered interaction, e.g., hover or click.
 *
 * Implements a non-visual behavior for managing component visibility
 * in a detached layer (popover). The visibility is triggered via
 * an external event: click, hover, focus. This behavior extends
 * <Positioner /> with focus management - bringing focus into
 * positioned element and returning it back to anchor on hide.
 */
function Trigger({
  children,
  trigger = "manual",
  component,
  visible,
  preventDefault,
  shouldCloseOnClick,
  shouldCloseOnEsc,
  shouldCaptureFocus,
  inline,
  disabled,
  width,
  zIndex,
  ...other
}: TriggerProps) {
  const [componentVisible, setComponentVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  visible = componentVisible || (trigger === "manual" && visible);
  const show = useCallback(() => setComponentVisible(true), [setComponentVisible]);
  const hide = useCallback(() => setComponentVisible(false), [setComponentVisible]);
  const toggle = useCallback(() => setComponentVisible((prevVisible) => !prevVisible), [setComponentVisible]);

  useFocusCapture(containerRef, shouldCaptureFocus && visible);

  // close on Escape key
  useEffect(() => {
    if (shouldCloseOnEsc) {
      const onKeyUp = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setComponentVisible(false);
        }
      };

      document.addEventListener("keyup", onKeyUp);
      return () => {
        document.removeEventListener("keyup", onKeyUp);
      };
    }
  }, [shouldCloseOnEsc, visible]);

  // close on mouse click
  useEffect(() => {
    if (shouldCloseOnClick) {
      const onMouseClick = (event: MouseEvent) => {
        if (!containerRef.current || !containerRef.current.contains(event.target as Element)) {
          setComponentVisible(false);
        }
      };

      document.addEventListener("click", onMouseClick);
      return () => {
        document.removeEventListener("click", onMouseClick);
      };
    }
  }, [shouldCloseOnClick, visible]);

  const createAnchor = ({ ref, visible }: AnchorProps<HTMLElement>): React.ReactNode => {
    if (!children) {
      return null;
    }

    let anchor: React.ReactElement;
    if (typeof children === "function") {
      anchor = children({
        ref,
        toggle,
        visible,
        disabled,
      });
    } else {
      // throws if children contains more than one element
      anchor = Children.only(children) as React.ReactElement;
    }

    const anchorProps: React.HTMLAttributes<HTMLDivElement> = {};

    if (isOneOf("click", trigger)) {
      if (!disabled) {
        if (preventDefault || shouldCloseOnClick) {
          anchorProps.onClick = (event: React.SyntheticEvent) => {
            event.preventDefault();
            event.stopPropagation();
            toggle();
          };
        } else {
          anchorProps.onClick = toggle;
        }
      }
    }

    if (isOneOf("hover", trigger)) {
      anchorProps.onMouseEnter = show;
      anchorProps.onMouseLeave = hide;
    }

    if (isOneOf("focus", trigger)) {
      anchorProps.onFocus = show;
      anchorProps.onBlur = hide;
    }

    // NB: I don't know how to properly handle the use case with forwardRef and HOC
    // see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35834
    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        {...anchorProps}
        css={[StyleBase(convertToPixels(width) ?? "max-content", inline), { zIndex: zIndex }]}>
        {anchor}
      </div>
    );
  };

  return (
    <Positioner {...other} ref={containerRef} visible={visible} anchor={createAnchor}>
      {({ placement }: { placement: Placement }) =>
        typeof component === "function"
          ? component({
              placement: placement,
              close: hide,
            })
          : isValidElement(component)
          ? cloneElement(component, {
              placement: placement,
              close: hide,
            })
          : null
      }
    </Positioner>
  );
}

Trigger.displayName = "Trigger";
Trigger.propTypes = TriggerPropTypes;

export default Trigger;
