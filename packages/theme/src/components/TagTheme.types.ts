import {
  Color,
  ComponentWithSizeStyle,
  ComponentWithSizeTheme,
  FontProps,
  Padding,
  PaletteWeight,
} from "@apptane/react-ui-core";

/**
 * Visual appearance of the tag.
 */
export type TagAppearance = "primary" | "secondary" | "neutral";

export enum TagVisualState {
  Default = "default",
  Focused = "focused",
  Inactive = "inactive",
}

export type TagVisualStyle = ComponentWithSizeStyle & {
  /**
   * Padding in pixels.
   */
  padding: Padding;

  /**
   * Left and right padding in pixels for the text content.
   */
  textPadding: number;

  /**
   * Border radius in pixels.
   */
  borderRadius: number;

  /**
   * Close button size in pixels.
   */
  buttonSize: number;

  /**
   * Spacing in pixels between content and close button.
   */
  spacing: number;

  /**
   * Typography.
   */
  font: FontProps;
};

export type TagVisualStateAppearance = {
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
   * Text weight to use with custom color.
   */
  textWeight: PaletteWeight;

  /**
   * Background weight to use with custom color.
   */
  backWeight?: PaletteWeight;

  /**
   * Border weight to use with custom color.
   */
  borderWeight?: PaletteWeight;
};

export type TagVisualAppearance = {
  [state in TagVisualState]: TagVisualStateAppearance;
};

/**
 * Theme type definitions: Tag
 */
export type TagTheme = ComponentWithSizeTheme<TagVisualStyle, TagVisualAppearance, TagAppearance>;
