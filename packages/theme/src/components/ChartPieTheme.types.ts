import { Color, ComponentTheme, FontProps } from "@apptane/react-ui-core";

export type ChartPieVisualStyle = {
  /**
   * Legend.
   */
  legend: {
    /**
     * Margin between legend and chart.
     */
    margin: number;

    /**
     * Height of the legend item.
     */
    itemHeight: number;

    /**
     * Spacing between legend items.
     */
    itemSpacing: number;

    /**
     * Left/right padding of the legend item.
     */
    itemPadding: number;

    /**
     * Spacing between marker and label.
     */
    markerSpacing: number;
  };

  /**
   * Tooltip.
   */
  tooltip: {
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
   * Typography.
   */
  font: {
    /**
     * Value font.
     */
    value: FontProps;

    /**
     * Title font.
     */
    title: FontProps;

    /**
     * Empty content font.
     */
    empty: FontProps;

    legend: {
      /**
       * Label font.
       */
      label: FontProps;

      /**
       * Value font.
       */
      value: FontProps;
    };

    tooltip: {
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

export type ChartPieVisualAppearance = {
  /**
   * Background color.
   */
  back: Color;

  /**
   * Value text color.
   */
  value: Color;

  /**
   * Title text color.
   */
  title: Color;

  /**
   * Empty content text color.
   */
  empty: Color;

  /**
   * Blank arc color.
   */
  blank: Color;

  /**
   * Legend colors.
   */
  legend: {
    /**
     * Label text color.
     */
    label: Color;

    /**
     * Value text color.
     */
    value: Color;

    /**
     * Percent text color.
     */
    percent: Color;

    /**
     * Border color.
     */
    border: Color;

    /**
     * Highlight background color.
     */
    highlight: Color;
  };

  /**
   * Tooltip colors.
   */
  tooltip: {
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
 * Theme type definitions: PieChart
 */
export type ChartPieTheme = ComponentTheme<ChartPieVisualStyle, ChartPieVisualAppearance>;
