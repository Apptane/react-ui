import { convertToPixels, FontProps, FontSize, FontWeight, TypographyCategory } from "@apptane/react-ui-core";

export const MonoNumeralsFontFeatures = "'lnum' on, 'tnum' on";
export const MonoNumeralsFontNumeric = "lining-nums tabular-nums";

export interface TypographyCategoryVariant {
  /**
   * Font family override.
   */
  family?: string;

  /**
   * Actual font size. Numeric value is treated as pixels.
   */
  size: number | string;

  /**
   * Actual weight of the font.
   */
  weight: number | string;

  /**
   * Line height. Numeric value is treated as size multiplier.
   * Defaults to 1.
   */
  lineHeight?: number | string;

  /**
   * Letter spacing.
   */
  spacing?: number | string;

  /**
   * Font-feature-settings (optional).
   */
  features?: string;

  /**
   * Font-variant-numeric (optional).
   */
  numeric?: string;
}

export interface TypographyFont {
  /**
   * Font typographical family.
   */
  family: string;

  /**
   * Font typographical weight.
   */
  weight: number | string;
}

export type Typography = {
  /**
   * Definitions for each font semantic category, size and weight.
   */
  [category in TypographyCategory]: {
    [size in FontSize]?: {
      [weight in FontWeight]?: TypographyCategoryVariant;
    };
  } & {
    /**
     * Font.
     */
    font: TypographyFont;
  };
};

export type FontProperties = {
  family: string;
  weight: string | number;
  size: string;
  lineHeight?: string | number;
  spacing?: string;
  features?: string;
  numeric?: string;
};

/**
 * Resolves semantic font properties into absolute values.
 */
export function resolveFont(typography: Typography, style: FontProps): FontProperties {
  const features = style.mono ? MonoNumeralsFontFeatures : undefined;
  const numeric = style.mono ? MonoNumeralsFontNumeric : undefined;

  const c = typography[style.category ?? "content"];
  if (typeof style.size === "string") {
    let s:
      | {
          [weight in FontWeight]?: TypographyCategoryVariant;
        }
      | undefined;

    switch (style.size) {
      case "xsmall":
        s = c.xsmall ?? c.small ?? c.medium ?? c.large ?? c.xlarge ?? c.xxlarge;
        break;
      case "small":
        s = c.small ?? c.medium ?? c.large ?? c.xlarge ?? c.xxlarge;
        break;
      case "medium":
        s = c.medium ?? c.large ?? c.xlarge ?? c.xxlarge;
        break;
      case "large":
        s = c.large ?? c.xlarge ?? c.xxlarge;
        break;
      case "xlarge":
        s = c.xlarge ?? c.xxlarge;
        break;
      case "xxlarge":
        s = c.xxlarge;
        break;
      default:
        return {
          family: c.font.family,
          size: style.size,
          weight: style.weight ?? c.font.weight,
          lineHeight: style.lineHeight,
          spacing: convertToPixels(style.spacing),
          features: features,
          numeric: numeric,
        };
    }

    if (s == null) {
      throw new Error(`At least one size variant must be specified for the font category ${style.category}`);
    }

    if (typeof style.weight === "string") {
      let v: TypographyCategoryVariant | undefined;
      switch (style.weight) {
        case "light":
          v = s.light ?? s.regular ?? s.medium ?? s.semibold ?? s.bold;
          break;
        case "regular":
          v = s.regular ?? s.medium ?? s.semibold ?? s.bold;
          break;
        case "medium":
          v = s.medium ?? s.semibold ?? s.bold;
          break;
        case "semibold":
          v = s.semibold ?? s.bold;
          break;
        case "bold":
          v = s.bold;
          break;
      }

      if (v == null) {
        throw new Error(
          `At least one weight variant must be specified for the font size ${style.size} in category ${style.category}`
        );
      }

      return {
        family: v?.family ?? c.font.family,
        size: typeof v.size === "string" ? v.size : `${v.size}px`,
        weight: v.weight,
        lineHeight: style.lineHeight ?? v.lineHeight,
        spacing: convertToPixels(style.spacing ?? v.spacing),
        features: features ?? v.features,
        numeric: numeric ?? v.numeric,
      };
    } else {
      throw new Error(
        `Semantic weight variant is expected for the font size ${style.size} in category ${style.category}`
      );
    }
  } else {
    return {
      family: c.font.family,
      size: `${style.size}px`,
      weight: style.weight ?? c.font.weight,
      lineHeight: style.lineHeight,
      spacing: convertToPixels(style.spacing),
      features: features,
      numeric: numeric,
    };
  }
}
