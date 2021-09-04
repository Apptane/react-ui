import { resolveTextColor } from "@apptane/react-ui-core";
import memoize from "memoizee";
import { HyperlinkTheme, HyperlinkVisualState } from "./HyperlinkTheme.types";

const DefaultHyperlinkTheme: HyperlinkTheme = {
  style: {
    iconSpacing: 4,
  },
  appearance: memoize((palette, mode, appearance) => {
    switch (appearance) {
      case "primary":
        return {
          [HyperlinkVisualState.Default]: {
            text: palette.pigments[palette.mapping.accent][500],
            icon: palette.pigments[palette.mapping.accent][500],
          },
          [HyperlinkVisualState.Focused]: {
            text: palette.pigments[palette.mapping.accent][600],
            icon: palette.pigments[palette.mapping.accent][600],
          },
          [HyperlinkVisualState.Disabled]: {
            text: palette.pigments[palette.mapping.accent][300],
            icon: palette.pigments[palette.mapping.accent][300],
          },
        };
      case "secondary":
        return {
          [HyperlinkVisualState.Default]: {
            text: resolveTextColor(palette, "default"),
            icon: resolveTextColor(palette, "default"),
          },
          [HyperlinkVisualState.Focused]: {
            text: resolveTextColor(palette, "default"),
            icon: resolveTextColor(palette, "default"),
          },
          [HyperlinkVisualState.Disabled]: {
            text: resolveTextColor(palette, "muted"),
            icon: resolveTextColor(palette, "muted"),
          },
        };
      case "inverted":
        return {
          [HyperlinkVisualState.Default]: {
            text: resolveTextColor(palette, "contrast"),
            icon: resolveTextColor(palette, "contrast"),
          },
          [HyperlinkVisualState.Focused]: {
            text: palette.white,
            icon: palette.white,
          },
          [HyperlinkVisualState.Disabled]: {
            text: resolveTextColor(palette, "muted"),
            icon: resolveTextColor(palette, "muted"),
          },
        };
    }
  }),
};

/**
 * Default theme: Hyperlink
 */
export default DefaultHyperlinkTheme;
