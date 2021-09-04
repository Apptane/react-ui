import { Color, ComponentTheme, FontProps } from "@apptane/react-ui-core";

export type ChartHexBinVisualStyle = {
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

  /**
   * Border stroke opacity.
   */
  borderOpacity: number;
};

export type ChartHexBinVisualAppearance = {
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
 * Theme type definitions: HexBin
 */
export type ChartHexBinTheme = ComponentTheme<ChartHexBinVisualStyle, ChartHexBinVisualAppearance>;
