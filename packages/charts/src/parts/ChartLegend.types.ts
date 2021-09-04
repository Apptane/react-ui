import { Datum } from "../common/Types";
import { ChartLegendItemProps } from "./ChartLegendItem.types";

export interface ChartLegendProps<Data = void> extends Omit<ChartLegendItemProps<Data>, "datum" | "muted"> {
  /**
   * Data representing individual datums, e.g. metrics.
   */
  data: ArrayLike<Datum<Data>>;

  /**
   * Identifier of the currently selected datum.
   */
  selectedDatumId?: string;
}
