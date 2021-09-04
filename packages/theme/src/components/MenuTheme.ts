import { Intent, Palette, resolveColor, resolveTextColor } from "@apptane/react-ui-core";
import memoize from "memoizee";
import { DefaultAnimation } from "../Animation";
import DefaultDropdownTheme from "./DropdownTheme";
import { MenuTheme, MenuVisualState } from "./MenuTheme.types";

function getDefaultBackColor(palette: Palette, intent: Intent, state: MenuVisualState) {
  switch (state) {
    case MenuVisualState.Focused:
      switch (intent) {
        case "success":
          return palette.pigments.green[200];
        case "warning":
          return palette.pigments.yellow[200];
        case "danger":
        case "error":
          return palette.pigments.red[200];
        default:
          return resolveColor(palette, "accent:100:20");
      }
    case MenuVisualState.Toggled:
      switch (intent) {
        case "success":
          return palette.pigments.green[300];
        case "warning":
          return palette.pigments.yellow[300];
        case "danger":
        case "error":
          return palette.pigments.red[300];
        default:
          return resolveColor(palette, "accent:200:20");
      }
  }
}

function getDefaultTextColor(palette: Palette, intent: Intent, state: MenuVisualState) {
  switch (state) {
    case MenuVisualState.Focused:
    case MenuVisualState.Toggled:
      switch (intent) {
        case "success":
          return palette.pigments.green[800];
        case "warning":
          return palette.pigments.yellow[800];
        case "danger":
        case "error":
          return palette.pigments.red[800];
        default:
          return resolveTextColor(palette, "default");
      }
    default:
      return resolveTextColor(palette, "default");
  }
}

const DefaultMenuTheme: MenuTheme = {
  style: {
    ...DefaultDropdownTheme.style,
    itemPadding: 12,
    iconSpacing: 8,
    itemSpacing: 3,
    dividerSize: 1,
    font: {
      category: "control",
      size: "medium",
      weight: "medium",
    },
  },
  animation: {
    delay: DefaultAnimation.delay,
    duration: DefaultAnimation.duration,
    function: "linear",
  },
  appearance: memoize((palette, mode, appearance, intent) => {
    switch (appearance) {
      case "default":
        return {
          [MenuVisualState.Default]: {
            text: resolveTextColor(palette, "default"),
            icon: resolveTextColor(palette, "default"),
            badge: "primary",
          },
          [MenuVisualState.Focused]: {
            text: getDefaultTextColor(palette, intent, MenuVisualState.Focused),
            icon: getDefaultTextColor(palette, intent, MenuVisualState.Focused),
            back: getDefaultBackColor(palette, intent, MenuVisualState.Focused),
            badge: "primary",
          },
          [MenuVisualState.Toggled]: {
            text: getDefaultTextColor(palette, intent, MenuVisualState.Toggled),
            icon: getDefaultTextColor(palette, intent, MenuVisualState.Toggled),
            back: getDefaultBackColor(palette, intent, MenuVisualState.Toggled),
            badge: "primary",
          },
          [MenuVisualState.Disabled]: {
            text: palette.text[400],
            icon: palette.text[400],
            badge: "primary",
          },
        };
      case "inverted":
        return {
          [MenuVisualState.Default]: {
            text: palette.text[200],
            icon: palette.text[200],
            badge: "primary",
          },
          [MenuVisualState.Focused]: {
            text: palette.white,
            icon: palette.white,
            back: palette.text[700],
            badge: "primary",
          },
          [MenuVisualState.Toggled]: {
            text: palette.white,
            icon: palette.white,
            back: palette.text[500],
            badge: "primary",
          },
          [MenuVisualState.Disabled]: {
            text: palette.text[500],
            icon: palette.text[500],
            badge: "primary",
          },
        };
    }
  }),
};

/**
 * Default theme: Menu
 */
export default DefaultMenuTheme;
