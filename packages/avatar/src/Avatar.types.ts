import {
  Color,
  ColorMode,
  ComponentSize,
  MarginProps,
  MarginPropTypes,
  PaletteHue,
  PropTypeColorMode,
  PropTypeComponentSize,
} from "@apptane/react-ui-core";
import PropTypes from "prop-types";

/**
 * Avatar type.
 */
export type AvatarType = "default" | "gravatar";

export interface AvatarProps extends MarginProps {
  /**
   * Type of the avatar to display.
   * `default` - use supplied `image` or `name` initials to build the avatar.
   * `gravatar` - use `email` to fetch image from Gravatar service.
   */
  type?: AvatarType;

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
   * Overrides the default background color.
   * Supports palette semantic hues.
   * Only applicable when showing initials derived from the `name`.
   */
  color?: Color | PaletteHue;

  /**
   * Overrides the default text color.
   * Only applicable when showing initials derived from the `name`.
   */
  textColor?: Color | PaletteHue;

  /**
   * Indicates whether contrast border should be visible.
   */
  border?: boolean;

  /**
   * Name associated with the avatar.
   * If the `image` is not specified the first initials of the name
   * as used instead for the avatar content.
   */
  name?: string;

  /**
   * URL of the image to show in the avatar.
   */
  image?: string;

  /**
   * Email to use for fetching image from Gravatar service
   * if `type = gravatar`.
   */
  email?: string;

  /**
   * Tooltip to display on mouse hover.
   */
  tooltip?: React.ReactNode;

  /**
   * Indicates whether avatar must be rendered with square-ish border.
   */
  square?: boolean;

  /**
   * Callback invoked when avatar is clicked.
   */
  onClick?: () => void;

  /**
   * Indicates that avatar represents a placeholder for
   * an overflow count instead of an actual avatar.
   */
  overflow?: number | string;

  /**
   * Indicates whether it must be rendered as an inline element.
   */
  inline?: boolean;
}

const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
export const AvatarPropTypes = {
  ...MarginPropTypes,
  type: PropTypes.oneOf<AvatarType>(["default", "gravatar"]),
  colorMode: PropTypeColorMode,
  size: PropTypes.oneOfType([PropTypeComponentSize, PropTypes.number]),
  color: PropTypes.string,
  textColor: PropTypes.string,
  border: PropTypes.bool,
  name: PropTypes.string,
  image: PropTypes.string,
  email: PropTypes.string,
  tooltip: PropTypes.node,
  square: PropTypes.bool,
  onClick: PropTypes.func,
  overflow: PropTypeNumberOrString,
  inline: PropTypes.bool,
};
