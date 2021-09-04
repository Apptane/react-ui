import { resolveBorderColor, resolveTextColor } from "@apptane/react-ui-core";
import memoize from "memoizee";
import { DividerTheme, DividerVisualState } from "./DividerTheme.types";

const DefaultDividerTheme: DividerTheme = {
  style: {
    spacing: 8,
    font: {
      category: "header",
      size: "xsmall",
      weight: "bold",
    },
  },
  appearance: memoize((palette) => ({
    [DividerVisualState.Default]: {
      text: resolveTextColor(palette, "muted"),
      border: resolveBorderColor(palette, "divider"),
    },
    [DividerVisualState.Focused]: {
      text: palette.text[600],
      border: palette.text[600],
    },
  })),
};

/**
 * Default theme: Divider
 */
export default DefaultDividerTheme;
