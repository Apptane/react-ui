import PropTypes from "prop-types";
import { Color } from "./CommonTypes";
import { PaletteBorderSlot } from "./PaletteTypes";

/**
 * Box border properties.
 */
export interface BoxBorderProps {
  /**
   * The border. Supports theme palette border names or boolean value
   * indicating whether all borders must be invisible (false) or default
   * border must be visible (true).
   */
  border?: boolean | Color | PaletteBorderSlot;

  /**
   * The style of the border. Must be a valid CSS style.
   */
  borderStyle?: string;

  /**
   * The width of border in pixels. Defaults to 1.
   */
  borderWidth?: number;

  /**
   * Overrides the top border. See `border` property.
   */
  borderTop?: boolean | Color | PaletteBorderSlot;

  /**
   * Overrides the top border width. See `borderWidth` property.
   */
  borderTopWidth?: number;

  /**
   * Overrides the right border. See `border` property.
   */
  borderRight?: boolean | Color | PaletteBorderSlot;

  /**
   * Overrides the right border width. See `borderWidth` property.
   */
  borderRightWidth?: number;

  /**
   * Overrides the bottom border. See `border` property.
   */
  borderBottom?: boolean | Color | PaletteBorderSlot;

  /**
   * Overrides the bottom border width. See `borderWidth` property.
   */
  borderBottomWidth?: number;

  /**
   * Overrides the left border. See `border` property.
   */
  borderLeft?: boolean | Color | PaletteBorderSlot;

  /**
   * Overrides the left border width. See `borderWidth` property.
   */
  borderLeftWidth?: number;

  /**
   * The corner radius in pixels.
   */
  cornerRadius?: number;

  /**
   * Overrides the top-left corner radius. See `cornerRadius` property.
   */
  cornerTopLeftRadius?: number;

  /**
   * Overrides the top-right corner radius. See `cornerRadius` property.
   */
  cornerTopRightRadius?: number;

  /**
   * Overrides the bottom-left corner radius. See `cornerRadius` property.
   */
  cornerBottomLeftRadius?: number;

  /**
   * Overrides the bottom-right corner radius. See `cornerRadius` property.
   */
  cornerBottomRightRadius?: number;
}

const PropTypeBoolOrString = PropTypes.oneOfType([PropTypes.bool, PropTypes.string]);
export const BoxBorderPropTypes = {
  border: PropTypeBoolOrString,
  borderStyle: PropTypes.string,
  borderWidth: PropTypes.number,
  borderTop: PropTypeBoolOrString,
  borderTopWidth: PropTypes.number,
  borderRight: PropTypeBoolOrString,
  borderRightWidth: PropTypes.number,
  borderBottom: PropTypeBoolOrString,
  borderBottomWidth: PropTypes.number,
  borderLeft: PropTypeBoolOrString,
  borderLeftWidth: PropTypes.number,
  cornerRadius: PropTypes.number,
  cornerTopLeftRadius: PropTypes.number,
  cornerTopRightRadius: PropTypes.number,
  cornerBottomLeftRadius: PropTypes.number,
  cornerBottomRightRadius: PropTypes.number,
};
