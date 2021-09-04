import { Color, ContentAlignment } from "@apptane/react-ui-core";
import { FontProperties } from "@apptane/react-ui-theme";
import { css } from "@emotion/react";

/**
 * Font smoothing options (works on Mac OSX only)
 */
export const StyleTextSmooth = css`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-kerning: normal;
`;

/**
 * Base text style based on font properties.
 */
export const StyleTextBase = (font: FontProperties) => css`
  font-family: ${font.family};
  font-size: ${font.size};
  font-weight: ${font.weight};
  line-height: ${font.lineHeight ?? 1};
  ${font.features && `font-feature-settings: ${font.features}`};
  ${font.numeric && `font-variant-numeric: ${font.numeric}`};
  ${font.spacing && `letter-spacing: ${font.spacing}`};
  ${StyleTextSmooth};
`;

/**
 * Text style based on font properties, color and alignment.
 */
export const StyleText = (font: FontProperties, color: Color, alignment: ContentAlignment = "left") => css`
  ${StyleTextBase(font)};
  color: ${color};
  text-align: ${alignment};
`;

/**
 * Text style for ellipsis overflow.
 */
export const StyleTextEllipsis = css`
  text-overflow: ellipsis;
  overflow: hidden;
`;

/**
 * Text style with wrapping disabled.
 */
export const StyleTextNowrap = css`
  white-space: nowrap;
  flex-wrap: nowrap;
`;
