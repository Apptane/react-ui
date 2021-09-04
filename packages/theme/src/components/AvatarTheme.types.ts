import {
  Color,
  ComponentWithSizeStyle,
  ComponentWithSizeTheme,
  FontProps,
  PaletteWeight,
} from "@apptane/react-ui-core";

/**
 * Visual appearance of the avatar.
 */
export type AvatarAppearance = "default" | "initials" | "overflow";

export type AvatarVisualStyle = ComponentWithSizeStyle & {
  /**
   * Border radius in pixels for non-round borders.
   */
  borderRadius: number;

  /**
   * Border width in pixels for accented outline.
   */
  borderWidth: number;

  /**
   * Typography.
   */
  font: FontProps;
};

export type AvatarVisualAppearance = {
  /**
   * Outline border color to display on keyboard and mouse interaction.
   */
  outline: Color;

  /**
   * Text color.
   */
  text?: Color;

  /**
   * Default background color.
   */
  back: Color;

  /**
   * Border color.
   */
  border?: Color;

  /**
   * Default weight to use with custom background color.
   */
  weight?: PaletteWeight;
};

/**
 * Theme type definitions: Avatar
 */
export type AvatarTheme = ComponentWithSizeTheme<AvatarVisualStyle, AvatarVisualAppearance, AvatarAppearance>;
