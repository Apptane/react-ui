import { useLayoutEffect } from "react";

/**
 * Hook that locks document body scrolling.
 *
 * @param {boolean} effectApplied indicates whether effect should be applied
 */
export function useLockBodyScroll(effectApplied = true) {
  useLayoutEffect(() => {
    if (effectApplied) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [effectApplied]);
}
