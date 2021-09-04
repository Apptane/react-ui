import { resolveBackgroundColor, resolveBorderColor, resolveTextColor } from "@apptane/react-ui-core";
import memoize from "memoizee";
import { TooltipTheme } from "./TooltipTheme.types";

const DefaultTooltipTheme: TooltipTheme = {
  style: {
    maxWidth: 280,
    borderRadius: 6,
    contentSpacing: 8,
    padding: {
      t: 12,
      l: 16,
    },
    arrowSize: 5,
    opacity: 1,
    font: {
      header: {
        category: "content",
        size: "medium",
        weight: "bold",
      },
      body: {
        category: "content",
        size: "medium",
        weight: "regular",
      },
    },
  },
  appearance: memoize((palette, mode, appearance) => ({
    text: resolveTextColor(palette, appearance === "default" ? "contrast" : "default"),
    back: resolveBackgroundColor(palette, appearance === "default" ? "contrast" : "default"),
    border: resolveBorderColor(palette, appearance === "default" ? "contrast" : "default"),
    elevation: mode === "light" ? 1 : undefined,
  })),
};

/**
 * Default theme: Tooltip
 */
export default DefaultTooltipTheme;
