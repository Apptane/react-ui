import PropTypes from "prop-types";
import { convertToPixels } from "./utils";

/**
 * Base properties common to all components that support
 * padding specification.
 */
export interface PaddingProps {
  /**
   * The padding of the element. Numeric value is treated as pixels.
   */
  padding?: number | string;

  /**
   * The top padding of the element. See `padding` property.
   */
  paddingTop?: number | string;

  /**
   * The right padding of the element. See `padding` property.
   */
  paddingRight?: number | string;

  /**
   * The bottom padding of the element. See `padding` property.
   */
  paddingBottom?: number | string;

  /**
   * The left padding of the element. See `padding` property.
   */
  paddingLeft?: number | string;

  /**
   * The padding of the element. Numeric value is treated as pixels.
   * This is the shortcut version of the `padding` property.
   */
  p?: number | string;

  /**
   * The top padding of the element. See `padding` property.
   * This is the shortcut version of the `paddingTop` property.
   */
  pt?: number | string;

  /**
   * The right padding of the element. See `padding` property.
   * This is the shortcut version of the `paddingRight` property.
   */
  pr?: number | string;

  /**
   * The bottom padding of the element. See `padding` property.
   * This is the shortcut version of the `paddingBottom` property.
   */
  pb?: number | string;

  /**
   * The left padding of the element. See `padding` property.
   * This is the shortcut version of the `paddingLeft` property.
   */
  pl?: number | string;
}

const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
export const PaddingPropTypes = {
  padding: PropTypeNumberOrString,
  paddingTop: PropTypeNumberOrString,
  paddingRight: PropTypeNumberOrString,
  paddingBottom: PropTypeNumberOrString,
  paddingLeft: PropTypeNumberOrString,
  p: PropTypeNumberOrString,
  pt: PropTypeNumberOrString,
  pr: PropTypeNumberOrString,
  pb: PropTypeNumberOrString,
  pl: PropTypeNumberOrString,
};

export const StylePadding = ({
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  p,
  pt,
  pr,
  pb,
  pl,
}: PaddingProps) => ({
  paddingTop: convertToPixels(paddingTop ?? pt ?? padding ?? p),
  paddingRight: convertToPixels(paddingRight ?? pr ?? padding ?? p),
  paddingBottom: convertToPixels(paddingBottom ?? pb ?? padding ?? p),
  paddingLeft: convertToPixels(paddingLeft ?? pl ?? padding ?? p),
});
