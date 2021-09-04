import { ColorMode } from "@apptane/react-ui-core";
import { Theme } from "@apptane/react-ui-theme";

export interface ChartEmptyBlockProps {
  /**
   * Theme.
   */
  theme: Theme;

  /**
   * Color mode.
   */
  colorMode: ColorMode;

  /**
   * Content.
   */
  children: React.ReactNode;

  /**
   * Width.
   */
  width: number | string;

  /**
   * Height.
   */
  height: number | string;

  /**
   * Left offset.
   */
  left?: number;

  /**
   * Top offset.
   */
  top?: number;
}
