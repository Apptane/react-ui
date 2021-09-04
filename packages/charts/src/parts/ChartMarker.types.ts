import { Color, ColorMode, PaletteHue } from "@apptane/react-ui-core";
import { Theme } from "@apptane/react-ui-theme";

export type ChartMarkerAppearance = "circle" | "square" | "line";

export interface ChartMarkerProps {
  /**
   * Theme reference.
   */
  theme: Theme;

  /**
   * Color mode.
   */
  colorMode: ColorMode;

  /**
   * Appearance of the marker. Defaults to `circle`.
   */
  appearance?: ChartMarkerAppearance;

  /**
   * Color.
   */
  color: Color | PaletteHue;

  /**
   * Indicates that the marker color should be muted.
   */
  muted?: boolean;

  /**
   * Marker size.
   */
  size?: number;
}
