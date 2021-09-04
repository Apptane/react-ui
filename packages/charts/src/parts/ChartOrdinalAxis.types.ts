import { ScaleBand } from "d3-scale";
import { ChartAxisProps } from "./ChartAxis.types";

export interface ChartOrdinalAxisProps extends ChartAxisProps<string> {
  /**
   * Axis scale.
   */
  scale: ScaleBand<string>;
}
