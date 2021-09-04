import { resolveTextColor } from "@apptane/react-ui-core";
import memoize from "memoizee";
import { FormTheme } from "./FormTheme.types";

const DefaultFormTheme: FormTheme = {
  style: {
    labelSpacing: 12,
    hintSpacing: 4,
    fieldSpacing: 24,
    font: {
      hint: {
        category: "content",
        size: "small",
        weight: "regular",
      },
    },
  },
  appearance: memoize((palette) => ({
    hint: resolveTextColor(palette, "muted"),
  })),
};

/**
 * Default theme: Form
 */
export default DefaultFormTheme;
