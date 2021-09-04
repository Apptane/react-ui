import { useEffect, useState } from "react";
import { useTimeout } from "./useTimeout";

/**
 * Hook that makes a value available after a delay.
 *
 * @param value value to delay
 * @param {number} delay delay in milliseconds
 */
export function useDelayValue<T>(value: T, delay?: number) {
  const [resultValue, setResultValue] = useState<T>();

  const { reset } = useTimeout(() => {
    setResultValue(value);
  }, delay);

  useEffect(() => {
    reset();
  }, [reset, value]);

  return resultValue;
}
