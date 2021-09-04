import { ScaleBand } from "d3-scale";
import { ChartGridProps } from "./ChartGrid.types";

export interface ChartOrdinalGridProps extends ChartGridProps<string> {
  /**
   * Scale function.
   */
  scale: ScaleBand<string>;
}
