import {
  BoxBorderProps,
  BoxBorderPropTypes,
  Color,
  ColorMode,
  Elevation,
  PaddingProps,
  PaddingPropTypes,
  PaletteBackgroundSlot,
  PropTypeColorMode,
  PropTypeElevation,
} from "@apptane/react-ui-core";
import { MenuAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";

export interface MenuProps extends PaddingProps, BoxBorderProps {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * Overrides the color mode.
   * Default is to use globally set theme color mode or fallback to `light`.
   */
  colorMode?: ColorMode;

  /**
   * Visual appearance. Defaults to `default`.
   */
  appearance?: MenuAppearance;

  /**
   * Overrides the background color. Supports theme palette background names.
   */
  background?: Color | PaletteBackgroundSlot;

  /**
   * The elevation level.
   */
  elevation?: Elevation;

  /**
   * Width of the menu box.
   */
  width?: number | string;

  /**
   * Minimum width of the menu box in pixels.
   */
  minWidth?: number;

  /**
   * Overrides the item height.
   */
  itemHeight?: number;

  /**
   * Maximum height of the menu box in pixels.
   * Vertical scrolling is enabled in case of overflow.
   */
  maxHeight?: number;

  /**
   * Indicates that menu must be rendered in a popup style.
   */
  popup?: boolean;

  /**
   * Callback invoked when Escape key is pressed.
   */
  onEsc?: () => void;
}

const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
export const MenuPropTypes = {
  ...PaddingPropTypes,
  ...BoxBorderPropTypes,
  colorMode: PropTypeColorMode,
  appearance: PropTypes.oneOf<MenuAppearance>(["default", "inverted"]),
  background: PropTypes.string,
  elevation: PropTypeElevation,
  width: PropTypeNumberOrString,
  minWidth: PropTypes.number,
  itemHeight: PropTypes.number,
  maxHeight: PropTypes.number,
  popup: PropTypes.bool,
  onEsc: PropTypes.func,
};
