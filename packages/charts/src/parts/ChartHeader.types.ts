import { ColorMode } from "@apptane/react-ui-core";
import { Theme } from "@apptane/react-ui-theme";

export interface ChartHeaderProps {
  /**
   * Theme.
   */
  theme: Theme;

  /**
   * Color mode.
   */
  colorMode: ColorMode;

  /**
   * Header content.
   */
  header?: React.ReactNode;

  /**
   * Legend content.
   */
  legend?: React.ReactNode;

  /**
   * Y axis title.
   */
  axisYTitle?: string;
}
