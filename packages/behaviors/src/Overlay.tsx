import { AnimationStyle, convertToPixels } from "@apptane/react-ui-core";
import { useFocusCapture, useLockBodyScroll } from "@apptane/react-ui-hooks";
import { useColorMode, useTheme } from "@apptane/react-ui-theme";
import { css } from "@emotion/react";
import { Children, cloneElement, Fragment, isValidElement, useCallback, useEffect, useRef } from "react";
import FocusLock from "react-focus-lock";
import Transition from "react-transition-group/Transition";
import { OverlayProps, OverlayPropTypes } from "./Overlay.types";
import Portal from "./Portal";
import { StyleBackdrop } from "./Styles";

const StyleTransition = (animation: AnimationStyle, duration: number) => css`
  transition-property: top, right, bottom, left;
  transition-delay: ${animation.delay}ms;
  transition-duration: ${duration ?? animation.duration}ms;
  transition-timing-function: ${animation.function};
`;

const StyleContainer = (
  zindex: number,
  offsetTop: string,
  offsetRight: string,
  offsetBottom: string,
  offsetLeft: string
) => css`
  overflow: hidden;
  position: fixed;
  top: ${offsetTop};
  right: ${offsetRight};
  bottom: ${offsetBottom};
  left: ${offsetLeft};
  z-index: ${zindex};
  pointer-events: none;
`;

/**
 * Implements a behavior for managing components residing in
 * the modal overlay layer, e.g. dialogs.
 */
function Overlay({
  children,
  visible,
  backdrop = true,
  shouldCaptureFocus,
  shouldCloseOnEsc = true,
  onCloseOnEsc,
  onClosing,
  transitionDuration,
  enableBodyScroll,
  shouldCloseOnBackdropClick = false,
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
}: OverlayProps) {
  const theme = useTheme();
  const colorMode = useColorMode();
  const duration = transitionDuration ?? theme.animation.duration;

  // allows component to close itself
  const close = useCallback(() => {
    if (visible && typeof onClosing === "function") {
      onClosing();
    }
  }, [visible, onClosing]);

  const containerRef = useRef<HTMLDivElement>(null);
  useFocusCapture(containerRef, shouldCaptureFocus && visible);
  useLockBodyScroll(!enableBodyScroll);

  // close on Escape key
  // if the onCloseOnEsc callback is defined then invoke it and let
  // it deal with hiding via `close` argument, otherwise just try to
  // forcibly close the overlay
  useEffect(() => {
    if (shouldCloseOnEsc && visible) {
      const onKeyUp = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          if (typeof onCloseOnEsc === "function") {
            onCloseOnEsc(close);
          } else {
            close();
          }
        }
      };

      document.addEventListener("keyup", onKeyUp);
      return () => {
        document.removeEventListener("keyup", onKeyUp);
      };
    }
  }, [shouldCloseOnEsc, onCloseOnEsc, close, visible]);

  return (
    <Portal>
      <Transition
        in={visible}
        appear
        timeout={{
          enter: 0,
          exit: duration,
        }}
        unmountOnExit>
        {(transitionState) => {
          let content: React.ReactElement | null = null;
          if (typeof children === "function") {
            content = children({ close, transitionState });
          } else {
            const child = Children.only(children);
            if (isValidElement(child)) {
              content = cloneElement(child, {
                close,
                transitionState,
              });
            }
          }

          return (
            <div
              ref={containerRef}
              css={[
                StyleContainer(
                  theme.zindex.overlay,
                  convertToPixels(marginTop ?? mt ?? margin ?? m) ?? "0",
                  convertToPixels(marginRight ?? mr ?? margin ?? m) ?? "0",
                  convertToPixels(marginBottom ?? mb ?? margin ?? m) ?? "0",
                  convertToPixels(marginLeft ?? ml ?? margin ?? m) ?? "0"
                ),
                StyleTransition(theme.animation, duration),
              ]}>
              {backdrop ? (
                <Fragment>
                  <div
                    transition-state={transitionState}
                    css={StyleBackdrop(theme.backdrop.appearance(theme.palette[colorMode]), theme.animation, duration)}
                    onClick={shouldCloseOnBackdropClick ? close : undefined}
                  />
                  <FocusLock returnFocus>{content}</FocusLock>
                </Fragment>
              ) : (
                content
              )}
            </div>
          );
        }}
      </Transition>
    </Portal>
  );
}

Overlay.displayName = "Overlay";
Overlay.propTypes = OverlayPropTypes;

export default Overlay;
