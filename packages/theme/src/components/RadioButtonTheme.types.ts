import { AnimatedComponentTheme, Color, ComponentWithSizeStyle, ComponentWithSizeTheme } from "@apptane/react-ui-core";

export enum RadioButtonVisualState {
  Default = "default",
  Hover = "hover",
  Focused = "focused",
  Disabled = "disabled",
}

export enum RadioButtonValueState {
  Unchecked = "unchecked",
  Checked = "checked",
}

export type RadioButtonVisualStyle = ComponentWithSizeStyle & {
  /**
   * Padding in pixels.
   */
  padding: number;

  /**
   * Glyph size as the ratio of the total size.
   */
  glyphSize: number;

  /**
   * Spacing in pixels between radio button and content.
   */
  spacing: number;
};

export type RadioButtonVisualStateAppearance = {
  /**
   * Glyph color.
   */
  glyph?: Color;

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

export type RadioButtonVisualAppearance = {
  [value in RadioButtonValueState]: {
    [state in RadioButtonVisualState]: RadioButtonVisualStateAppearance;
  };
};

/**
 * Theme type definitions: RadioButton
 */
export type RadioButtonTheme = ComponentWithSizeTheme<RadioButtonVisualStyle, RadioButtonVisualAppearance> &
  AnimatedComponentTheme;
