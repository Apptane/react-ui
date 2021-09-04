import {
  AnimatedComponentTheme,
  Color,
  ComponentSize,
  ComponentTheme,
  Elevation,
  FontProps,
  Padding,
} from "@apptane/react-ui-core";
import { ButtonAppearance } from "./ButtonTheme.types";

/**
 * Visual appearance of the toast.
 */
export type ToastAppearance = "default" | "inverted";

export type ToastVisualStyle = {
  /**
   * Maximum width in pixels.
   */
  maxWidth: number;

  /**
   * Border radius in pixels.
   */
  borderRadius: number;

  /**
   * External margin.
   */
  margin: number;

  /**
   * Content padding in pixels.
   */
  padding: Padding;

  /**
   * Spacing in pixels between header and body.
   */
  contentSpacing: number;

  /**
   * Spacing in pixels between icon and content.
   */
  iconSpacing: number;

  /**
   * Icon size in pixels.
   */
  iconSize: number;

  /**
   * Action button size.
   */
  actionSize: ComponentSize;

  /**
   * Action button margin in pixels.
   */
  actionMargin: Padding;

  /**
   * Typography.
   */
  font: {
    /**
     * Header font.
     */
    header: FontProps;

    /**
     * Body font.
     */
    body: FontProps;
  };
};

export type ToastVisualAppearance = {
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
  back: Color;

  /**
   * Border color.
   */
  border?: Color;

  /**
   * Action button appearance.
   */
  actionAppearance: ButtonAppearance;

  /**
   * Elevation.
   */
  elevation?: Elevation;
};

/**
 * Theme type definitions: Toast
 */
export type ToastTheme = ComponentTheme<ToastVisualStyle, ToastVisualAppearance, ToastAppearance> &
  AnimatedComponentTheme;
