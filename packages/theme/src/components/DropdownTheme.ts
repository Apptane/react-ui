import memoize from "memoizee";
import { DefaultAnimation } from "../Animation";
import { DropdownTheme } from "./DropdownTheme.types";

const DefaultDropdownTheme: DropdownTheme = {
  style: {
    padding: {
      t: 6,
      l: 6,
    },
    elevation: 2,
    borderRadius: 6,
  },
  animation: {
    delay: DefaultAnimation.delay,
    duration: DefaultAnimation.duration,
    function: "linear",
  },
  appearance: memoize(() => ({})),
};

/**
 * Default theme: Dropdown
 */
export default DefaultDropdownTheme;
