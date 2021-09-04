import { Children } from "react";

/**
 * Determines whether children array has at least one non empty child.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hasChildContent(children: any) {
  if (typeof children === "string" || typeof children === "number") {
    return true;
  }

  let hasContent = false;
  Children.forEach(children, (element) => {
    hasContent = hasContent || element != null;
  });

  return hasContent;
}
