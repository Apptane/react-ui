import { Color, ComponentWithSizeStyle, ComponentWithSizeTheme, FontProps, Padding } from "@apptane/react-ui-core";

/**
 * Visual appearance of the badge.
 */
export type BadgeAppearance = "primary" | "secondary" | "minimal" | "inverted";

export type BadgeVisualStyle = ComponentWithSizeStyle & {
  /**
   * Padding in pixels.
   */
  padding: Padding;

  /**
   * Border radius in pixels.
   */
  borderRadius: number;

  /**
   * Spacing between content and bullet in pixels.
   */
  spacing: number;

  /**
   * Typography.
   */
  font: FontProps;
};

export type BadgeVisualAppearance = {
  /**
   * Text color.
   */
  text: Color;

  /**
   * Background color.
   */
  back?: Color;

  /**
   * Indicates that bullet must be visible by default.
   */
  bulletVisible: boolean;
};

/**
 * Theme type definition: Badge
 */
export type BadgeTheme = ComponentWithSizeTheme<BadgeVisualStyle, BadgeVisualAppearance, BadgeAppearance>;
