import { ScaleLinear } from "d3-scale";
import { ChartGridProps } from "./ChartGrid.types";

export interface ChartLinearGridProps extends ChartGridProps<number> {
  /**
   * Scale function.
   */
  scale: ScaleLinear<number, number>;
}
