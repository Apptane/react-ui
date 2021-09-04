import { resolveColor } from "@apptane/react-ui-core";
import memoize from "memoizee";
import { DefaultAnimation, easeInOutCubic } from "../Animation";
import { SideBarTheme, SideBarVisualState } from "./SideBarTheme.types";

const DefaultSideBarTheme: SideBarTheme = {
  style: {
    padding: {
      t: 12,
      l: 12,
    },
    borderRadius: 6,
    itemHeight: 36,
    itemPadding: 12,
    itemSpacing: 3,
    iconSize: 24,
    iconSpacing: 8,
    avatarHeight: 52,
    avatarSize: 40,
    avatarSpacing: 12,
    avatarPadding: 8,
    headerHeight: 28,
    elevation: 2,
    font: {
      header: {
        category: "header",
        size: "xsmall",
        weight: "bold",
      },
      item: {
        category: "control",
        size: "medium",
        weight: "medium",
      },
    },
  },
  animation: {
    delay: DefaultAnimation.delay,
    duration: DefaultAnimation.duration,
    function: easeInOutCubic,
  },
  appearance: memoize((palette, mode, appearance) => ({
    back: resolveColor(palette, appearance === "default" ? "accent:50:40" : "accent:900:40"),
    text: appearance === "default" ? palette.text[800] : palette.text[100],
    [SideBarVisualState.Default]: {
      text: appearance === "default" ? palette.text[700] : palette.text[200],
      icon: appearance === "default" ? palette.text[700] : palette.text[200],
      badge: "primary",
    },
    [SideBarVisualState.Focused]: {
      text: appearance === "default" ? palette.black : palette.white,
      icon: appearance === "default" ? palette.black : palette.white,
      back: resolveColor(palette, appearance === "default" ? "accent:100:20" : "accent:800:20"),
      badge: "primary",
    },
    [SideBarVisualState.Toggled]: {
      text: appearance === "default" ? palette.black : palette.white,
      icon: appearance === "default" ? palette.black : palette.white,
      back: resolveColor(palette, appearance === "default" ? "accent:200:20" : "accent:700:20"),
      badge: "primary",
    },
    [SideBarVisualState.Disabled]: {
      text: appearance === "default" ? palette.text[500] : palette.text[400],
      icon: appearance === "default" ? palette.text[500] : palette.text[400],
      badge: "primary",
    },
  })),
};

/**
 * Default theme: SideBar
 */
export default DefaultSideBarTheme;
