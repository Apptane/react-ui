/**
 * Converts numeric value to CSS pixel-unit string
 * and leaves string-based value intact.
 */
export function convertToPixels(value?: string | number) {
  return value == null ? undefined : typeof value === "string" ? value : `${value}px`;
}
