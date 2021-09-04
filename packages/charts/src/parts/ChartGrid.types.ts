import { ColorMode } from "@apptane/react-ui-core";
import { Theme } from "@apptane/react-ui-theme";
import { DomainValue } from "../common/Types";

export type ChartGridOrientation = "horizontal" | "vertical";

export interface ChartGridProps<T extends DomainValue> {
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
   * Grid orientation.
   */
  orientation: ChartGridOrientation;

  /**
   * Left offset to the start of the grid area.
   */
  left?: number;

  /**
   * Top offset to the start of the grid area.
   */
  top?: number;

  /**
   * Width of the grid area.
   */
  width: number;

  /**
   * Height of the grid area.
   */
  height: number;

  /**
   * Number of ticks to generate or specific ticks to generate.
   */
  tickValues?: number | T[];
}
