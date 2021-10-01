import { Datum, MouseEventCallback } from "../common/Types";
import { ChartMarkerProps } from "./ChartMarker.types";

export interface ChartLegendItemProps<T extends Datum<Data>, Data = void> extends Omit<ChartMarkerProps, "color"> {
  /**
   * Datum.
   */
  datum: T;

  /**
   * Callback invoked when the mouse enters the component.
   */
  onMouseEnter?: MouseEventCallback<T, Data>;

  /**
   * Callback invoked when the mouse leaves the component.
   */
  onMouseLeave?: MouseEventCallback<T, Data>;

  /**
   * Callback invoked when the component is clicked.
   */
  onClick?: MouseEventCallback<T, Data>;
}
