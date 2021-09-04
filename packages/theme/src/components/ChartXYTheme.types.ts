import { AnimatedComponentTheme, Color, ComponentTheme, FontProps } from "@apptane/react-ui-core";

export type ChartXYVisualStyle = {
  /**
   * Header.
   */
  header: {
    /**
     * Header height.
     */
    height: number;

    /**
     * Spacing between the header or Y axis title and content.
     */
    spacing: number;
  };

  /**
   * Legend.
   */
  legend: {
    /**
     * Spacing between legend items.
     */
    itemSpacing: number;

    /**
     * Spacing between marker and label.
     */
    markerSpacing: number;
  };

  /**
   * Y axis.
   */
  yAxis: {
    /**
     * Height of the Y axis title.
     */
    titleHeight: number;

    /**
     * Spacing between the header and Y axis title.
     */
    titleSpacing: number;

    /**
     * Y axis line stroke width.
     */
    axisStroke: number;

    /**
     * Grid line stroke width.
     */
    gridStroke: number;
  };

  /**
   * X axis.
   */
  xAxis: {
    /**
     * Height of the X axis.
     */
    height: number;

    /**
     * X axis line stroke width.
     */
    axisStroke: number;

    /**
     * Grid line stroke width.
     */
    gridStroke: number;
  };

  /**
   * Overlay.
   */
  overlay: {
    /**
     * Opacity.
     */
    opacity: number;

    /**
     * Text padding.
     */
    padding: number;
  };

  /**
   * Tooltip.
   */
  tooltip: {
    /**
     * Offset between marker line and tooltip.
     */
    offset: number;

    /**
     * Marker line stroke width.
     */
    lineStroke: number;

    /**
     * Spacing between the header and content.
     */
    headerSpacing: number;

    /**
     * Spacing between marker and label.
     */
    markerSpacing: number;

    /**
     * Spacing between label and value.
     */
    valueSpacing: number;
  };

  /**
   * Pane spacing.
   */
  gap: number;

  /**
   * Line dash pattern.
   */
  dash: string;

  /**
   * Typography.
   */
  font: {
    /**
     * Header font.
     */
    header: FontProps;

    /**
     * Axis font.
     */
    axis: FontProps;

    /**
     * Overlay font.
     */
    overlay: FontProps;

    /**
     * Legend font.
     */
    legend: FontProps;

    /**
     * Empty content font.
     */
    empty: FontProps;

    /**
     * Tooltip fonts.
     */
    tooltip: {
      /**
       * Header font.
       */
      header: FontProps;

      /**
       * Label font.
       */
      label: FontProps;

      /**
       * Value font.
       */
      value: FontProps;
    };
  };
};

export type ChartXYVisualAppearance = {
  /**
   * Background color.
   */
  back: Color;

  /**
   * Header text color.
   */
  header: Color;

  /**
   * Legend text color.
   */
  legend: Color;

  /**
   * Empty content text color.
   */
  empty: Color;

  /**
   * Axis colors.
   */
  axis: {
    /**
     * Axis text color.
     */
    text: Color;

    /**
     * Axis line color.
     */
    line: Color;
  };

  /**
   * Grid line color.
   */
  grid: Color;

  /**
   * Overlay colors.
   */
  overlay: {
    /**
     * Overlay text color.
     */
    text: Color;

    /**
     * Default overlay fill color.
     */
    fill: Color;
  };

  /**
   * Tooltip colors.
   */
  tooltip: {
    /**
     * Marker line color.
     */
    line: Color;

    /**
     * Header color.
     */
    header: Color;

    /**
     * Label text color.
     */
    label: Color;

    /**
     * Value text color.
     */
    value: Color;
  };
};

/**
 * Theme type definitions: XYChart
 */
export type ChartXYTheme = ComponentTheme<ChartXYVisualStyle, ChartXYVisualAppearance> & AnimatedComponentTheme;
