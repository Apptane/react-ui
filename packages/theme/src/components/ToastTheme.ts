import { Intent, resolveBackgroundColor, resolveBorderColor, resolveTextColor } from "@apptane/react-ui-core";
import memoize from "memoizee";
import { DefaultAnimation, easeInCubic } from "../Animation";
import { ToastAppearance, ToastTheme } from "./ToastTheme.types";

function getIntentIconColor(appearance: ToastAppearance, intent: Intent) {
  switch (intent) {
    case "success":
      return "success";
    case "warning":
      return "warning";
    case "error":
    case "danger":
      return "error";
    default:
      return appearance === "default" ? "contrast" : "default";
  }
}

const DefaultToastTheme: ToastTheme = {
  style: {
    maxWidth: 560,
    margin: 8,
    borderRadius: 6,
    padding: {
      t: 20,
      l: 20,
    },
    contentSpacing: 8,
    iconSpacing: 20,
    iconSize: 24,
    actionSize: "default",
    actionMargin: {
      t: 0,
      l: 8,
    },
    font: {
      header: {
        category: "content",
        size: "medium",
        weight: "bold",
      },
      body: {
        category: "content",
        size: "medium",
        weight: "regular",
      },
    },
  },
  animation: {
    delay: 0,
    duration: DefaultAnimation.duration,
    function: easeInCubic,
  },
  appearance: memoize((palette, mode, appearance, intent) => ({
    text: resolveTextColor(palette, appearance === "default" ? "contrast" : "default"),
    icon: resolveTextColor(palette, getIntentIconColor(appearance, intent)),
    back: resolveBackgroundColor(palette, appearance === "default" ? "contrast" : "default"),
    border: resolveBorderColor(palette, appearance === "default" ? "contrast" : "default"),
    actionAppearance: appearance === "default" ? "inverted" : "minimal",
    elevation: mode === "light" ? 2 : undefined,
  })),
};

/**
 * Default theme: Toast
 */
export default DefaultToastTheme;
