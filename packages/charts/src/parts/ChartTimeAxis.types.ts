import { ScaleTime } from "d3-scale";
import { ChartAxisProps } from "./ChartAxis.types";

export interface ChartTimeAxisProps extends ChartAxisProps<Date> {
  /**
   * Axis scale.
   */
  scale: ScaleTime<number, number>;
}
