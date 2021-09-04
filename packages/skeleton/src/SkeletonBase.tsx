import { AnimationStyle } from "@apptane/react-ui-core";
import { css, keyframes } from "@emotion/react";

const animationFrames = keyframes`
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

export const StyleAnimation = (animation: AnimationStyle) => css`
  will-change: opacity;
  animation: ${animationFrames} ${animation.duration}ms ${animation.function} infinite alternate;
`;
