import memoize from "memoizee";
import { ScrollerTheme } from "./ScrollerTheme.types";

const DefaultScrollerTheme: ScrollerTheme = {
  style: {
    thumbSize: 6,
    shadowSize: 2,
    shadowThreshold: 10,
  },
  appearance: memoize((palette) => ({
    shadow: palette.text[300] + "66", // alpha=40
    thumb: palette.text[300] + "CC", // alpha=80
    active: palette.text[300],
  })),
};

/**
 * Default theme: Scroller/ScrollBar
 */
export default DefaultScrollerTheme;
