import { AnimationStyle, Direction } from "@apptane/react-ui-core";
import { useTheme } from "@apptane/react-ui-theme";
import { css, keyframes } from "@emotion/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Transition from "react-transition-group/Transition";
import StaticToast from "./StaticToast";
import { ToastProps, ToastPropTypes } from "./Toast.types";

/**
 * Keyframes for closing animation.
 */
const animationClose = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.75);
    opacity: 0
  }
`;

/**
 * Keyframes for opening animation.
 */
const animationOpen = (height: number, direction: Direction) => keyframes`
  from {
    opacity: 0;
    transform: translateY(${direction === "down" ? -height : height}px);
  }
  to {
    transform: translateY(0);
  }
`;

// NB: opening animation of the toast combines opacity, translation and
// height animation. Translation is used to create appearance of toast
// sliding in from above into the view, while height animation allows
// the rest of the stack to shift down gradually. Animating height is
// much easier since one should not care about positioning of other
// toasts in the stack. At the same time we cannot use %-based transform
// translation since it depends on the effective animated height, instead
// we compute total height and set translation to its negative value.
// Exiting animation combines opacity, scaling and height animation in
// reverse direction.
//
// The biggest downside to this approach is creation of multiple CSS
// styles for toasts of different height. However, given the toast
// layout we don't expect too much variety in heights.

const StyleTransition = (animation: AnimationStyle) => css`
  transition-property: transform, opacity, height;
  transition-delay: ${animation.delay}ms;
  transition-duration: ${animation.duration}ms;
  transition-timing-function: ${animation.function};
`;

const StyleExitingTransition = (animation: AnimationStyle) => css`
  height: 0;

  &[transition-state="exiting"] {
    height: 0;
    animation: ${animationClose} ${animation.duration}ms ${animation.function} both;
  }

  &[transition-state="exited"] {
    opacity: 0;
  }
`;

const StyleOpeningTransition = (animation: AnimationStyle, height: number, direction: Direction) => css`
  &[transition-state="entering"],
  &[transition-state="entered"] {
    height: ${height}px;
    animation: ${animationOpen(height, direction)} ${animation.duration}ms ${animation.function} both;
  }
`;

/**
 * `Toast` component.
 */
function Toast({
  visible = true,
  zIndex,
  duration = 5,
  onAction,
  onClosed,
  animationDirection = "down",
  ...other
}: ToastProps) {
  const theme = useTheme();
  const animation = theme.components.toast.animation;

  const nodeRef = useRef<HTMLDivElement>(null);
  const [localVisible, setVisible] = useState(true);
  const [height, setHeight] = useState(0);

  visible = visible && localVisible;

  const timerId = useRef<ReturnType<typeof setTimeout>>();
  const startTimer = useCallback(() => {
    timerId.current = setTimeout(() => {
      setVisible(false);
    }, duration * 1000);
  }, [timerId, duration]);

  const clearTimer = useCallback(() => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
  }, [timerId]);

  const autoCloseOnTimer = duration && duration > 0 && visible;

  // initialize timer on mouse, cancel timer when mouse
  // is over the element and restart when it leaves
  useEffect(() => {
    if (autoCloseOnTimer) {
      startTimer();
      return clearTimer;
    }
  }, [startTimer, clearTimer, autoCloseOnTimer]);

  // measure height of the toast
  useLayoutEffect(() => {
    if (nodeRef.current) {
      const { height } = nodeRef.current.getBoundingClientRect();
      setHeight(height);
    }
  }, [nodeRef, setHeight]);

  const handleAction = useCallback(() => {
    const shouldHide = typeof onAction !== "function" || !onAction();
    if (shouldHide) {
      setVisible(false);
    }
    return shouldHide;
  }, [setVisible, onAction]);

  return (
    <Transition
      in={visible}
      appear
      timeout={{
        enter: 0,
        exit: animation.duration,
      }}
      unmountOnExit
      onExited={typeof onClosed === "function" ? onClosed : undefined}>
      {(transitionState) => (
        <div
          transition-state={transitionState}
          css={[
            StyleTransition(animation),
            StyleExitingTransition(animation),
            StyleOpeningTransition(animation, height, animationDirection),
            {
              zIndex: zIndex,
            },
          ]}
          onMouseEnter={autoCloseOnTimer ? clearTimer : undefined}
          onMouseLeave={autoCloseOnTimer ? startTimer : undefined}>
          <div ref={nodeRef} css={{ padding: theme.components.toast.style.margin, pointerEvents: "auto" }}>
            <StaticToast {...other} onAction={handleAction} />
          </div>
        </div>
      )}
    </Transition>
  );
}

Toast.displayName = "Toast";
Toast.propTypes = ToastPropTypes;

export default Toast;
