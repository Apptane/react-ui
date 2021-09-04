import { Color, Palette } from "@apptane/react-ui-core";

export type BackdropAppearance = {
  /**
   * Backdrop opacity number.
   */
  opacity: number;

  /**
   * Backdrop color.
   */
  color: Color;
};

/**
 * Theme type definitions: Backdrop
 */
export type BackdropTheme = {
  /**
   * Backdrop appearance.
   */
  appearance: (palette: Palette) => BackdropAppearance;
};
