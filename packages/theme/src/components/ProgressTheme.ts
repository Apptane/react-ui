import { resolveTextColor } from "@apptane/react-ui-core";
import memoize from "memoizee";
import { DefaultAnimation } from "../Animation";
import { ProgressTheme } from "./ProgressTheme.types";

const DefaultProgressTheme: ProgressTheme = {
  style: {
    itemPadding: {
      t: 6,
      l: 12,
    },
    itemSpacing: 16,
    iconSpacing: 8,
    iconSize: 24,
    font: {
      category: "control",
      size: "medium",
      weight: "medium",
    },
  },
  animation: {
    delay: DefaultAnimation.delay,
    duration: DefaultAnimation.duration,
    function: "linear",
  },
  appearance: memoize((palette) => ({
    default: palette.text[600],
    disabled: palette.text[300],
    focused: resolveTextColor(palette, "default"),
    error: resolveTextColor(palette, "error"),
  })),
};

/**
 * Default theme: Progress
 */
export default DefaultProgressTheme;
