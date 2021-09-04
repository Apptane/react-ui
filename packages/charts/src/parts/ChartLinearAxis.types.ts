import { ScaleLinear } from "d3-scale";
import { ChartAxisProps } from "./ChartAxis.types";

export interface ChartLinearAxisProps extends ChartAxisProps<number> {
  /**
   * Scale function.
   */
  scale: ScaleLinear<number, number>;
}
