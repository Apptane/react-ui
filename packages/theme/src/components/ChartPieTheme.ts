import { resolveBackgroundColor, resolveTextColor } from "@apptane/react-ui-core";
import memoize from "memoizee";
import { ChartPieTheme } from "./ChartPieTheme.types";

const DefaultChartPieTheme: ChartPieTheme = {
  style: {
    legend: {
      margin: 24,
      itemHeight: 32,
      itemSpacing: 12,
      itemPadding: 4,
      markerSpacing: 6,
    },
    tooltip: {
      markerSpacing: 6,
      valueSpacing: 12,
    },
    font: {
      value: {
        category: "numeric",
        size: "xlarge",
        weight: "medium",
      },
      title: {
        category: "content",
        size: "medium",
        weight: "regular",
      },
      empty: {
        category: "content",
        size: "medium",
        weight: "regular",
      },
      legend: {
        label: {
          category: "content",
          size: "small",
          weight: "regular",
        },
        value: {
          category: "numeric",
          size: "small",
          weight: "medium",
        },
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
    back: palette.white,
    value: resolveTextColor(palette, "default"),
    title: resolveTextColor(palette, "muted"),
    empty: resolveTextColor(palette, "muted"),
    blank: palette.gray[100],
    legend: {
      label: resolveTextColor(palette, "default"),
      value: resolveTextColor(palette, "default"),
      percent: resolveTextColor(palette, "muted"),
      highlight: resolveBackgroundColor(palette, "highlight"),
      border: palette.text[100],
    },
    tooltip: {
      label: resolveTextColor(palette, "contrast"),
      value: resolveTextColor(palette, "contrast"),
    },
  })),
};

/**
 * Default theme: Chart Pie
 */
export default DefaultChartPieTheme;
