import { ColorMode, ComponentSize, Intent, Palette, resolveTextColor } from "@apptane/react-ui-core";
import memoize from "memoizee";
import { BadgeTheme } from "./BadgeTheme.types";

function getPrimaryBackColor(palette: Palette, intent: Intent, size: ComponentSize, mode: ColorMode) {
  const saturated = size === "small" || size === "default" || mode === "dark";
  switch (intent) {
    case "success":
      return palette.pigments.green[saturated ? 400 : 300];
    case "warning":
      return palette.pigments.orange[saturated ? 400 : 300];
    case "danger":
    case "error":
      return palette.pigments.red[saturated ? 500 : 400];
    case "neutral":
      return palette.text[saturated ? 500 : 400];
    default:
      return palette.pigments[palette.mapping.accent][saturated ? 500 : 400];
  }
}

function getSecondaryBackColor(palette: Palette, intent: Intent, mode: ColorMode) {
  switch (intent) {
    case "success":
      return palette.pigments.green[mode === "dark" ? 100 : 50];
    case "warning":
      return palette.pigments.orange[mode === "dark" ? 100 : 50];
    case "danger":
    case "error":
      return palette.pigments.red[100];
    case "neutral":
      return palette.text[100];
    default:
      return palette.pigments[palette.mapping.accent][100];
  }
}

function getSecondaryTextColor(palette: Palette, intent: Intent, mode: ColorMode) {
  switch (intent) {
    case "success":
      return palette.pigments.green[400];
    case "warning":
      return palette.pigments.orange[400];
    case "danger":
    case "error":
      return palette.pigments.red[mode === "dark" ? 400 : 500];
    case "neutral":
      return palette.text[500];
    default:
      return palette.pigments[palette.mapping.accent][500];
  }
}

const DefaultBadgeTheme: BadgeTheme = {
  sizes: {
    default: 16,
    small: 16,
    medium: 20,
    large: 28,
  },
  styles: [
    {
      threshold: 16,
      spacing: 6,
      padding: {
        t: 0,
        l: 6,
      },
      borderRadius: 32,
      font: {
        category: "numeric",
        size: "small",
        weight: "medium",
      },
    },
    {
      threshold: 20,
      padding: {
        t: 2,
        l: 6,
      },
      borderRadius: 32,
      spacing: 6,
      font: {
        category: "numeric",
        size: "small",
        weight: "medium",
      },
    },
    {
      padding: {
        t: 4,
        l: 8,
      },
      borderRadius: 32,
      spacing: 6,
      font: {
        category: "content",
        size: "medium",
        weight: "medium",
      },
    },
  ],
  appearance: memoize((palette, mode, appearance, intent, size) => {
    switch (appearance) {
      case "primary":
        return {
          text: resolveTextColor(palette, "contrast"),
          back: getPrimaryBackColor(palette, intent, size, mode),
          bulletVisible: false,
        };
      case "secondary":
        return {
          text: getSecondaryTextColor(palette, intent, mode),
          back: getSecondaryBackColor(palette, intent, mode),
          bulletVisible: false,
        };
      case "minimal":
        return {
          text: resolveTextColor(palette, "default"),
          bulletVisible: true,
        };
      case "inverted":
        return {
          text: resolveTextColor(palette, "default"),
          back: palette.light,
          bulletVisible: false,
        };
    }
  }),
};

/**
 * Default theme: Badge
 */
export default DefaultBadgeTheme;
