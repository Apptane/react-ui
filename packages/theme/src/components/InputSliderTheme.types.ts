import { AnimatedComponentTheme, Color, ComponentTheme, FontProps } from "@apptane/react-ui-core";

export enum InputSliderVisualState {
  Default = "default",
  Hover = "hover",
  Focused = "focused",
  Disabled = "disabled",
}

export type InputSliderVisualStyle = {
  /**
   * Rail size in pixels.
   */
  railSize: number;

  /**
   * Gauge size in pixels.
   */
  gaugeSize: number;

  /**
   * Thumb bounding box (height).
   */
  thumbBox: number;

  /**
   * Thumb size in pixels.
   */
  thumbSize: number;

  /**
   * Thumb border width.
   */
  thumbBorderWidth: number;

  /**
   * Spacing between rail and the input control.
   */
  spacing: number;

  /**
   * Typography.
   */
  font: FontProps;
};

export type InputSliderVisualStateAppearance = {
  /**
   * Text color.
   */
  text: Color;

  /**
   * Rail color.
   */
  rail: Color;

  /**
   * Gauge color.
   */
  gauge: Color;

  /**
   * Thumb border color.
   */
  thumbBorder: Color;

  /**
   * Thumb background color.
   */
  thumbBack: Color;
};

export type InputSliderVisualAppearance = {
  [state in InputSliderVisualState]: InputSliderVisualStateAppearance;
};

/**
 * Theme type definitions: InputSlider
 */
export type InputSliderTheme = ComponentTheme<InputSliderVisualStyle, InputSliderVisualAppearance> &
  AnimatedComponentTheme;
