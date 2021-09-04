import { Color, ComponentTheme, FontProps } from "@apptane/react-ui-core";

export enum DividerVisualState {
  Default = "default",
  Focused = "focused",
}

export type DividerVisualStyle = {
  /**
   * Spacing in pixels between line and content.
   */
  spacing: number;

  /**
   * Typography.
   */
  font: FontProps;
};

export type DividerVisualStateAppearance = {
  /**
   * Border color.
   */
  border: Color;

  /**
   * Text color.
   */
  text: Color;
};

export type DividerVisualAppearance = {
  [state in DividerVisualState]: DividerVisualStateAppearance;
};

/**
 * Theme type definitions: Divider
 */
export type DividerTheme = ComponentTheme<DividerVisualStyle, DividerVisualAppearance>;
