import { ComponentSize } from "../CommonTypes";

/**
 * Returns component size in pixels based on the theme.
 * Works with both semantic and numeric size values.
 */
export function getComponentSize(sizes: { [size in ComponentSize]: number }, size?: ComponentSize | number): number {
  if (typeof size === "string") {
    return size ? sizes[size] ?? sizes.default : sizes.default;
  } else {
    return size != null ? size : sizes.default;
  }
}
