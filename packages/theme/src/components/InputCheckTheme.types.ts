import { AnimatedComponentTheme, Color, ComponentWithSizeStyle, ComponentWithSizeTheme } from "@apptane/react-ui-core";

export enum InputCheckVisualState {
  Default = "default",
  Hover = "hover",
  Focused = "focused",
  Disabled = "disabled",
}

export enum InputCheckValueState {
  Unchecked = "unchecked",
  Checked = "checked",
}

export type InputCheckVisualStyle = ComponentWithSizeStyle & {
  /**
   * Padding in pixels.
   */
  padding: number;

  /**
   * Border radius in pixels.
   */
  borderRadius: number;

  /**
   * Spacing in pixels between radio button and content.
   */
  spacing: number;
};

export type InputCheckVisualStateAppearance = {
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

export type InputCheckVisualAppearance = {
  [value in InputCheckValueState]: {
    [state in InputCheckVisualState]: InputCheckVisualStateAppearance;
  };
};

/**
 * Theme type definitions: InputCheck
 */
export type InputCheckTheme = ComponentWithSizeTheme<InputCheckVisualStyle, InputCheckVisualAppearance> &
  AnimatedComponentTheme;
