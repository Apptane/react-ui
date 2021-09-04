import PropTypes from "prop-types";
import { convertToPixels } from "./utils";

/**
 * Base properties common to all components that support
 * margin specification.
 */
export interface MarginProps {
  /**
   * The margin of the element. Numeric value is treated as pixels.
   */
  margin?: number | string;

  /**
   * The top margin of the element. See `margin` property.
   */
  marginTop?: number | string;

  /**
   * The right margin of the element. See `margin` property.
   */
  marginRight?: number | string;

  /**
   * The bottom margin of the element. See `margin` property.
   */
  marginBottom?: number | string;

  /**
   * The left margin of the element. See `margin` property.
   */
  marginLeft?: number | string;

  /**
   * The margin of the element. Numeric value is treated as pixels.
   * This is the shortcut version of the `margin` property.
   */
  m?: number | string;

  /**
   * The top margin of the element. See `margin` property.
   * This is the shortcut version of the `marginTop` property.
   */
  mt?: number | string;

  /**
   * The right margin of the element. See `margin` property.
   * This is the shortcut version of the `marginRight` property.
   */
  mr?: number | string;

  /**
   * The bottom margin of the element. See `margin` property.
   * This is the shortcut version of the `marginBottom` property.
   */
  mb?: number | string;

  /**
   * The left margin of the element. See `margin` property.
   * This is the shortcut version of the `marginLeft` property.
   */
  ml?: number | string;
}

const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
export const MarginPropTypes = {
  margin: PropTypeNumberOrString,
  marginTop: PropTypeNumberOrString,
  marginRight: PropTypeNumberOrString,
  marginBottom: PropTypeNumberOrString,
  marginLeft: PropTypeNumberOrString,
  m: PropTypeNumberOrString,
  mt: PropTypeNumberOrString,
  mr: PropTypeNumberOrString,
  mb: PropTypeNumberOrString,
  ml: PropTypeNumberOrString,
};

export const StyleMargin = ({
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  m,
  mt,
  mr,
  mb,
  ml,
}: MarginProps) => ({
  marginTop: convertToPixels(marginTop ?? mt ?? margin ?? m),
  marginRight: convertToPixels(marginRight ?? mr ?? margin ?? m),
  marginBottom: convertToPixels(marginBottom ?? mb ?? margin ?? m),
  marginLeft: convertToPixels(marginLeft ?? ml ?? margin ?? m),
});
