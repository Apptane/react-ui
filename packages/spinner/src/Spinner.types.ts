import { Color, ColorMode, MarginProps, MarginPropTypes, PropTypeColorMode } from "@apptane/react-ui-core";
import { SpinnerAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";

export interface SpinnerProps extends MarginProps {
  /**
   * Visual appearance. Defaults to `clip`.
   */
  appearance?: SpinnerAppearance;

  /**
   * Overrides the color mode.
   * Default is to use globally set theme color mode or fallback to `light`.
   */
  colorMode?: ColorMode;

  /**
   * Size of the spinner. Defaults to 16px.
   */
  size?: number;

  /**
   * Color of the spinner. Defaults to `accent`.
   * Supports palette semantic text colors.
   */
  color?: Color;

  /**
   * Indicates whether it must be rendered as an inline element.
   */
  inline?: boolean;
}

export const SpinnerPropTypes = {
  ...MarginPropTypes,
  appearance: PropTypes.oneOf<SpinnerAppearance>(["clip", "tail", "pulse"]),
  colorMode: PropTypeColorMode,
  size: PropTypes.number,
  color: PropTypes.string,
  inline: PropTypes.bool,
};
