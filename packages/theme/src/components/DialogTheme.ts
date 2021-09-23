import { resolveTextColor } from "@apptane/react-ui-core";
import memoize from "memoizee";
import { DefaultAnimation, easeInOutCubic } from "../Animation";
import { DialogTheme } from "./DialogTheme.types";

const DefaultDialogTheme: DialogTheme = {
  style: memoize((kind) => {
    switch (kind) {
      case "default":
        return {
          width: 640,
          padding: {
            t: 40,
            l: 40,
          },
          closeButtonSize: "medium",
          closeButtonMargin: {
            t: 40,
            r: 28,
            b: 0,
            l: 0,
          },
          contentSpacing: 24,
          headerSpacing: 8,
          buttonSpacing: 12,
          buttonSize: "large",
          buttonAlignment: "right",
          headerAlignment: "left",
          font: {
            header: {
              category: "header",
              size: "large",
              weight: "bold",
            },
            description: {
              category: "content",
              size: "medium",
              weight: "regular",
            },
          },
        };
      case "hero":
        return {
          width: 640,
          padding: {
            t: 60,
            l: 60,
          },
          closeButtonSize: "medium",
          closeButtonMargin: {
            t: 24,
            r: 24,
            b: 0,
            l: 0,
          },
          contentSpacing: 24,
          headerSpacing: 16,
          buttonSpacing: 12,
          buttonSize: "large",
          buttonAlignment: "center",
          headerAlignment: "center",
          font: {
            header: {
              category: "header",
              size: "large",
              weight: "bold",
            },
            description: {
              category: "content",
              size: "medium",
              weight: "regular",
            },
          },
        };
    }
  }),
  animation: {
    delay: DefaultAnimation.delay,
    duration: DefaultAnimation.duration,
    function: easeInOutCubic,
  },
  appearance: memoize((palette) => ({
    background: palette.light,
    elevation: 3,
    text: resolveTextColor(palette, "default"),
    description: resolveTextColor(palette, "muted"),
  })),
};

/**
 * Default theme: Dialog
 */
export default DefaultDialogTheme;
