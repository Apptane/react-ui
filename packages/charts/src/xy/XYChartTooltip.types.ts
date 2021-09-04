import { Domain, DomainXValue, DomainYValue } from "../common/Types";
import { ChartMarkerProps } from "../parts/ChartMarker.types";
import { ChartSlice } from "../parts/ChartSlice";
import { XYChartDatum } from "./XYChart.types";

export interface XYChartTooltipProps<X extends DomainXValue, Y extends DomainYValue, Data = void>
  extends Omit<ChartMarkerProps, "color" | "muted"> {
  /**
   * Selected domain slice.
   */
  slice: ChartSlice;

  /**
   * Computed data representing individual series (metrics).
   */
  computed?: XYChartDatum<X, Y, Data>[];

  /**
   * Aggregated values in X domain across all series (metrics).
   */
  domainX?: Domain<X>;

  /**
   * Aggregated values in Y domain across all series (metrics).
   */
  domainY?: Domain<Y>;

  /**
   * An optional function to format numeric values.
   */
  format?: (value: number, lb?: number, ub?: number) => string;

  /**
   * Indicates that total value should be displayed in the tooltip.
   */
  tooltipTotalVisible?: boolean;

  /**
   * Width of the chart client area.
   */
  width: number;

  /**
   * Offset from the default tick position.
   */
  offset?: number;
}
