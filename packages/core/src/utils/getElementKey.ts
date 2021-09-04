/**
 * Constructs element key when enumerating child elements.
 */
export function getElementKey(element: { key?: number | string | null }, index: number, prefix = "__k") {
  return element.key || `${prefix}${index}`;
}
