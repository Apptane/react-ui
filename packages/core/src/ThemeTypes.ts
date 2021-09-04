import PropTypes from "prop-types";
import { ColorMode, ComponentSize, Intent, PropTypeColorMode } from "./CommonTypes";
import { Palette } from "./PaletteTypes";

export type Padding = {
  /**
   * Top padding.
   */
  t: number;

  /**
   * Right padding. If not specified then left padding is used.
   */
  r?: number;

  /**
   * Bottom padding. If not specified then top padding is used.
   */
  b?: number;

  /**
   * Left padding.
   */
  l: number;
};

export type ComponentWithSizeStyle = {
  /**
   * Threshold in pixels indicating the maximum size of the component
   * this style still applies to.
   */
  threshold?: number;
};

export type Elevation = 0 | 1 | 2 | 3;
export const PropTypeElevation = PropTypes.oneOf<Elevation>([0, 1, 2, 3]);

export type ElevationStyle = {
  /**
   * CSS box-shadow.
   */
  boxShadow?: string;

  /**
   * CSS filter.
   */
  filter?: string;
};

export type AnimationStyle = {
  /**
   * Delay in milliseconds before initiating an animated transition.
   */
  delay: number;

  /**
   * Duration in milliseconds of an animated transition.
   */
  duration: number;

  /**
   * Transition timing function.
   */
  function: string;
};

export type ComponentTheme<VisualStyle, VisualAppearance, Appearance = void> = {
  /**
   * Visual style.
   */
  style: VisualStyle;

  /**
   * Visual appearance.
   */
  appearance: (palette: Palette, mode: ColorMode, appearance: Appearance, intent: Intent) => VisualAppearance;
};

export type ComponentWithSizeTheme<VisualStyle extends ComponentWithSizeStyle, VisualAppearance, Appearance = void> = {
  /**
   * Size in pixels for each pre-defined theme size.
   */
  sizes: {
    [size in ComponentSize]: number;
  };

  /**
   * Visual styles for different sizes.
   */
  styles: VisualStyle[];

  /**
   * Visual appearance.
   */
  appearance: (
    palette: Palette,
    mode: ColorMode,
    appearance: Appearance,
    intent: Intent,
    size: ComponentSize
  ) => VisualAppearance;
};

export type AnimatedComponentTheme = {
  /**
   * Animation style.
   */
  animation: AnimationStyle;
};

/**
 * Base properties common to all components that support
 * theming and color mode specification.
 */
export interface AppearanceProps<VisualAppearance, Appearance = void> {
  /**
   * Overrides the color mode.
   * Default is to use globally set theme color mode or fallback to `light`.
   */
  colorMode?: ColorMode;

  /**
   * Visual appearance of the component.
   */
  appearance?: Appearance | ((palette: Palette, mode: ColorMode) => VisualAppearance);
}

export const AppearancePropTypes = {
  colorMode: PropTypeColorMode,
  appearance: PropTypes.func,
};
