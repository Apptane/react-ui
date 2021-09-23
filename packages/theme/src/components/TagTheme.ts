import memoize from "memoizee";
import { TagTheme, TagVisualState } from "./TagTheme.types";

const DefaultTagTheme: TagTheme = {
  sizes: {
    default: 20,
    small: 16,
    medium: 20,
    large: 28,
  },
  styles: [
    {
      threshold: 16,
      padding: {
        t: 0,
        l: 4,
      },
      borderRadius: 2,
      buttonSize: 10,
      spacing: 4,
      textPadding: 1,
      font: {
        category: "content",
        size: "xsmall",
        weight: "medium",
      },
    },
    {
      threshold: 20,
      padding: {
        t: 2,
        l: 4,
      },
      borderRadius: 3,
      buttonSize: 12,
      spacing: 4,
      textPadding: 2,
      font: {
        category: "content",
        size: "small",
        weight: "medium",
      },
    },
    {
      padding: {
        t: 4,
        l: 8,
      },
      borderRadius: 4,
      buttonSize: 16,
      spacing: 8,
      textPadding: 4,
      font: {
        category: "content",
        size: "medium",
        weight: "medium",
      },
    },
  ],
  appearance: memoize((palette, mode, appearance) => {
    switch (appearance) {
      case "primary":
        return {
          [TagVisualState.Default]: {
            text: palette.pigments[palette.mapping.accent][600],
            back: palette.pigments[palette.mapping.accent][100],
            textWeight: 600,
            backWeight: 100,
          },
          [TagVisualState.Focused]: {
            text: palette.pigments[palette.mapping.accent][600],
            back: palette.pigments[palette.mapping.accent][200],
            textWeight: 600,
            backWeight: 200,
          },
          [TagVisualState.Inactive]: {
            text: palette.pigments[palette.mapping.accent][500],
            back: palette.light,
            border: palette.pigments[palette.mapping.accent][200],
            textWeight: 500,
            borderWeight: 200,
          },
        };
      case "secondary":
        return {
          [TagVisualState.Default]: {
            text: palette.pigments.purple[600],
            back: palette.pigments.purple[100],
            textWeight: 600,
            backWeight: 100,
          },
          [TagVisualState.Focused]: {
            text: palette.pigments.purple[600],
            back: palette.pigments.purple[200],
            textWeight: 600,
            backWeight: 200,
          },
          [TagVisualState.Inactive]: {
            text: palette.pigments.purple[500],
            back: palette.light,
            border: palette.pigments.purple[200],
            textWeight: 500,
            borderWeight: 200,
          },
        };
      case "neutral":
        return {
          [TagVisualState.Default]: {
            text: palette.text[600],
            back: palette.text[100],
            textWeight: 600,
            backWeight: 100,
          },
          [TagVisualState.Focused]: {
            text: palette.text[600],
            back: palette.text[200],
            textWeight: 600,
            backWeight: 200,
          },
          [TagVisualState.Inactive]: {
            text: palette.text[500],
            back: palette.light,
            border: palette.text[200],
            textWeight: 500,
            borderWeight: 200,
          },
        };
    }
  }),
};

/**
 * Default theme: Tag
 */
export default DefaultTagTheme;
