/**
 * Content placement within the box.
 */
export type Placement =
  | "top"
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | "left"
  | "left-top"
  | "left-middle"
  | "left-bottom"
  | "right"
  | "right-top"
  | "right-middle"
  | "right-bottom";

/**
 * Determines whether the placement indicates top positioning.
 */
export const isTopPlacement = (value: Placement): boolean =>
  value === "top" || value === "top-center" || value === "left-top" || value === "top-left" || value === "right-top";

/**
 * Determines whether the placement indicates bottom positioning.
 */
export const isBottomPlacement = (value: Placement): boolean =>
  value === "bottom" ||
  value === "bottom-center" ||
  value === "left-bottom" ||
  value === "bottom-left" ||
  value === "right-top";
