import { FontProps, resolveBackgroundColor, resolveBorderColor, resolveTextColor } from "@apptane/react-ui-core";
import memoize from "memoizee";
import { DefaultAnimation, easeInOutCubic } from "../Animation";
import { InputBoxKind, InputBoxTheme, InputBoxVisualState } from "./InputBoxTheme.types";

function getLabelFont(kind: InputBoxKind, state: InputBoxVisualState, empty: boolean): FontProps {
  return {
    category: "content",
    size: kind === "default" && empty ? "medium" : "small",
    weight: state === InputBoxVisualState.Focused ? "medium" : "regular",
  };
}

const DefaultInputBoxTheme: InputBoxTheme = {
  sizes: {
    default: 36,
    small: 28,
    medium: 36,
    large: 48,
  },
  styles: [
    {
      threshold: 28,
      borderRadius: 4,
      padding: {
        t: 2.5,
        l: 7,
      },
      errorSpacing: 4,
      iconSpacing: 7,
      iconSize: 16,
      labelVisible: false,
      font: {
        label: getLabelFont,
        value: {
          category: "content",
          size: "small",
          weight: "regular",
        },
        error: {
          category: "content",
          size: "small",
          weight: "regular",
        },
      },
    },
    {
      threshold: 36,
      borderRadius: 6,
      padding: {
        t: 7,
        l: 9,
      },
      errorSpacing: 4,
      iconSpacing: 9,
      iconSize: 16,
      labelVisible: false,
      font: {
        label: getLabelFont,
        value: {
          category: "content",
          size: "medium",
          weight: "regular",
        },
        error: {
          category: "content",
          size: "small",
          weight: "regular",
        },
      },
    },
    {
      borderRadius: 6,
      padding: {
        t: 5,
        l: 12,
      },
      errorSpacing: 4,
      iconSpacing: 12,
      iconSize: 24,
      labelVisible: true,
      font: {
        label: getLabelFont,
        value: {
          category: "content",
          size: "medium",
          weight: "regular",
        },
        error: {
          category: "content",
          size: "small",
          weight: "regular",
        },
      },
    },
  ],
  animation: {
    delay: DefaultAnimation.delay,
    duration: DefaultAnimation.duration,
    function: "linear",
  },
  labelAnimation: {
    delay: DefaultAnimation.delay,
    duration: DefaultAnimation.duration,
    function: easeInOutCubic,
  },
  appearance: memoize((palette, mode, appearance) => ({
    placeholder: resolveTextColor(palette, "muted"),
    [InputBoxVisualState.Default]: {
      text: resolveTextColor(palette, "default"),
      icon: resolveTextColor(palette, "muted"),
      glyph: resolveTextColor(palette, "default"),
      label: resolveTextColor(palette, "muted"),
      back: appearance === "embedded" ? undefined : palette.white,
      border: appearance === "embedded" ? undefined : palette.text[300],
      borderWidth: appearance === "embedded" ? 0 : 1,
    },
    [InputBoxVisualState.Hover]: {
      text: resolveTextColor(palette, "default"),
      icon: resolveTextColor(palette, "muted"),
      glyph: resolveTextColor(palette, "default"),
      label: resolveTextColor(palette, appearance === "embedded" ? "accent" : "muted"),
      back: appearance === "embedded" ? undefined : palette.white,
      border: appearance === "embedded" ? undefined : palette.text[300],
      borderWidth: appearance === "embedded" ? 0 : 2,
    },
    [InputBoxVisualState.Focused]: {
      text: resolveTextColor(palette, "default"),
      icon: resolveTextColor(palette, "muted"),
      glyph: resolveTextColor(palette, "default"),
      label: resolveTextColor(palette, "accent"),
      back: appearance === "embedded" ? undefined : palette.white,
      border: appearance === "embedded" ? undefined : resolveBorderColor(palette, "focused"),
      borderWidth: appearance === "embedded" ? 0 : 2,
    },
    [InputBoxVisualState.Disabled]: {
      text: resolveTextColor(palette, "default"),
      icon: resolveTextColor(palette, "muted"),
      glyph: resolveTextColor(palette, "muted"),
      label: resolveTextColor(palette, "muted"),
      back: resolveBackgroundColor(palette, "readonly"),
      border: appearance === "embedded" ? undefined : palette.text[300],
      borderWidth: appearance === "embedded" ? 0 : 1,
    },
  })),
};

/**
 * Default theme: InputBox
 */
export default DefaultInputBoxTheme;
