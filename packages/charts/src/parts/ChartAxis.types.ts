import { ColorMode } from "@apptane/react-ui-core";
import { Theme } from "@apptane/react-ui-theme";
import { DomainValue } from "../common/Types";

export type ChartAxisOrientation = "x" | "y";

export interface ChartAxisProps<T extends DomainValue> {
  /**
   * Unique component identifier.
   */
  componentId?: string;

  /**
   * Theme.
   */
  theme: Theme;

  /**
   * Color mode.
   */
  colorMode: ColorMode;

  /**
   * Axis orientation.
   */
  orientation: ChartAxisOrientation;

  /**
   * Offset to the start of the axis.
   * Depends on `orientation`, X axis - left , Y axis - top offset.
   */
  offset?: number;

  /**
   * Height of width (depends on `orientation`) of the area the axis occupies.
   */
  span: number;

  /**
   * Text label offset.
   */
  textOffset?: number;

  /**
   * Controls visibility of the axis line.
   */
  axisVisible?: boolean;

  /**
   * Controls visibility of the tick line.
   */
  tickVisible?: boolean;

  /**
   * Size of the tick.
   */
  tickSize: number;

  /**
   * Number of ticks to generate or specific ticks to generate.
   */
  tickValues?: number | T[];

  /**
   * Format function for the tick value.
   */
  format?: (value: T) => string;

  /***
   * Axis title.
   */
  title?: string;
}
