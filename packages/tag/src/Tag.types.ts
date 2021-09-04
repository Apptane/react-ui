import {
  AppearanceProps,
  ComponentSize,
  MarginProps,
  MarginPropTypes,
  PaletteHue,
  PropTypeColorMode,
  PropTypeComponentSize,
} from "@apptane/react-ui-core";
import { TagAppearance, TagVisualAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";

export interface TagProps extends MarginProps, AppearanceProps<TagVisualAppearance, TagAppearance> {
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
   * Overrides the default color theme.
   * Supports palette semantic hues.
   */
  hue?: PaletteHue;

  /**
   * Tooltip to display when user hovers mouse over the component.
   */
  tooltip?: React.ReactNode;

  /**
   * When specified, renders '×' glyph with click callback invoking this function.
   */
  onRemove?: () => void;

  /**
   * Indicates whether it be rendered in an inactive state.
   */
  inactive?: boolean;

  /**
   * Indicates whether it be rendered as an inline element.
   */
  inline?: boolean;
}

const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
export const TagPropTypes = {
  ...MarginPropTypes,
  colorMode: PropTypeColorMode,
  appearance: PropTypes.oneOfType([
    PropTypes.oneOf<TagAppearance>(["primary", "secondary", "neutral"]),
    PropTypes.func,
  ]),
  size: PropTypes.oneOfType([PropTypeComponentSize, PropTypes.number]),
  width: PropTypeNumberOrString,
  hue: PropTypes.string,
  tooltip: PropTypes.node,
  onRemove: PropTypes.func,
  inactive: PropTypes.bool,
  inline: PropTypes.bool,
};
