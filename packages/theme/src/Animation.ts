import { AnimationStyle } from "@apptane/react-ui-core";

export const easeInOutCubic = "cubic-bezier(0.645, 0.045, 0.355, 1)"; // https://easings.net/#easeInOutCubic;
export const easeInCubic = "cubic-bezier(0.55, 0.055, 0.675, 0.19)"; // https://easings.net/#easeInCubic

export const DefaultAnimation: AnimationStyle = {
  delay: 0,
  duration: 200,
  function: easeInOutCubic,
};

/**
 * Default theme: animation
 */
export default DefaultAnimation;
