import { Color, ColorMode, PaletteHue, PropTypeColorMode } from "@apptane/react-ui-core";
import PropTypes from "prop-types";
import { ChromaticScheme, Datum, PropTypeColorScheme, PropTypeDatum } from "../common/Types";

export interface GaugeDatum<Data = void> extends Datum<Data> {
  /**
   * Value associated with the datum.
   */
  value: number;
}

export interface GaugeProps<Data = void> {
  /**
   * Data representing individual slices.
   */
  data?: ArrayLike<GaugeDatum<Data>>;

  /**
   * Specifies the color scheme used to compute slice color.
   * If palette hue is specified colors are interpolated between
   * 100 and 800 by varying lightness.
   * If not specified defaults to built-in colormap.
   */
  colorScheme?: ChromaticScheme | PaletteHue;

  /**
   * Callback to determine color for the slice.
   * When this callback returns a valid color, it overrides
   * all other color specifications.
   */
  color?: (datum: GaugeDatum<Data>) => Color | PaletteHue | undefined;

  /**
   * Overrides the default width. The default is 100%.
   */
  width?: number;

  /**
   * Overrides height of the gauge interactive area.
   */
  height?: number;

  /**
   * Gauge height.
   */
  size?: number;

  /**
   * Callback to format the value for presentation in tooltip or legend.
   */
  formatValue?: (value: number) => string;

  /**
   * Total value. By default total value is the sum of all values.
   */
  total?: number;

  /**
   * Controls the visibility of tooltips.
   * Defaults to `true`.
   */
  tooltipVisible?: boolean;

  /**
   * Indicates that legend should be visible.
   */
  legendVisible?: boolean;

  /**
   * Callback invoked when a slice is clicked via chart or legend.
   */
  onClick?: (datum: GaugeDatum<Data>) => void;

  /**
   * Overrides the color mode.
   * Default is to use globally set theme color mode or fallback to `light`.
   */
  colorMode?: ColorMode;
}

export const GaugePropTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      ...PropTypeDatum,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  colorScheme: PropTypeColorScheme,
  color: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  size: PropTypes.number,
  formatValue: PropTypes.func,
  total: PropTypes.number,
  tooltipVisible: PropTypes.bool,
  legendVisible: PropTypes.bool,
  onClick: PropTypes.func,
  colorMode: PropTypeColorMode,
};
