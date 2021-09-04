import {
  ColorMode,
  ComponentSize,
  ContentOrientation,
  ItemValue,
  MarginProps,
  MarginPropTypes,
  PropTypeColorMode,
  PropTypeComponentSize,
  PropTypeContentOrientation,
  SelectorGroupProps,
  SelectorGroupPropTypes,
} from "@apptane/react-ui-core";
import PropTypes from "prop-types";

/**
 * Visual appearance of the toggle group buttons.
 */
export type ToggleGroupAppearance = "default" | "inverted";

export interface ToggleGroupProps<T extends ItemValue> extends MarginProps, SelectorGroupProps<T> {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * Visual appearance. Defaults to `default`.
   * Applies only to `Button` items.
   */
  appearance?: ToggleGroupAppearance;

  /**
   * Overrides the color mode.
   * Default is to use globally set theme color mode or fallback to `light`.
   */
  colorMode?: ColorMode;

  /**
   * Overrides the size of the item.
   */
  size?: ComponentSize | number;

  /**
   * Overrides the width of item.
   */
  width?: number | string;

  /**
   * Spacing between items in pixels. Defaults to 8px.
   */
  spacing?: number;

  /**
   * The orientation of the content within the group.
   * Defaults to `horizontal`.
   */
  orientation?: ContentOrientation;
}

const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
export const ToggleGroupPropTypes = {
  ...MarginPropTypes,
  ...SelectorGroupPropTypes,
  appearance: PropTypes.oneOf<ToggleGroupAppearance>(["default", "inverted"]),
  colorMode: PropTypeColorMode,
  size: PropTypes.oneOfType([PropTypeComponentSize, PropTypes.number]),
  width: PropTypeNumberOrString,
  spacing: PropTypes.number,
  orientation: PropTypeContentOrientation,
};
