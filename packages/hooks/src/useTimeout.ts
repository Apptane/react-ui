import { useCallback, useEffect, useRef } from "react";

/**
 * Hook that invokes callback after a delay.
 *
 * @param callback callback to invoke
 * @param {number} delay delay in milliseconds
 */
export function useTimeout(callback: () => void, delay?: number) {
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();
  const savedCallback = useRef(callback);

  // allows clearing current timeout and restarting
  const reset = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    if (delay != null) {
      timeoutId.current = setTimeout(() => savedCallback.current(), delay);
    }
  }, [delay]);

  const clear = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  }, []);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay != null) {
      reset();
      return clear;
    }
  }, [delay, clear, reset]);

  return { reset, clear };
}
