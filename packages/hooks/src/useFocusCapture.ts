import { useLayoutEffect } from "react";
import raf from "raf";

/**
 * Hook that brings and captures focus within the element subtree.
 *
 * @param ref element reference
 * @param {boolean} effectApplied indicates whether effect should be applied
 */
export function useFocusCapture<T extends HTMLElement>(ref: React.RefObject<T | undefined>, effectApplied = true) {
  useLayoutEffect(() => {
    if (effectApplied) {
      let prevActiveElement: HTMLElement;
      const animationFrame = raf(() => {
        if (ref.current && typeof document !== "undefined" && document.activeElement) {
          const componentHasFocus = ref.current.contains(document.activeElement);
          if (!componentHasFocus) {
            const focusedElement = (ref.current.querySelector("[data-autofocus]") ||
              ref.current.querySelector("[autofocus]") ||
              ref.current.querySelector("[tabindex]") ||
              ref.current.querySelector("button")) as HTMLElement;

            if (focusedElement) {
              prevActiveElement = document.activeElement as HTMLElement;
              focusedElement.focus();
            }
          }
        }
      });

      return () => {
        raf.cancel(animationFrame);
        raf(() => prevActiveElement && prevActiveElement.focus());
      };
    }
  }, [ref, effectApplied]);
}
