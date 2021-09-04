/**
 * Coerces value to be within the specified range.
 */
export function coerce(value: number, min: number, max: number) {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  }

  return value;
}
