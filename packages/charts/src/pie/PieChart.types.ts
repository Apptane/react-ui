import { Color, ColorMode, PaletteHue, PropTypeColorMode } from "@apptane/react-ui-core";
import PropTypes from "prop-types";
import { ChromaticScheme, Datum, PropTypeColorScheme, PropTypeDatum } from "../common/Types";

export interface PieChartDatum<Data = void> extends Datum<Data> {
  /**
   * Value associated with the datum.
   */
  value: number;
}

export interface PieChartProps<Data = void> {
  /**
   * Data representing individual slices.
   */
  data?: ArrayLike<PieChartDatum<Data>>;

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
  color?: (datum: PieChartDatum<Data>) => Color | PaletteHue | undefined;

  /**
   * Size of the pie chart in pixels.
   */
  size: number;

  /**
   * Optional width. Defaults to 100%.
   */
  width?: number | string;

  /**
   * Callback to format the value for presentation in tooltip or legend.
   */
  formatValue?: (value: number) => string;

  /**
   * Content to show in the center of the pie chart.
   * If not specified total value computed from data is displayed.
   */
  totalValue?: React.ReactNode;

  /**
   * Content to show in the pie chart beneath the total content.
   */
  totalLabel?: React.ReactNode;

  /**
   * Content to display when no data is available.
   */
  emptyText?: React.ReactNode;

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
  onClick?: (datum: PieChartDatum<Data>) => void;

  /**
   * Overrides the color mode.
   * Default is to use globally set theme color mode or fallback to `light`.
   */
  colorMode?: ColorMode;
}

const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
export const PieChartPropTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      ...PropTypeDatum,
      value: PropTypes.number.isRequired,
    })
  ),
  colorScheme: PropTypeColorScheme,
  color: PropTypes.func,
  size: PropTypes.number,
  width: PropTypeNumberOrString,
  formatValue: PropTypes.func,
  totalValue: PropTypes.any,
  totalLabel: PropTypes.any,
  emptyText: PropTypes.any,
  tooltipVisible: PropTypes.bool,
  legendVisible: PropTypes.bool,
  onClick: PropTypes.func,
  colorMode: PropTypeColorMode,
};
