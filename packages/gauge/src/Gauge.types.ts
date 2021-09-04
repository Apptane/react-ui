import { Color, ColorMode, PaletteHue, PropTypeColorMode } from "@apptane/react-ui-core";
import PropTypes from "prop-types";

export interface GaugeValue {
  /**
   * Label to display in the tooltip.
   */
  label: string;

  /**
   * Value.
   */
  value: number;

  /**
   * Overrides the default color.
   */
  color?: Color | PaletteHue;
}

export interface GaugeProps {
  /**
   * Currently bound value.
   */
  value: GaugeValue[];

  /**
   * Overrides the default width. The default is 100%.
   */
  width?: number;

  /**
   * Component height.
   */
  height?: number;

  /**
   * Gauge height.
   */
  size?: number;

  /**
   * Total value. By default total value is the sum of all values.
   */
  total?: number;

  /**
   *  Indicates that tooltip should be hidden.
   */
  tooltipHidden?: boolean;

  /**
   * An optional function to format display value. By default the display value
   * represents label and value.
   */
  formatTooltip?: (value: GaugeValue) => React.ReactNode;

  /**
   * Overrides the color mode.
   * Default is to use globally set theme color mode or fallback to `light`.
   */
  colorMode?: ColorMode;
}

export const GaugePropTypes = {
  value: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string,
    })
  ).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  size: PropTypes.number,
  total: PropTypes.number,
  tooltipHidden: PropTypes.bool,
  formatTooltip: PropTypes.func,
  colorMode: PropTypeColorMode,
};
