import { resolveTextColor } from "@apptane/react-ui-core";
import memoize from "memoizee";
import { FieldLabelTheme } from "./FieldLabelTheme.types";

const DefaultFieldLabelTheme: FieldLabelTheme = {
  style: {
    font: {
      category: "control",
      size: "medium",
      weight: "medium",
    },
  },
  appearance: memoize((palette) => ({
    default: resolveTextColor(palette, "default"),
    disabled: resolveTextColor(palette, "muted"),
    error: resolveTextColor(palette, "error"),
  })),
};

/**
 * Default theme: FieldLabel
 */
export default DefaultFieldLabelTheme;
