import { Color, ComponentTheme, FontProps } from "@apptane/react-ui-core";

export type ChartGaugeVisualStyle = {
  /**
   * Legend.
   */
  legend: {
    /**
     * Margin between legend and gauge.
     */
    margin: number;

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
     * Legend font.
     */
    legend: FontProps;

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

export type ChartGaugeVisualAppearance = {
  /**
   * Blank color.
   */
  blank: Color;

  /**
   * Legend text color.
   */
  legend: Color;

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
 * Theme type definitions: Gauge
 */
export type ChartGaugeTheme = ComponentTheme<ChartGaugeVisualStyle, ChartGaugeVisualAppearance>;
