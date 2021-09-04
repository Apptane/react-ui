/**
 * See: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */

import { useEffect, useRef } from "react";

/**
 * Hook that invokes the callback periodically at the specified time interval.
 *
 * @param callback callback to invoke
 * @param period period in milliseconds, `null` to disable
 */
export function useInterval(callback: () => void, period?: number | null) {
  const savedCallback = useRef(callback);

  // remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // set up the interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (period !== null) {
      const id = setInterval(tick, period);
      return () => clearInterval(id);
    }
  }, [period]);
}
