import { ScaleTime } from "d3-scale";
import { ChartGridProps } from "./ChartGrid.types";

export interface ChartTimeGridProps extends ChartGridProps<Date> {
  /**
   * Scale function.
   */
  scale: ScaleTime<number, number>;
}
