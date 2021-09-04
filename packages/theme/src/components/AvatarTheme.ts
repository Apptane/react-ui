import { resolveBackgroundColor, resolveTextColor } from "@apptane/react-ui-core";
import memoize from "memoizee";
import { AvatarTheme } from "./AvatarTheme.types";

const DefaultAvatarTheme: AvatarTheme = {
  sizes: {
    default: 32,
    small: 24,
    medium: 32,
    large: 40,
  },
  styles: [
    {
      threshold: 24,
      borderRadius: 4,
      borderWidth: 1,
      font: {
        category: "content",
        size: "xsmall",
        weight: "regular",
      },
    },
    {
      threshold: 32,
      borderRadius: 6,
      borderWidth: 2,
      font: {
        category: "content",
        size: "small",
        weight: "medium",
      },
    },
    {
      borderRadius: 6,
      borderWidth: 2,
      font: {
        category: "content",
        size: "medium",
        weight: "medium",
      },
    },
  ],
  appearance: memoize((palette, mode, appearance) => {
    switch (appearance) {
      case "default":
        return {
          outline: palette.pigments[palette.mapping.accent][600],
          back: palette.white,
        };
      case "initials":
        return {
          outline: palette.pigments[palette.mapping.accent][600],
          back: palette.pigments.purple[500],
          text: palette.white,
          weight: 500,
        };
      case "overflow":
        return {
          outline: palette.pigments[palette.mapping.accent][600],
          back: resolveBackgroundColor(palette, "default"),
          border: palette.text[300],
          text: resolveTextColor(palette, "default"),
        };
    }
  }),
};

/**
 * Default theme: Avatar
 */
export default DefaultAvatarTheme;
