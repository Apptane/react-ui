import memoize from "memoizee";
import { DefaultAnimation } from "../Animation";
import { SkeletonTheme } from "./SkeletonTheme.types";

const DefaultSkeletonTheme: SkeletonTheme = {
  style: {
    borderRadius: 6,
    lineHeight: 8,
    paragraphSpacing: 8,
  },
  animation: {
    delay: DefaultAnimation.delay,
    duration: 1000,
    function: "linear",
  },
  appearance: memoize((palette) => ({
    default: palette.text[200],
  })),
};

/**
 * Default theme: Skeleton
 */
export default DefaultSkeletonTheme;
