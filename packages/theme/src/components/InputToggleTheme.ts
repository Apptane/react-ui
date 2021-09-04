import memoize from "memoizee";
import { DefaultAnimation } from "../Animation";
import { InputToggleTheme, InputToggleValueState, InputToggleVisualState } from "./InputToggleTheme.types";

const DefaultInputToggleTheme: InputToggleTheme = {
  sizes: {
    default: 24,
    small: 18,
    medium: 24,
    large: 36,
  },
  styles: [
    {
      threshold: 18,
      aspectRatio: 1.8,
      spacing: 4,
      padding: 2,
      glyphMargin: 2,
    },
    {
      threshold: 24,
      aspectRatio: 1.8,
      spacing: 4,
      padding: 2,
      glyphMargin: 3,
    },
    {
      aspectRatio: 1.8,
      spacing: 8,
      padding: 2,
      glyphMargin: 4,
    },
  ],
  animation: {
    delay: DefaultAnimation.delay,
    duration: DefaultAnimation.duration,
    function: "linear",
  },
  appearance: memoize((palette) => ({
    [InputToggleValueState.Unchecked]: {
      [InputToggleVisualState.Default]: {
        borderWidth: 1,
        border: palette.text[300],
        back: palette.white,
        glyph: palette.text[300],
      },
      [InputToggleVisualState.Hover]: {
        borderWidth: 2,
        border: palette.text[300],
        back: palette.white,
        glyph: palette.pigments[palette.mapping.accent][500],
      },
      [InputToggleVisualState.Focused]: {
        borderWidth: 2,
        border: palette.pigments[palette.mapping.accent][600],
        back: palette.white,
        glyph: palette.pigments[palette.mapping.accent][600],
      },
      [InputToggleVisualState.Disabled]: {
        borderWidth: 1,
        border: palette.text[300],
        back: palette.text[100],
        glyph: palette.text[300],
      },
    },
    [InputToggleValueState.Checked]: {
      [InputToggleVisualState.Default]: {
        borderWidth: 1,
        border: palette.pigments[palette.mapping.accent][500],
        back: palette.pigments[palette.mapping.accent][500],
        glyph: palette.white,
      },
      [InputToggleVisualState.Hover]: {
        borderWidth: 2,
        border: palette.pigments[palette.mapping.accent][600],
        back: palette.pigments[palette.mapping.accent][600],
        glyph: palette.white,
      },
      [InputToggleVisualState.Focused]: {
        borderWidth: 2,
        border: palette.pigments[palette.mapping.accent][600],
        back: palette.pigments[palette.mapping.accent][600],
        glyph: palette.white,
      },
      [InputToggleVisualState.Disabled]: {
        borderWidth: 1,
        border: palette.text[300],
        back: palette.text[100],
        glyph: palette.text[300],
      },
    },
  })),
};

/**
 * Default theme: InputToggle
 */
export default DefaultInputToggleTheme;
