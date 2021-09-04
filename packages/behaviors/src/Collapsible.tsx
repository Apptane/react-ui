import { AnimationStyle } from "@apptane/react-ui-core";
import { useTheme } from "@apptane/react-ui-theme";
import { css } from "@emotion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Transition from "react-transition-group/Transition";
import { CollapsibleProps, CollapsiblePropTypes } from "./Collapsible.types";

const styleTransition = (animation: AnimationStyle, duration?: number) => css`
  transition-property: height;
  transition-delay: ${animation.delay}ms;
  transition-duration: ${duration ?? animation.duration}ms;
  transition-timing-function: ${animation.function};
  overflow: hidden;

  &[transition-state="entered"] {
    display: block;
  }

  &[transition-state="exited"] {
    display: none;
    height: 0;
  }
`;

/**
 * Returns height of the target element.
 */
function getHeight(elementRef: React.RefObject<HTMLElement>) {
  return elementRef.current ? `${elementRef.current.scrollHeight}px` : "auto";
}

/**
 * Sets node height to zero via style.
 */
function setHeightToZero(node: HTMLElement) {
  node.style.height = "0px";
}

/**
 * Resets transitional styles.
 */
function resetStyle(node: HTMLElement) {
  node.removeAttribute("style");
}

/**
 * `Collapsible` behavior — animates height of the child component between zero and content height.
 */
function Collapsible({ children, open, transitionDuration }: CollapsibleProps) {
  const theme = useTheme();
  const duration = transitionDuration ?? theme.animation.duration;

  const elementRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  const setHeightToElement = useCallback((node) => (node.style.height = getHeight(elementRef)), [elementRef]);

  // transitional logic: toggle style.height between 0 and
  // absolute height extracted from the wrapped element;
  // we reset the style after transition is completed to allow
  // element change its height and not be constrained by
  // the wrapper height, but we have to set it back before
  // transition starts otherwise CSS animation won't work;
  //
  // the catch is that browser needs to detect height style
  // applied, before we can change it to zero, otherwise CSS
  // animation won't trigger -- we use internal state to cause
  // a repaint after the height is set
  //
  // NB: should some optimization interfere with this approach
  // we can add requestAnimationFrame or other delay there

  useEffect(() => {
    if (open) {
      setExpanded(open);
    } else {
      if (elementRef.current) {
        setHeightToElement(elementRef.current);
      }

      setExpanded(false);
    }
  }, [open, setHeightToElement]);

  return (
    <Transition
      in={expanded}
      timeout={{
        enter: duration,
        exit: duration,
      }}
      onEnter={setHeightToZero}
      onEntering={setHeightToElement}
      onEntered={resetStyle}
      onExit={setHeightToElement}
      onExiting={setHeightToZero}
      onExited={resetStyle}>
      {(transitionState) => (
        <div ref={elementRef} transition-state={transitionState} css={styleTransition(theme.animation, duration)}>
          {children}
        </div>
      )}
    </Transition>
  );
}

Collapsible.displayName = "Collapsible";
Collapsible.propTypes = CollapsiblePropTypes;

export default Collapsible;
