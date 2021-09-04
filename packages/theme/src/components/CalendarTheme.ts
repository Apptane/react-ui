import { resolveBorderColor, resolveColor, resolveTextColor } from "@apptane/react-ui-core";
import memoize from "memoizee";
import { CalendarTheme } from "./CalendarTheme.types";

const DefaultCalendarTheme: CalendarTheme = {
  style: {
    size: 32,
    spacing: 12,
    borderRadius: 6,
    font: {
      header: {
        category: "content",
        size: "small",
        weight: "medium",
      },
      day: {
        category: "content",
        size: "small",
        weight: "regular",
      },
    },
  },
  appearance: memoize((palette) => ({
    text: {
      header: resolveTextColor(palette, "default"),
      dow: resolveTextColor(palette, "muted"),
      normal: resolveTextColor(palette, "default"),
      muted: resolveColor(palette, "text:300"),
      highlight: resolveTextColor(palette, "accent"),
      selected: resolveTextColor(palette, "contrast"),
    },
    back: {
      highlight: resolveColor(palette, "accent:100:10"),
      selected: resolveColor(palette, "accent:500"),
    },
    border: {
      today: resolveBorderColor(palette, "accent"),
      focused: resolveBorderColor(palette, "default"),
    },
  })),
};

/**
 * Default theme: Calendar
 */
export default DefaultCalendarTheme;
