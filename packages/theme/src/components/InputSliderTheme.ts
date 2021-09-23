import { resolveBackgroundColor, resolveTextColor } from "@apptane/react-ui-core";
import memoize from "memoizee";
import { DefaultAnimation } from "../Animation";
import { InputSliderTheme, InputSliderVisualState } from "./InputSliderTheme.types";

const DefaultInputSliderTheme: InputSliderTheme = {
  style: {
    railSize: 2,
    gaugeSize: 4,
    thumbBox: 20,
    thumbSize: 16,
    thumbBorderWidth: 2,
    spacing: 16,
    font: {
      category: "numeric",
      size: "medium",
      weight: "regular",
    },
  },
  animation: {
    delay: DefaultAnimation.delay,
    duration: DefaultAnimation.duration,
    function: "linear",
  },
  appearance: memoize((palette) => ({
    [InputSliderVisualState.Default]: {
      text: resolveTextColor(palette, "default"),
      rail: resolveBackgroundColor(palette, "readonly"),
      gauge: palette.pigments[palette.mapping.accent][500],
      thumbBorder: palette.pigments[palette.mapping.accent][500],
      thumbBack: palette.light,
    },
    [InputSliderVisualState.Hover]: {
      text: resolveTextColor(palette, "default"),
      rail: resolveBackgroundColor(palette, "readonly"),
      gauge: palette.pigments[palette.mapping.accent][600],
      thumbBorder: palette.pigments[palette.mapping.accent][600],
      thumbBack: palette.white,
    },
    [InputSliderVisualState.Focused]: {
      text: resolveTextColor(palette, "default"),
      rail: resolveBackgroundColor(palette, "readonly"),
      gauge: palette.pigments[palette.mapping.accent][600],
      thumbBorder: palette.pigments[palette.mapping.accent][600],
      thumbBack: palette.pigments[palette.mapping.accent][600],
    },
    [InputSliderVisualState.Disabled]: {
      text: resolveTextColor(palette, "default"),
      rail: resolveBackgroundColor(palette, "readonly"),
      gauge: palette.text[400],
      thumbBorder: palette.text[400],
      thumbBack: palette.light,
    },
  })),
};

/**
 * Default theme: InputSlider
 */
export default DefaultInputSliderTheme;
