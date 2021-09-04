import { Datum, MouseEventCallback } from "../common/Types";
import { ChartMarkerProps } from "./ChartMarker.types";

export interface ChartLegendItemProps<Data = void> extends Omit<ChartMarkerProps, "color"> {
  /**
   * Datum.
   */
  datum: Datum<Data>;

  /**
   * Callback invoked when the mouse enters the component.
   */
  onMouseEnter?: MouseEventCallback<Data>;

  /**
   * Callback invoked when the mouse leaves the component.
   */
  onMouseLeave?: MouseEventCallback<Data>;

  /**
   * Callback invoked when the component is clicked.
   */
  onClick?: MouseEventCallback<Data>;
}
