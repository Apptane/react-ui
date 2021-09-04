import {
  AnimatedComponentTheme,
  Color,
  ComponentWithSizeStyle,
  ComponentWithSizeTheme,
  FontProps,
  Padding,
} from "@apptane/react-ui-core";

export enum TabsVisualState {
  Default = "default",
  Focused = "focused",
  Toggled = "toggled",
  Disabled = "disabled",
}

export type TabsVisualStyle = ComponentWithSizeStyle & {
  /**
   * Tab item content (excluding accent) padding in pixels.
   */
  itemPadding: Padding;

  /**
   * Spacing in pixels between tab items.
   */
  itemSpacing: number;

  /**
   * Accent height.
   */
  accentHeight: number;

  /**
   * Accent width.
   */
  accentWidth: string | number;

  /**
   * Accent border radius.
   */
  accentBorderRadius: number;

  /**
   * Typography.
   */
  font: FontProps;
};

export type TabsVisualStateAppearance = {
  /**
   * Text color.
   */
  text: Color;

  /**
   * Accent color.
   */
  accent?: Color;
};

export type TabsVisualAppearance = {
  [state in TabsVisualState]: TabsVisualStateAppearance;
} & {
  /**
   * Border color.
   */
  border?: Color;
};

/**
 * Theme type definitions: Tabs
 */
export type TabsTheme = ComponentWithSizeTheme<TabsVisualStyle, TabsVisualAppearance> & AnimatedComponentTheme;
