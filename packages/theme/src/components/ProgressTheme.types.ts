import { AnimatedComponentTheme, Color, ComponentTheme, FontProps, Padding } from "@apptane/react-ui-core";

export type ProgressVisualStyle = {
  /**
   * Item content padding in pixels.
   */
  itemPadding: Padding;

  /**
   * Spacing in pixels between items.
   */
  itemSpacing: number;

  /**
   * Spacing in pixels between icon and content.
   */
  iconSpacing: number;

  /**
   * Icon size.
   */
  iconSize: number;

  /**
   * Typography.
   */
  font: FontProps;
};

export type ProgressVisualAppearance = {
  /**
   * Default color.
   */
  default: Color;

  /**
   * Focused color.
   */
  focused: Color;

  /**
   * Disabled color.
   */
  disabled: Color;

  /**
   * Error color.
   */
  error: Color;
};

/**
 * Theme type definitions: Progress
 */
export type ProgressTheme = ComponentTheme<ProgressVisualStyle, ProgressVisualAppearance> & AnimatedComponentTheme;
