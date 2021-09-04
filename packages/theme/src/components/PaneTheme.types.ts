import { AnimatedComponentTheme, Color, ComponentTheme, Elevation } from "@apptane/react-ui-core";

export type PaneVisualStyle = {
  /**
   * Border radius in pixels.
   */
  borderRadius: number;
};

export type PaneVisualAppearance = {
  /**
   * Border color.
   */
  border: Color;

  /**
   * Elevation style. Applied in interactive state.
   */
  elevation: Elevation;
};

/**
 * Theme type definitions: Pane
 */
export type PaneTheme = ComponentTheme<PaneVisualStyle, PaneVisualAppearance> & AnimatedComponentTheme;
