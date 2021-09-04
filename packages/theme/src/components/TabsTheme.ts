import { resolveBorderColor, resolveTextColor } from "@apptane/react-ui-core";
import memoize from "memoizee";
import { DefaultAnimation } from "../Animation";
import { TabsTheme, TabsVisualState } from "./TabsTheme.types";

const DefaultTabsTheme: TabsTheme = {
  sizes: {
    default: 48,
    small: 28,
    medium: 36,
    large: 48,
  },
  styles: [
    {
      threshold: 28,
      itemSpacing: 8,
      itemPadding: {
        t: 2,
        l: 6,
      },
      accentHeight: 2,
      accentWidth: 24,
      accentBorderRadius: 4,
      font: {
        category: "control",
        size: "small",
        weight: "medium",
      },
    },
    {
      threshold: 36,
      itemSpacing: 12,
      itemPadding: {
        t: 4,
        l: 12,
      },
      accentHeight: 4,
      accentWidth: 24,
      accentBorderRadius: 6,
      font: {
        category: "control",
        size: "medium",
        weight: "medium",
      },
    },
    {
      itemSpacing: 16,
      itemPadding: {
        t: 10,
        l: 12,
      },
      accentHeight: 4,
      accentWidth: 24,
      accentBorderRadius: 6,
      font: {
        category: "control",
        size: "medium",
        weight: "medium",
      },
    },
  ],
  animation: {
    delay: DefaultAnimation.delay,
    duration: DefaultAnimation.duration,
    function: "linear",
  },
  appearance: memoize((palette) => ({
    border: resolveBorderColor(palette, "divider"),
    [TabsVisualState.Default]: {
      text: palette.text[600],
    },
    [TabsVisualState.Focused]: {
      text: resolveTextColor(palette, "default"),
    },
    [TabsVisualState.Toggled]: {
      text: resolveTextColor(palette, "default"),
      accent: resolveTextColor(palette, "default"),
    },
    [TabsVisualState.Disabled]: {
      text: palette.text[300],
    },
  })),
};

/**
 * Default theme: Tabs
 */
export default DefaultTabsTheme;
