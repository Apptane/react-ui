import memoize from "memoizee";
import { BannerTheme } from "./BannerTheme.types";

const DefaultBannerTheme: BannerTheme = {
  style: {
    borderRadius: 6,
    padding: {
      t: 12,
      l: 32,
    },
    contentSpacing: 4,
    actionSpacing: 16,
    iconSpacing: 12,
    iconSize: 24,
    font: {
      header: {
        category: "content",
        size: "medium",
        weight: "bold",
      },
      body: {
        category: "content",
        size: "medium",
        weight: "medium",
      },
    },
  },
  appearance: memoize((palette, mode, _, intent) => {
    switch (intent) {
      case "success":
        return {
          text: palette.pigments.green[800],
          icon: palette.pigments.green[800],
          back: palette.pigments.green[200],
          border: palette.pigments.green[300],
        };
      case "warning":
        return {
          text: palette.pigments.yellow[mode === "dark" ? 900 : 800],
          icon: palette.pigments.yellow[mode === "dark" ? 900 : 800],
          back: palette.pigments.yellow[mode === "dark" ? 400 : 200],
          border: palette.pigments.yellow[mode === "dark" ? 500 : 300],
        };
      case "danger":
      case "error":
        return {
          text: palette.pigments.red[800],
          icon: palette.pigments.red[800],
          back: palette.pigments.red[200],
          border: palette.pigments.red[300],
        };
      case "neutral":
        return {
          text: palette.text[900],
          icon: palette.text[900],
          back: palette.text[100],
          border: palette.text[300],
        };
      default:
        return {
          text: palette.pigments[palette.mapping.accent][800],
          icon: palette.pigments[palette.mapping.accent][800],
          back: palette.pigments[palette.mapping.accent][100],
          border: palette.pigments[palette.mapping.accent][300],
        };
    }
  }),
};

/**
 * Default theme: Banner
 */
export default DefaultBannerTheme;
