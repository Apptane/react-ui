import { Color, ComponentTheme } from "@apptane/react-ui-core";

export type BulletVisualStyle = {
  /**
   * Default size in pixels.
   */
  size: number;
};

export type BulletVisualAppearance = {
  /**
   * Background color.
   */
  back: Color;

  /**
   * Border color.
   */
  border: Color;

  /**
   * Border width in pixels.
   */
  borderWidth: number;
};

/**
 * Theme type definitions: Bullet
 */
export type BulletTheme = ComponentTheme<BulletVisualStyle, BulletVisualAppearance>;
