import { Color, ComponentTheme, Elevation, FontProps, Padding } from "@apptane/react-ui-core";

/**
 * Visual appearance of the tooltip.
 */
export type TooltipAppearance = "default" | "inverted";

export type TooltipVisualStyle = {
  /**
   * Maximum width in pixels.
   */
  maxWidth: number;

  /**
   * Border radius in pixels.
   */
  borderRadius: number;

  /**
   * Content padding in pixels.
   */
  padding: Padding;

  /**
   * Spacing in pixels between header and body.
   */
  contentSpacing: number;

  /**
   * Size of the tooltip arrow.
   */
  arrowSize: number;

  /**
   * Opacity.
   */
  opacity: number;

  /**
   * Typography.
   */
  font: {
    /**
     * Header font.
     */
    header: FontProps;

    /**
     * Body font.
     */
    body: FontProps;
  };
};

export type TooltipVisualAppearance = {
  /**
   * Text color.
   */
  text: Color;

  /**
   * Background color.
   */
  back: Color;

  /**
   * Border color.
   */
  border?: Color;

  /**
   * Elevation.
   */
  elevation?: Elevation;
};

/**
 * Theme type definitions: Tooltip
 */
export type TooltipTheme = ComponentTheme<TooltipVisualStyle, TooltipVisualAppearance, TooltipAppearance>;
