import { AnimationStyle } from "@apptane/react-ui-core";
import { BackdropAppearance } from "@apptane/react-ui-theme";
import { css } from "@emotion/react";

export const StyleBackdrop = (appearance: BackdropAppearance, animation: AnimationStyle, duration?: number) => css`
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${appearance.color};
  pointer-events: all;

  transition-property: opacity;
  transition-delay: ${animation.delay}ms;
  transition-duration: ${duration ?? animation.duration}ms;
  transition-timing-function: ${animation.function};

  &[transition-state="entered"] {
    opacity: ${appearance.opacity};
  }

  &[transition-state="entering"],
  &[transition-state="exiting"] {
    opacity: 0;
  }
`;
