import { resolveBorderColor } from "@apptane/react-ui-core";
import memoize from "memoizee";
import { DefaultAnimation } from "../Animation";
import { PaneTheme } from "./PaneTheme.types";

const DefaultPaneTheme: PaneTheme = {
  style: {
    borderRadius: 6,
  },
  animation: {
    delay: DefaultAnimation.delay,
    duration: DefaultAnimation.duration,
    function: "linear",
  },
  appearance: memoize((palette) => ({
    border: resolveBorderColor(palette, "default"),
    elevation: 1,
  })),
};

/**
 * Default theme: Pane
 */
export default DefaultPaneTheme;
