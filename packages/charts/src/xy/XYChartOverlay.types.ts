import { ColorMode } from "@apptane/react-ui-core";
import { Theme } from "@apptane/react-ui-theme";
import { DomainXValue } from "../common/Types";
import { XYChartOverlay } from "./XYChart.types";

export interface XYChartOverlayProps<X extends DomainXValue> extends XYChartOverlay<X> {
  /**
   * Theme reference.
   */
  theme: Theme;

  /**
   * Color mode.
   */
  colorMode: ColorMode;

  /**
   * Scale function for X axis - converts X domain values into local coordinates.
   */
  scaleX: (v: X) => number | undefined;

  /**
   * Width of the chart client area.
   */
  width: number;

  /**
   * Height of the chart client area.
   */
  height: number;
}
