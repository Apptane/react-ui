/* eslint-disable @typescript-eslint/no-unused-vars */
import { ColorMode, Intent, Palette, PalettePigment, resolveTextColor } from "@apptane/react-ui-core";
import memoize from "memoizee";
import { DefaultAnimation } from "../Animation";
import { ButtonAppearance, ButtonTheme, ButtonVisualState } from "./ButtonTheme.types";

function getPrimaryBackColor(palette: Palette, intent: Intent, state: ButtonVisualState, mode: ColorMode) {
  let pigment: PalettePigment;
  switch (intent) {
    case "success":
      switch (state) {
        case ButtonVisualState.Default:
          return palette.pigments.green[mode === "dark" ? 500 : 400];
        case ButtonVisualState.Disabled:
          return palette.pigments.green[mode === "dark" ? 300 : 200];
        case ButtonVisualState.Focused:
        case ButtonVisualState.Toggled:
          return palette.pigments.green[mode === "dark" ? 600 : 500];
      }
    case "warning":
      switch (state) {
        case ButtonVisualState.Default:
          return palette.pigments.yellow[mode === "dark" ? 500 : 300];
        case ButtonVisualState.Disabled:
          return palette.pigments.yellow[mode === "dark" ? 300 : 200];
        case ButtonVisualState.Focused:
        case ButtonVisualState.Toggled:
          return palette.pigments.yellow[mode === "dark" ? 600 : 400];
      }
    case "danger":
    case "error":
      switch (state) {
        case ButtonVisualState.Default:
          return palette.pigments.red[mode === "dark" ? 400 : 500];
        case ButtonVisualState.Disabled:
          return palette.pigments.red[mode === "dark" ? 200 : 300];
        case ButtonVisualState.Focused:
        case ButtonVisualState.Toggled:
          return palette.pigments.red[mode === "dark" ? 500 : 600];
      }
    default:
      pigment = palette.pigments[palette.mapping.accent];
      switch (state) {
        case ButtonVisualState.Default:
          return pigment[500];
        case ButtonVisualState.Disabled:
          return pigment[300];
        case ButtonVisualState.Focused:
        case ButtonVisualState.Toggled:
          return pigment[600];
      }
  }
}

function getSecondaryBackColor(palette: Palette, intent: Intent, state: ButtonVisualState, mode: ColorMode) {
  switch (intent) {
    case "success":
      switch (state) {
        case ButtonVisualState.Default:
          return palette.pigments.green[200];
        case ButtonVisualState.Disabled:
          return palette.pigments.green[mode === "dark" ? 100 : 50];
        case ButtonVisualState.Focused:
        case ButtonVisualState.Toggled:
          return palette.pigments.green[300];
      }
    case "warning":
      switch (state) {
        case ButtonVisualState.Default:
          return palette.pigments.yellow[200];
        case ButtonVisualState.Disabled:
          return palette.pigments.yellow[100];
        case ButtonVisualState.Focused:
        case ButtonVisualState.Toggled:
          return palette.pigments.yellow[300];
      }
    case "danger":
    case "error":
      switch (state) {
        case ButtonVisualState.Default:
          return palette.pigments.red[mode === "dark" ? 200 : 300];
        case ButtonVisualState.Disabled:
          return palette.pigments.red[100];
        case ButtonVisualState.Focused:
        case ButtonVisualState.Toggled:
          return palette.pigments.red[mode === "dark" ? 300 : 400];
      }
    default:
      switch (state) {
        case ButtonVisualState.Default:
          return palette.text[mode === "dark" ? 200 : 100];
        case ButtonVisualState.Disabled:
          return palette.text[mode === "dark" ? 100 : 50];
        case ButtonVisualState.Focused:
        case ButtonVisualState.Toggled:
          return palette.text[mode === "dark" ? 300 : 200];
      }
  }
}

function getSecondaryTextColor(palette: Palette, intent: Intent, state: ButtonVisualState, mode: ColorMode) {
  switch (intent) {
    case "success":
      switch (state) {
        case ButtonVisualState.Default:
          return palette.pigments.green[800];
        case ButtonVisualState.Disabled:
          return palette.pigments.green[300];
        case ButtonVisualState.Focused:
        case ButtonVisualState.Toggled:
          return palette.pigments.green[900];
      }
    case "warning":
      switch (state) {
        case ButtonVisualState.Default:
          return palette.pigments.yellow[800];
        case ButtonVisualState.Disabled:
          return palette.pigments.yellow[400];
        case ButtonVisualState.Focused:
        case ButtonVisualState.Toggled:
          return palette.pigments.yellow[900];
      }
    case "danger":
    case "error":
      switch (state) {
        case ButtonVisualState.Default:
          return palette.pigments.red[800];
        case ButtonVisualState.Disabled:
          return palette.pigments.red[400];
        case ButtonVisualState.Focused:
        case ButtonVisualState.Toggled:
          return palette.pigments.red[900];
      }
    default:
      switch (state) {
        case ButtonVisualState.Default:
          return palette.text[900];
        case ButtonVisualState.Disabled:
          return palette.text[400];
        case ButtonVisualState.Focused:
        case ButtonVisualState.Toggled:
          return palette.text[900];
      }
  }
}

function getBorderWidth(appearance: ButtonAppearance) {
  return appearance === "tertiary" ? 1 : 0;
}

const ActiveTransformation = "scale(.95)";

const DefaultButtonTheme: ButtonTheme = {
  sizes: {
    default: 36,
    small: 28,
    medium: 36,
    large: 48,
  },
  styles: [
    {
      threshold: 28,
      padding: 8,
      borderRadius: 4,
      borderWidth: getBorderWidth,
      iconSpacing: 6,
      spinnerSize: 16,
      spinner: "clip",
      font: {
        category: "control",
        size: "small",
        weight: "medium",
      },
    },
    {
      threshold: 36,
      padding: 12,
      borderRadius: 6,
      borderWidth: getBorderWidth,
      iconSpacing: 8,
      spinnerSize: 16,
      spinner: "clip",
      font: {
        category: "control",
        size: "medium",
        weight: "medium",
      },
    },
    {
      padding: 16,
      borderRadius: 6,
      borderWidth: getBorderWidth,
      iconSpacing: 8,
      spinnerSize: 16,
      spinner: "clip",
      font: {
        category: "control",
        size: "large",
        weight: "medium",
      },
    },
  ],
  animation: {
    delay: DefaultAnimation.delay,
    duration: DefaultAnimation.duration,
    function: "linear",
  },
  appearance: memoize((palette, mode, appearance, intent) => {
    switch (appearance) {
      case "primary":
        return {
          [ButtonVisualState.Default]: {
            text: resolveTextColor(palette, "contrast"),
            icon: resolveTextColor(palette, "contrast"),
            back: getPrimaryBackColor(palette, intent, ButtonVisualState.Default, mode),
            active: ActiveTransformation,
            badge: "inverted",
          },
          [ButtonVisualState.Focused]: {
            text: resolveTextColor(palette, "contrast"),
            icon: resolveTextColor(palette, "contrast"),
            back: getPrimaryBackColor(palette, intent, ButtonVisualState.Focused, mode),
            badge: "inverted",
          },
          [ButtonVisualState.Toggled]: {
            text: resolveTextColor(palette, "contrast"),
            icon: resolveTextColor(palette, "contrast"),
            back: getPrimaryBackColor(palette, intent, ButtonVisualState.Toggled, mode),
            badge: "inverted",
          },
          [ButtonVisualState.Disabled]: {
            text: resolveTextColor(palette, "contrast"),
            icon: resolveTextColor(palette, "contrast"),
            back: getPrimaryBackColor(palette, intent, ButtonVisualState.Disabled, mode),
          },
        };
      case "secondary":
        return {
          [ButtonVisualState.Default]: {
            text: getSecondaryTextColor(palette, intent, ButtonVisualState.Default, mode),
            icon: getSecondaryTextColor(palette, intent, ButtonVisualState.Default, mode),
            back: getSecondaryBackColor(palette, intent, ButtonVisualState.Default, mode),
            active: ActiveTransformation,
            badge: "inverted",
          },
          [ButtonVisualState.Focused]: {
            text: getSecondaryTextColor(palette, intent, ButtonVisualState.Focused, mode),
            icon: getSecondaryTextColor(palette, intent, ButtonVisualState.Focused, mode),
            back: getSecondaryBackColor(palette, intent, ButtonVisualState.Focused, mode),
            badge: "inverted",
          },
          [ButtonVisualState.Toggled]: {
            text: getSecondaryTextColor(palette, intent, ButtonVisualState.Toggled, mode),
            icon: getSecondaryTextColor(palette, intent, ButtonVisualState.Toggled, mode),
            back: getSecondaryBackColor(palette, intent, ButtonVisualState.Toggled, mode),
            badge: "inverted",
          },
          [ButtonVisualState.Disabled]: {
            text: getSecondaryTextColor(palette, intent, ButtonVisualState.Disabled, mode),
            icon: getSecondaryTextColor(palette, intent, ButtonVisualState.Disabled, mode),
            back: getSecondaryBackColor(palette, intent, ButtonVisualState.Disabled, mode),
          },
        };
      case "tertiary":
        return {
          [ButtonVisualState.Default]: {
            text: palette.pigments[palette.mapping.accent][600],
            icon: palette.pigments[palette.mapping.accent][600],
            border: palette.pigments[palette.mapping.accent][500],
            active: ActiveTransformation,
            badge: "primary",
          },
          [ButtonVisualState.Focused]: {
            text: palette.white,
            icon: palette.white,
            back: palette.pigments[palette.mapping.accent][500],
            border: palette.pigments[palette.mapping.accent][500],
            badge: "inverted",
          },
          [ButtonVisualState.Toggled]: {
            text: resolveTextColor(palette, "contrast"),
            icon: resolveTextColor(palette, "contrast"),
            back: palette.pigments[palette.mapping.accent][600],
            border: palette.pigments[palette.mapping.accent][600],
            badge: "inverted",
          },
          [ButtonVisualState.Disabled]: {
            text: palette.pigments[palette.mapping.accent][300],
            icon: palette.pigments[palette.mapping.accent][300],
            border: palette.pigments[palette.mapping.accent][300],
          },
        };
      case "minimal":
        return {
          [ButtonVisualState.Default]: {
            text: resolveTextColor(palette, "default"),
            icon: resolveTextColor(palette, "default"),
            active: ActiveTransformation,
            badge: "primary",
          },
          [ButtonVisualState.Focused]: {
            text:
              intent !== "none"
                ? getSecondaryTextColor(palette, intent, ButtonVisualState.Focused, mode)
                : palette.white,
            icon:
              intent !== "none"
                ? getSecondaryTextColor(palette, intent, ButtonVisualState.Focused, mode)
                : palette.white,
            back:
              intent !== "none"
                ? getSecondaryBackColor(palette, intent, ButtonVisualState.Focused, mode)
                : palette.pigments[palette.mapping.accent][500],
            badge: "inverted",
          },
          [ButtonVisualState.Toggled]: {
            text:
              intent !== "none"
                ? getSecondaryTextColor(palette, intent, ButtonVisualState.Toggled, mode)
                : resolveTextColor(palette, "contrast"),
            icon:
              intent !== "none"
                ? getSecondaryTextColor(palette, intent, ButtonVisualState.Toggled, mode)
                : resolveTextColor(palette, "contrast"),
            back:
              intent !== "none"
                ? getSecondaryBackColor(palette, intent, ButtonVisualState.Toggled, mode)
                : palette.pigments[palette.mapping.accent][600],
            badge: "inverted",
          },
          [ButtonVisualState.Disabled]: {
            text: palette.text[400],
            icon: palette.text[400],
          },
        };
      case "inverted":
        return {
          [ButtonVisualState.Default]: {
            text: palette.text[100],
            icon: palette.text[100],
            active: ActiveTransformation,
            badge: "primary",
          },
          [ButtonVisualState.Focused]: {
            text: palette.white,
            icon: palette.white,
            badge: "primary",
          },
          [ButtonVisualState.Toggled]: {
            text: resolveTextColor(palette, "default"),
            icon: resolveTextColor(palette, "default"),
            back: palette.white,
            badge: "primary",
          },
          [ButtonVisualState.Disabled]: {
            text: resolveTextColor(palette, "muted"),
            icon: resolveTextColor(palette, "muted"),
          },
        };
      case "link":
        return {
          [ButtonVisualState.Default]: {
            text: palette.pigments[palette.mapping.accent][500],
            icon: palette.pigments[palette.mapping.accent][500],
            active: ActiveTransformation,
            badge: "primary",
          },
          [ButtonVisualState.Focused]: {
            text: palette.pigments[palette.mapping.accent][600],
            icon: palette.pigments[palette.mapping.accent][600],
            badge: "primary",
          },
          [ButtonVisualState.Toggled]: {
            text: resolveTextColor(palette, "contrast"),
            icon: resolveTextColor(palette, "contrast"),
            back: palette.pigments[palette.mapping.accent][600],
            badge: "inverted",
          },
          [ButtonVisualState.Disabled]: {
            text: palette.pigments[palette.mapping.accent][300],
            icon: palette.pigments[palette.mapping.accent][300],
          },
        };
    }
  }),
};

/**
 * Default theme: Button
 */
export default DefaultButtonTheme;
