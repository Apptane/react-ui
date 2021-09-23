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
   * Interactive state styles.
   */
  interactivity: {
    /**
     * Applied when "shadow" interactivity is selected.
     */
    elevation: Elevation;

    /**
     * Applied when "border" interactivity is selected.
     */
    border: Color;
  };
};

/**
 * Theme type definitions: Pane
 */
export type PaneTheme = ComponentTheme<PaneVisualStyle, PaneVisualAppearance> & AnimatedComponentTheme;
