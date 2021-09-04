import memoize from "memoizee";
import { DefaultAnimation } from "../Animation";
import { InputCheckTheme, InputCheckValueState, InputCheckVisualState } from "./InputCheckTheme.types";

const DefaultInputCheckTheme: InputCheckTheme = {
  sizes: {
    default: 24,
    small: 18,
    medium: 24,
    large: 36,
  },
  styles: [
    {
      threshold: 18,
      spacing: 4,
      padding: 2,
      borderRadius: 2,
    },
    {
      spacing: 8,
      padding: 2,
      borderRadius: 4,
    },
  ],
  animation: {
    delay: DefaultAnimation.delay,
    duration: DefaultAnimation.duration,
    function: "linear",
  },
  appearance: memoize((palette) => ({
    [InputCheckValueState.Unchecked]: {
      [InputCheckVisualState.Default]: {
        borderWidth: 1,
        border: palette.text[300],
        back: palette.white,
      },
      [InputCheckVisualState.Hover]: {
        borderWidth: 2,
        border: palette.text[300],
        back: palette.white,
      },
      [InputCheckVisualState.Focused]: {
        borderWidth: 2,
        border: palette.pigments[palette.mapping.accent][600],
        back: palette.white,
      },
      [InputCheckVisualState.Disabled]: {
        borderWidth: 1,
        border: palette.text[300],
        back: palette.text[100],
      },
    },
    [InputCheckValueState.Checked]: {
      [InputCheckVisualState.Default]: {
        borderWidth: 1,
        border: palette.pigments[palette.mapping.accent][500],
        back: palette.pigments[palette.mapping.accent][500],
        glyph: palette.white,
      },
      [InputCheckVisualState.Hover]: {
        borderWidth: 2,
        border: palette.pigments[palette.mapping.accent][600],
        back: palette.pigments[palette.mapping.accent][600],
        glyph: palette.white,
      },
      [InputCheckVisualState.Focused]: {
        borderWidth: 2,
        border: palette.pigments[palette.mapping.accent][600],
        back: palette.pigments[palette.mapping.accent][600],
        glyph: palette.white,
      },
      [InputCheckVisualState.Disabled]: {
        borderWidth: 1,
        border: palette.pigments[palette.mapping.accent][200],
        back: palette.pigments[palette.mapping.accent][200],
        glyph: palette.white,
      },
    },
  })),
};

/**
 * Default theme: InputCheck
 */
export default DefaultInputCheckTheme;
