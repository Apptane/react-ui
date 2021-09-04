import {
  AppearanceProps,
  ComponentSize,
  Intent,
  MarginProps,
  MarginPropTypes,
  PropTypeColorMode,
  PropTypeComponentSize,
  PropTypeIntent,
} from "@apptane/react-ui-core";
import { BadgeAppearance, BadgeVisualAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";

export interface BadgeProps extends MarginProps, AppearanceProps<BadgeVisualAppearance, BadgeAppearance> {
  /**
   * Content to decorate.
   */
  children?: React.ReactNode;

  /**
   * Value to display.
   */
  value?: React.ReactNode;

  /**
   * Visual intent. Defaults to `none`.
   */
  intent?: Intent;

  /**
   * The pre-defined theme sizes. Defaults to `default`.
   * Or a numeric size in pixels.
   */
  size?: ComponentSize | number;

  /**
   * Overrides theme-defined left and right padding in pixels.
   */
  padding?: number;

  /**
   * Overrides bullet visibility.
   */
  bulletVisible?: boolean;
}

export const BadgePropTypes = {
  ...MarginPropTypes,
  value: PropTypes.any,
  colorMode: PropTypeColorMode,
  appearance: PropTypes.oneOfType([
    PropTypes.oneOf<BadgeAppearance>(["primary", "secondary", "minimal", "inverted"]),
    PropTypes.func,
  ]),
  intent: PropTypeIntent,
  size: PropTypes.oneOfType([PropTypeComponentSize, PropTypes.number]),
  padding: PropTypes.number,
  bulletVisible: PropTypes.bool,
};
