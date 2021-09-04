import { Color, ComponentTheme, FontProps, Padding } from "@apptane/react-ui-core";

export type BannerVisualStyle = {
  /**
   * Border radius in pixels.
   */
  borderRadius: number;

  /**
   * Default content padding in pixels.
   */
  padding: Padding;

  /**
   * Spacing in pixels between header and body.
   */
  contentSpacing: number;

  /**
   * Spacing in pixels between content and action buttons.
   */
  actionSpacing: number;

  /**
   * Spacing in pixels between icon and content.
   */
  iconSpacing: number;

  /**
   * Icon size in pixels.
   */
  iconSize: number;

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

export type BannerVisualAppearance = {
  /**
   * Text color.
   */
  text: Color;

  /**
   * Icon color.
   */
  icon: Color;

  /**
   * Background color.
   */
  back: Color;

  /**
   * Border color.
   */
  border: Color;
};

/**
 * Theme type definitions: Banner
 */
export type BannerTheme = ComponentTheme<BannerVisualStyle, BannerVisualAppearance>;
