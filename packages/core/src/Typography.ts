import PropTypes from "prop-types";

/**
 * Semantic font weight.
 */
export type FontWeight = "light" | "regular" | "medium" | "semibold" | "bold";

/**
 * Semantic font size.
 */
export type FontSize = "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge";

/**
 * Semantic font category.
 */
export type TypographyCategory = "content" | "header" | "control" | "numeric";

/**
 * Font properties.
 */
export interface FontProps {
  /**
   * Semantic category.
   */
  category?: TypographyCategory;

  /**
   * Semantic or actual weight.
   */
  weight?: FontWeight | number;

  /**
   * Semantic or actual size.
   */
  size?: FontSize | number | string;

  /**
   * Line height. Numeric value is treated as size multiplier.
   */
  lineHeight?: number | string;

  /**
   * Letter spacing. Numeric value is treated in pixels.
   */
  spacing?: number | string;

  /**
   * Indicates whether numerical glyphs should be rendered
   * using lining figures with uniform (tabular) widths.
   */
  mono?: boolean;
}

const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
export const FontPropTypes = {
  category: PropTypes.oneOf<TypographyCategory>(["content", "header", "control", "numeric"]),
  size: PropTypes.oneOfType([
    PropTypes.oneOf<FontSize>(["xsmall", "small", "medium", "large", "xlarge", "xxlarge"]),
    PropTypes.number,
    PropTypes.string,
  ]),
  weight: PropTypes.oneOfType([
    PropTypes.oneOf<FontWeight>(["light", "regular", "medium", "semibold", "bold"]),
    PropTypes.number,
  ]),
  lineHeight: PropTypeNumberOrString,
  spacing: PropTypeNumberOrString,
  mono: PropTypes.bool,
};
