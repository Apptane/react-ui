import { Color, ColorMode, PaletteHue, PropTypeColorMode } from "@apptane/react-ui-core";
import PropTypes from "prop-types";
import { ChromaticScheme, Datum, PropTypeColorScheme as PropTypeColorScheme, PropTypeDatum } from "../common/Types";

export interface HexBinDatum<Data = void> extends Datum<Data> {
  /**
   * Value associated with the datum.
   * This value is used to establish color based on the specified colormap.
   * If `value` is omitted the `color` property must be specified.
   */
  value?: number;
}

export interface HexBinProps<Data = void> {
  /**
   * Data representing individual cells.
   */
  data?: ArrayLike<HexBinDatum<Data>>;

  /**
   * Overrides the lower bound of the range of data values.
   * If not specified the minimum of `value` in `data` is taken.
   */
  rangeMin?: number;

  /**
   * Overrides the upper bound of the range of data values.
   * If not specified the minimum of `value` in `data` is taken.
   */
  rangeMax?: number;

  /**
   * Specifies the color scheme used to compute cell color
   * from the datum `value`. If palette hue is specified colors
   * are interpolated between 100 and 800 by varying lightness.
   * If not specified defaults to `gray` hue.
   */
  colorScheme?: ChromaticScheme | PaletteHue;

  /**
   * Callback to determine color for the cell.
   * When this callback returns a valid color, it overrides
   * all other color specifications.
   */
  color?: (datum: HexBinDatum<Data>) => Color | PaletteHue | undefined;

  /**
   * Height of a cell in pixels.
   */
  size?: number;

  /**
   * Gap between cells in pixels.
   */
  gap?: number;

  /**
   * Indicates whether cells should be displayed without the border.
   */
  borderless?: boolean;

  /**
   * Maximum width in pixels.
   */
  maxWidth?: number;

  /**
   * Maximum number of cells per row.
   */
  maxPerRow?: number;

  /**
   * Callback to format the display value for the tooltip.
   */
  formatTooltip?: (datum: HexBinDatum<Data>) => React.ReactNode;

  /**
   * Callback invoked when a cell is clicked.
   */
  onClick?: (datum: HexBinDatum<Data>) => void;

  /**
   * Overrides the color mode.
   * Default is to use globally set theme color mode or fallback to `light`.
   */
  colorMode?: ColorMode;
}

export const HexBinPropTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      ...PropTypeDatum,
      value: PropTypes.number,
    })
  ),
  rangeMin: PropTypes.number,
  rangeMax: PropTypes.number,
  colorScheme: PropTypeColorScheme,
  color: PropTypes.func,
  size: PropTypes.number,
  gap: PropTypes.number,
  borderless: PropTypes.bool,
  maxWidth: PropTypes.number,
  maxPerRow: PropTypes.number,
  formatTooltip: PropTypes.func,
  onClick: PropTypes.func,
  colorMode: PropTypeColorMode,
};
