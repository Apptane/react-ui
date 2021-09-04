import { ComponentWithSizeStyle } from "../ThemeTypes";

/**
 * Finds the visual style that matches the control size.
 */
export function findVisualStyleBySize<T extends ComponentWithSizeStyle>(styles: T[], size: number) {
  const s = styles.find((entry) => !entry.threshold || size <= entry.threshold);
  if (s != null) {
    return s;
  }

  throw new Error("Set of visual styles must contain at least one matching entry");
}
