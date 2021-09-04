import {
  AnimatedComponentTheme,
  Color,
  ComponentSize,
  ComponentTheme,
  Elevation,
  Padding,
} from "@apptane/react-ui-core";

export type SidePanelVisualStyle = {
  /**
   * Close button size.
   */
  closeButtonSize: ComponentSize;

  /**
   * Close button margin.
   */
  closeButtonMargin: Padding;
};

export type SidePanelVisualAppearance = {
  /**
   * Border color.
   */
  border: Color;

  /**
   * Background color.
   */
  background: Color;

  /**
   * Elevation style.
   */
  elevation: Elevation;
};

/**
 * Theme type definitions: SidePanel
 */
export type SidePanelTheme = ComponentTheme<SidePanelVisualStyle, SidePanelVisualAppearance> & AnimatedComponentTheme;
