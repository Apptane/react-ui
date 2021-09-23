import memoize from "memoizee";
import { DefaultAnimation } from "../Animation";
import { RadioButtonTheme, RadioButtonValueState, RadioButtonVisualState } from "./RadioButtonTheme.types";

const DefaultRadioButtonTheme: RadioButtonTheme = {
  sizes: {
    default: 24,
    small: 18,
    medium: 24,
    large: 36,
  },
  styles: [
    {
      threshold: 18,
      glyphSize: 0.5,
      spacing: 4,
      padding: 2,
    },
    {
      glyphSize: 0.6,
      spacing: 8,
      padding: 2,
    },
  ],
  animation: {
    delay: DefaultAnimation.delay,
    duration: DefaultAnimation.duration,
    function: "linear",
  },
  appearance: memoize((palette) => ({
    [RadioButtonValueState.Unchecked]: {
      [RadioButtonVisualState.Default]: {
        borderWidth: 1,
        border: palette.text[300],
        back: palette.light,
      },
      [RadioButtonVisualState.Hover]: {
        borderWidth: 2,
        border: palette.text[300],
        back: palette.white,
      },
      [RadioButtonVisualState.Focused]: {
        borderWidth: 2,
        border: palette.pigments[palette.mapping.accent][600],
        back: palette.white,
      },
      [RadioButtonVisualState.Disabled]: {
        borderWidth: 1,
        border: palette.text[300],
        back: palette.text[100],
      },
    },
    [RadioButtonValueState.Checked]: {
      [RadioButtonVisualState.Default]: {
        borderWidth: 1,
        glyph: palette.pigments[palette.mapping.accent][500],
        border: palette.pigments[palette.mapping.accent][500],
        back: palette.light,
      },
      [RadioButtonVisualState.Hover]: {
        borderWidth: 2,
        glyph: palette.pigments[palette.mapping.accent][600],
        border: palette.pigments[palette.mapping.accent][600],
        back: palette.white,
      },
      [RadioButtonVisualState.Focused]: {
        borderWidth: 2,
        glyph: palette.pigments[palette.mapping.accent][600],
        border: palette.pigments[palette.mapping.accent][600],
        back: palette.white,
      },
      [RadioButtonVisualState.Disabled]: {
        borderWidth: 1,
        glyph: palette.pigments[palette.mapping.accent][200],
        border: palette.pigments[palette.mapping.accent][200],
        back: palette.light,
      },
    },
  })),
};

/**
 * Default theme: RadioButton
 */
export default DefaultRadioButtonTheme;
