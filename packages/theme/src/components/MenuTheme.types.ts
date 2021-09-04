import { AnimatedComponentTheme, Color, ComponentTheme, Elevation, FontProps, Padding } from "@apptane/react-ui-core";
import { BadgeAppearance } from "./BadgeTheme.types";

/**
 * Visual appearance of the menu item.
 */
export type MenuAppearance = "default" | "inverted";

export enum MenuVisualState {
  Default = "default",
  Focused = "focused",
  Toggled = "toggled",
  Disabled = "disabled",
}

export type MenuVisualStyle = {
  /**
   * Padding in pixels.
   */
  padding: Padding;

  /**
   * Elevation.
   */
  elevation?: Elevation;

  /**
   * Border radius in pixels.
   */
  borderRadius: number;

  /**
   * Left and right item padding in pixels.
   */
  itemPadding: number;

  /**
   * Spacing in pixels between items.
   */
  itemSpacing: number;

  /**
   * Spacing in pixels between icon and content.
   */
  iconSpacing: number;

  /**
   * Divider size in pixels.
   */
  dividerSize: number;

  /**
   * Typography.
   */
  font: FontProps;
};

export type MenuVisualStateAppearance = {
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
  back?: Color;

  /**
   * Badge appearance.
   */
  badge?: BadgeAppearance;
};

export type MenuVisualAppearance = {
  [state in MenuVisualState]: MenuVisualStateAppearance;
};

/**
 * Theme type definitions: Menu
 */
export type MenuTheme = ComponentTheme<MenuVisualStyle, MenuVisualAppearance, MenuAppearance> & AnimatedComponentTheme;
