/**
 * Checks whether the value is any of values specified as an array or scalar.
 */
export function isOneOf<T>(value: T, of: T[] | T | undefined) {
  return of == null ? false : Array.isArray(of) ? of.indexOf(value) >= 0 : value === of;
}
