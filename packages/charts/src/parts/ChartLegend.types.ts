import { Datum } from "../common/Types";
import { ChartLegendItemProps } from "./ChartLegendItem.types";

export interface ChartLegendProps<T extends Datum<Data>, Data = void>
  extends Omit<ChartLegendItemProps<T, Data>, "datum" | "muted"> {
  /**
   * Data representing individual datums, e.g. metrics.
   */
  data: ArrayLike<T>;

  /**
   * Identifier of the currently selected datum.
   */
  selectedDatumId?: string;
}
