import { AnimatedComponentTheme, ComponentTheme, Elevation, Padding } from "@apptane/react-ui-core";

export type DropdownVisualStyle = {
  /**
   * Padding in pixels.
   */
  padding: Padding;

  /**
   * Elevation.
   */
  elevation?: Elevation;

  /**
   * Border radius in pixels.
   */
  borderRadius: number;
};

/**
 * Theme type definitions: Dropdown
 */
export type DropdownTheme = ComponentTheme<DropdownVisualStyle, void> & AnimatedComponentTheme;
