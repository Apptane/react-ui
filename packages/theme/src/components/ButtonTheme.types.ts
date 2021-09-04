import {
  AnimatedComponentTheme,
  Color,
  ComponentWithSizeStyle,
  ComponentWithSizeTheme,
  FontProps,
} from "@apptane/react-ui-core";
import { BadgeAppearance } from "./BadgeTheme.types";
import { SpinnerAppearance } from "./SpinnerTheme.types";

/**
 * Visual appearance of the button.
 */
export type ButtonAppearance = "primary" | "secondary" | "tertiary" | "minimal" | "inverted" | "link";

export enum ButtonVisualState {
  Default = "default",
  Focused = "focused",
  Toggled = "toggled",
  Disabled = "disabled",
}

export type ButtonVisualStyle = ComponentWithSizeStyle & {
  /**
   * Left/right padding in pixels.
   */
  padding: number;

  /**
   * Border radius in pixels.
   */
  borderRadius: number;

  /**
   * Border width in pixels.
   */
  borderWidth?: number | ((appearance: ButtonAppearance) => number);

  /**
   * Spacing in pixels between icon and content.
   */
  iconSpacing: number;

  /**
   * Default spinner appearance.
   */
  spinner: SpinnerAppearance;

  /**
   * Spinner size in pixels.
   */
  spinnerSize: number;

  /**
   * Typography.
   */
  font: FontProps | ((appearance: ButtonAppearance) => FontProps);
};

export type ButtonVisualStateAppearance = {
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
   * Border color.
   */
  border?: Color;

  /**
   * Transform for the active state.
   */
  active?: string;

  /**
   * Badge appearance.
   */
  badge?: BadgeAppearance;
};

export type ButtonVisualAppearance = {
  [state in ButtonVisualState]: ButtonVisualStateAppearance;
};

/**
 * Theme type definitions: Button
 */
export type ButtonTheme = ComponentWithSizeTheme<ButtonVisualStyle, ButtonVisualAppearance, ButtonAppearance> &
  AnimatedComponentTheme;
