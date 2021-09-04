import { AnimatedComponentTheme, Color, ComponentTheme, Elevation, FontProps, Padding } from "@apptane/react-ui-core";
import { BadgeAppearance } from "./BadgeTheme.types";

/**
 * Visual appearance of the sidebar.
 */
export type SideBarAppearance = "default" | "inverted";

export enum SideBarVisualState {
  Default = "default",
  Focused = "focused",
  Toggled = "toggled",
  Disabled = "disabled",
}

export type SideBarVisualStyle = {
  /**
   * Padding in pixels.
   */
  padding: Padding;

  /**
   * Border radius in pixels.
   */
  borderRadius: number;

  /**
   * Item height in pixels.
   */
  itemHeight: number;

  /**
   * Left and right item padding in pixels.
   */
  itemPadding: number;

  /**
   * Spacing in pixels between items.
   */
  itemSpacing: number;

  /**
   * Icon size in pixels.
   */
  iconSize: number;

  /**
   * Spacing in pixels between icon and content.
   */
  iconSpacing: number;

  /**
   * Avatar height in pixels.
   */
  avatarHeight: number;

  /**
   * Avatar size in pixels.
   */
  avatarSize: number;

  /**
   * Spacing in pixels between content and avatar.
   */
  avatarSpacing: number;

  /**
   * Left and right avatar padding in pixels.
   */
  avatarPadding: number;

  /**
   * Header minimum height in pixels.
   */
  headerHeight: number;

  /**
   * Elevation. Applies to fly-out submenu.
   */
  elevation: Elevation;

  /**
   * Typography.
   */
  font: {
    /**
     * Group header font.
     */
    header: FontProps;

    /**
     * Item font.
     */
    item: FontProps;
  };
};

export type SideBarVisualStateAppearance = {
  /**
   * Item text color.
   */
  text: Color;

  /**
   * Item icon color.
   */
  icon: Color;

  /**
   * Item background color.
   */
  back?: Color;

  /**
   * Item badge appearance.
   */
  badge?: BadgeAppearance;
};

export type SideBarVisualAppearance = {
  [state in SideBarVisualState]: SideBarVisualStateAppearance;
} & {
  /**
   * Default text / icon color.
   */
  text: Color;

  /**
   * Background color.
   */
  back: Color;
};

/**
 * Theme type definitions: SideBar
 */
export type SideBarTheme = ComponentTheme<SideBarVisualStyle, SideBarVisualAppearance, SideBarAppearance> &
  AnimatedComponentTheme;
