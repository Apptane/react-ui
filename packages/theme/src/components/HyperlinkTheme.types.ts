import { Color, ComponentTheme } from "@apptane/react-ui-core";

/**
 * Visual appearance of the hyperlink.
 */
export type HyperlinkAppearance = "primary" | "secondary" | "inverted";

export enum HyperlinkVisualState {
  Default = "default",
  Focused = "focused",
  Disabled = "disabled",
}

export type HyperlinkVisualStyle = {
  /**
   * Spacing in pixels between icon and content.
   */
  iconSpacing: number;
};

export type HyperlinkVisualStateAppearance = {
  /**
   * Text color.
   */
  text: Color;

  /**
   * Icon color.
   */
  icon: Color;
};

export type HyperlinkVisualAppearance = {
  [state in HyperlinkVisualState]: HyperlinkVisualStateAppearance;
};

/**
 * Theme type definitions: Hyperlink
 */
export type HyperlinkTheme = ComponentTheme<HyperlinkVisualStyle, HyperlinkVisualAppearance, HyperlinkAppearance>;
