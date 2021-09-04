import { AnimatedComponentTheme, Color, ComponentWithSizeStyle, ComponentWithSizeTheme } from "@apptane/react-ui-core";

export enum InputToggleVisualState {
  Default = "default",
  Hover = "hover",
  Focused = "focused",
  Disabled = "disabled",
}

export enum InputToggleValueState {
  Unchecked = "unchecked",
  Checked = "checked",
}

export type InputToggleVisualStyle = ComponentWithSizeStyle & {
  /**
   * Default aspect ratio — width / height.
   */
  aspectRatio: number;

  /**
   * Padding in pixels.
   */
  padding: number;

  /**
   * Margin in pixels between glyph and border.
   */
  glyphMargin: number;

  /**
   * Spacing in pixels between radio button and content.
   */
  spacing: number;
};

export type InputToggleVisualStateAppearance = {
  /**
   * Glyph color.
   */
  glyph: Color;

  /**
   * Border color.
   */
  border: Color;

  /**
   * Border width in pixels.
   */
  borderWidth: number;

  /**
   * Background color.
   */
  back: Color;
};

export type InputToggleVisualAppearance = {
  [value in InputToggleValueState]: {
    [state in InputToggleVisualState]: InputToggleVisualStateAppearance;
  };
};

/**
 * Theme type definitions: InputToggle
 */
export type InputToggleTheme = ComponentWithSizeTheme<InputToggleVisualStyle, InputToggleVisualAppearance> &
  AnimatedComponentTheme;
