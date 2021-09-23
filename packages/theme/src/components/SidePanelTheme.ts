import { resolveBorderColor } from "@apptane/react-ui-core";
import memoize from "memoizee";
import { DefaultAnimation, easeInCubic } from "../Animation";
import { SidePanelTheme } from "./SidePanelTheme.types";

const DefaultSidePanelTheme: SidePanelTheme = {
  style: {
    closeButtonSize: "medium",
    closeButtonMargin: {
      t: 24,
      r: 24,
      b: 0,
      l: 0,
    },
  },
  animation: {
    delay: DefaultAnimation.delay,
    duration: DefaultAnimation.duration,
    function: easeInCubic,
  },
  appearance: memoize((palette) => ({
    border: resolveBorderColor(palette, "default"),
    background: palette.light,
    elevation: 2,
  })),
};

/**
 * Default theme: SidePanel
 */
export default DefaultSidePanelTheme;
