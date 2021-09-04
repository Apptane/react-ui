import { AnimationStyle, PositionerBaseProps, PositionerBasePropTypes } from "@apptane/react-ui-core";
import { usePositioner } from "@apptane/react-ui-hooks";
import { useColorMode, useTheme } from "@apptane/react-ui-theme";
import { css } from "@emotion/react";
import PropTypes from "prop-types";
import { cloneElement, forwardRef, Fragment, isValidElement, useRef } from "react";
import FocusLock from "react-focus-lock";
import Transition from "react-transition-group/Transition";
import Portal from "./Portal";
import { StyleBackdrop } from "./Styles";

const StyleTransition = (scale: number, animation: AnimationStyle, duration?: number) => css`
  transition-property: opacity, transform;
  transition-delay: ${animation.delay}ms;
  transition-duration: ${duration ?? animation.duration}ms;
  transition-timing-function: ${animation.function};
  visibility: visible;
  z-index: 1040;
  opacity: 0;
  transform: scale(${scale});
  position: fixed;

  &[transition-state="entered"] {
    opacity: 1;
    transform: scale(1);
  }

  &[transition-state="entering"],
  &[transition-state="exiting"] {
    opacity: 0;
    transform: scale((${scale});
  }
`;

export type AnchorProps<T extends HTMLElement> = {
  /**
   * Anchor element reference.
   */
  ref: React.RefObject<T>;

  /**
   * Indicates positioned content visibility.
   */
  visible?: boolean;
};

export interface PositionerProps<T extends HTMLElement> extends PositionerBaseProps {
  /**
   * Indicates whether the positioned element is rendered visible.
   */
  visible?: boolean;

  /**
   * Render function that returns anchor React element.
   * Has the following props: {
   *   ref: anchor element reference,
   *   visible: boolean indicating whether positioned element is visible
   * }
   */
  anchor: (p: AnchorProps<T>) => React.ReactNode;

  /**
   * Positioned content.
   */
  children?: React.ReactNode;
}

/**
 * `Positioner` — positions child element within overlay relative to the anchor element
 * and maintains the position even when the anchor moves.
 */
const Positioner = forwardRef(
  <TAnchor extends HTMLElement>(props: PositionerProps<TAnchor>, ref: React.Ref<HTMLDivElement>) => {
    const {
      children,
      visible,
      anchor,
      placement = "bottom-left",
      offset = 0,
      transitionDuration,
      initialScale = 0.75,
      onShown,
      onClosed,
      backdrop,
    } = props;

    const nodeRef = useRef<HTMLDivElement>(null);
    const anchorRef = useRef<TAnchor>(null);
    const position = usePositioner(anchorRef, nodeRef, placement, offset, visible);

    const theme = useTheme();
    const colorMode = useColorMode();
    const duration = transitionDuration || theme.animation.duration;

    return (
      <Fragment>
        {anchor({ ref: anchorRef, visible })}
        <Portal ref={ref} trapEvents>
          <Transition
            in={visible}
            appear
            timeout={{
              enter: 0,
              exit: duration,
            }}
            unmountOnExit
            onEntered={onShown}
            onExited={typeof onClosed === "function" ? onClosed : undefined}>
            {(transitionState) => {
              const content = (
                <div
                  ref={nodeRef}
                  transition-state={transitionState}
                  css={StyleTransition(initialScale, theme.animation, duration)}
                  style={{
                    left: position.left != null ? Math.round(position.left) : undefined,
                    top: position.top != null ? Math.round(position.top) : undefined,
                    transformOrigin: position.transformOrigin,
                  }}>
                  {typeof children === "function"
                    ? children({
                        placement: position.placement,
                      })
                    : isValidElement(children)
                    ? cloneElement(children, {
                        placement: position.placement,
                      })
                    : null}
                </div>
              );

              return backdrop ? (
                <Fragment>
                  <div
                    transition-state={transitionState}
                    css={StyleBackdrop(theme.backdrop.appearance(theme.palette[colorMode]), theme.animation, duration)}
                  />
                  <FocusLock returnFocus>{content}</FocusLock>
                </Fragment>
              ) : (
                content
              );
            }}
          </Transition>
        </Portal>
      </Fragment>
    );
  }
);

Positioner.displayName = "Positioner";
Positioner.propTypes = {
  ...PositionerBasePropTypes,
  visible: PropTypes.bool,
  anchor: PropTypes.func.isRequired,
};

export default Positioner;
