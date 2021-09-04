import {
  AnimatedComponentTheme,
  AnimationStyle,
  Color,
  ComponentWithSizeStyle,
  ComponentWithSizeTheme,
  FontProps,
  Padding,
} from "@apptane/react-ui-core";

/**
 * Visual appearances of the input box.
 */
export type InputBoxAppearance = "default" | "embedded";

/**
 * Visual appearances of the error associated with the input.
 */
export type InputBoxErrorAppearance = "none" | "glyph" | "hint" | "both";

/**
 * Kind of the input box.
 */
export type InputBoxKind = "default" | "area";

export enum InputBoxVisualState {
  Default = "default",
  Hover = "hover",
  Focused = "focused",
  Disabled = "disabled",
}

export type InputBoxVisualStyle = ComponentWithSizeStyle & {
  /**
   * Padding in pixels.
   */
  padding: Padding;

  /**
   * Border radius in pixels.
   */
  borderRadius: number;

  /**
   * Spacing in pixels between box and the error message.
   */
  errorSpacing: number;

  /**
   * Spacing in pixels between icon and content.
   */
  iconSpacing: number;

  /**
   * Icon size.
   */
  iconSize: number;

  /**
   * Indicates whether label is visible alongside value content.
   */
  labelVisible: boolean;

  /**
   * Typography.
   */
  font: {
    /**
     * Label font.
     */
    label: (kind: InputBoxKind, state: InputBoxVisualState, empty: boolean) => FontProps;

    /**
     * Value font.
     */
    value: FontProps;

    /**
     * Error font.
     */
    error: FontProps;
  };
};

export type InputBoxVisualStateAppearance = {
  /**
   * Text color.
   */
  text: Color;

  /**
   * Icon color.
   */
  icon: Color;

  /**
   * Glyph color.
   */
  glyph: Color;

  /**
   * Label color.
   */
  label: Color;

  /**
   * Background color.
   */
  back?: Color;

  /**
   * Border color.
   */
  border?: Color;

  /**
   * Border width.
   */
  borderWidth: number;
};

export type InputBoxVisualAppearance = {
  [state in InputBoxVisualState]: InputBoxVisualStateAppearance;
} & {
  /**
   * Placeholder text color.
   */
  placeholder: Color;
};

/**
 * Theme type definitions: InputBox
 */
export type InputBoxTheme = ComponentWithSizeTheme<InputBoxVisualStyle, InputBoxVisualAppearance, InputBoxAppearance> &
  AnimatedComponentTheme & {
    labelAnimation: AnimationStyle;
  };
