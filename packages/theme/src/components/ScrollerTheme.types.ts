import { Color, ComponentTheme } from "@apptane/react-ui-core";

export type ScrollerVisualStyle = {
  /**
   * Thumb size in pixels.
   */
  thumbSize: number;

  /**
   * Shadow size in pixels.
   */
  shadowSize: number;

  /**
   * Scroll threshold in pixels to show the shadow.
   */
  shadowThreshold: number;
};

export type ScrollerVisualAppearance = {
  /**
   * Shadow color.
   */
  shadow: Color;

  /**
   * Thumb color.
   */
  thumb: Color;

  /**
   * Active thumb color.
   * This is only supported by ScrollBar.
   */
  active: Color;
};

/**
 * Theme type definitions: Scroller/ScrollBar
 */
export type ScrollerTheme = ComponentTheme<ScrollerVisualStyle, ScrollerVisualAppearance>;
