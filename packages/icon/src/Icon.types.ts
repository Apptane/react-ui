import {
  Color,
  ColorMode,
  MarginProps,
  MarginPropTypes,
  PaletteTextSlot,
  PropTypeColorMode,
} from "@apptane/react-ui-core";
import PropTypes from "prop-types";

export type IconData = {
  /**
   * SVG viewBox attribute.
   */
  viewBox?: string | null;

  /**
   * SVG content.
   */
  svg?: React.ReactFragment | null;
};

export const IconDataPropTypes = PropTypes.shape({
  viewBox: PropTypes.string,
  svg: PropTypes.node,
});

export interface IconProps extends MarginProps {
  /**
   * Overrides the color mode.
   * Default is to use globally set theme color mode or fallback to `light`.
   */
  colorMode?: ColorMode;

  /**
   * Name of the icon referencing SVG symbol with the same identifier
   * in the document context.
   *
   * Name prefixed with `i:` refers a pre-defined builtin icon.
   */
  name?: string;

  /**
   * Size of the icon in pixels. Defaults to 24px.
   * Icon has the same width and height if size is specified,
   * but no `width` or `height` is defined.
   */
  size?: number;

  /**
   * Width of the icon in pixels. Overrides `size` property.
   */
  width?: number;

  /**
   * Height of the icon in pixels. Overrides `size` property.
   */
  height?: number;

  /**
   * Color of the icon. Defaults to `default'.
   * Supports palette semantic text colors.
   */
  color?: Color | PaletteTextSlot;

  /**
   * Vector data of the icon. If specified overrides `name` property.
   */
  data?: IconData;

  /**
   * Indicates whether it must be rendered as an inline element.
   */
  inline?: boolean;
}

export const IconPropTypes = {
  ...MarginPropTypes,
  colorMode: PropTypeColorMode,
  name: PropTypes.string,
  size: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  data: IconDataPropTypes,
  inline: PropTypes.bool,
};
