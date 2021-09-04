import {
  ColorMode,
  ComponentSize,
  MarginProps,
  MarginPropTypes,
  PropTypeColorMode,
  PropTypeComponentSize,
} from "@apptane/react-ui-core";
import PropTypes from "prop-types";

export interface AvatarGroupProps extends MarginProps {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * The pre-defined theme sizes. Defaults to `default`.
   * Or a numeric size in pixels.
   */
  size?: ComponentSize | number;

  /**
   * Overrides the color mode.
   * Default is to use globally set theme color mode or fallback to `light`.
   */
  colorMode?: ColorMode;

  /**
   * Indicates whether avatar must be rendered with square-ish border.
   */
  square?: boolean;

  /**
   * Spacing between items in pixels. Defaults to -4px.
   */
  spacing?: number;

  /**
   * Maximum number of avatars to display before switching to overflow mode.
   */
  maxCount?: number;

  /**
   * Maximum width of the group to fit into.
   */
  maxWidth?: number;
}

export const AvatarGroupPropTypes = {
  ...MarginPropTypes,
  colorMode: PropTypeColorMode,
  size: PropTypes.oneOfType([PropTypeComponentSize, PropTypes.number]),
  square: PropTypes.bool,
  spacing: PropTypes.number,
  maxCount: PropTypes.number,
  maxWidth: PropTypes.number,
};
