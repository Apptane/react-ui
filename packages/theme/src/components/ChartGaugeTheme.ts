import { resolveTextColor } from "@apptane/react-ui-core";
import memoize from "memoizee";
import { ChartGaugeTheme } from "./ChartGaugeTheme.types";

const DefaultChartGaugeTheme: ChartGaugeTheme = {
  style: {
    legend: {
      margin: 12,
      itemSpacing: 12,
      markerSpacing: 6,
    },
    tooltip: {
      markerSpacing: 6,
      valueSpacing: 12,
    },
    font: {
      legend: {
        category: "content",
        size: "small",
        weight: "regular",
      },
      tooltip: {
        label: {
          category: "content",
          size: "medium",
          weight: "regular",
        },
        value: {
          category: "numeric",
          size: "medium",
          weight: "medium",
        },
      },
    },
  },
  appearance: memoize((palette) => ({
    blank: palette.gray[200],
    legend: resolveTextColor(palette, "default"),
    tooltip: {
      label: resolveTextColor(palette, "contrast"),
      value: resolveTextColor(palette, "contrast"),
    },
  })),
};

/**
 * Default theme: Gauge
 */
export default DefaultChartGaugeTheme;
