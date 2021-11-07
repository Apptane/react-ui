import { resolveTextColor } from "@apptane/react-ui-core";
import memoize from "memoizee";
import DefaultAnimation from "../Animation";
import { ChartXYTheme } from "./ChartXYTheme.types";

const DefaultChartXYTheme: ChartXYTheme = {
  style: {
    header: {
      height: 16,
      spacing: 16,
    },
    legend: {
      itemSpacing: 12,
      markerSpacing: 6,
    },
    yAxis: {
      titleHeight: 16,
      titleSpacing: 8,
      axisStroke: 1,
      gridStroke: 1,
    },
    xAxis: {
      height: 24,
      axisStroke: 1,
      gridStroke: 1,
    },
    overlay: {
      opacity: 0.05,
      padding: 4,
    },
    gap: 24,
    dash: "2",
    tooltip: {
      lineStroke: 1,
      offset: 16,
      headerSpacing: 8,
      markerSpacing: 6,
      valueSpacing: 12,
    },
    font: {
      header: {
        category: "content",
        size: "small",
        weight: "bold",
      },
      axis: {
        category: "numeric",
        size: "xsmall",
        weight: "regular",
      },
      overlay: {
        category: "content",
        size: "xsmall",
        weight: "regular",
      },
      legend: {
        category: "content",
        size: "small",
        weight: "regular",
      },
      empty: {
        category: "content",
        size: "small",
        weight: "regular",
      },
      tooltip: {
        header: {
          category: "content",
          size: "medium",
          weight: "regular",
        },
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
  animation: {
    delay: DefaultAnimation.delay,
    duration: DefaultAnimation.duration * 0.5,
    function: DefaultAnimation.function,
  },
  appearance: memoize((palette) => ({
    back: palette.light,
    header: resolveTextColor(palette, "default"),
    legend: resolveTextColor(palette, "default"),
    empty: resolveTextColor(palette, "muted"),
    axis: {
      text: resolveTextColor(palette, "muted"),
      line: palette.text[300],
    },
    grid: palette.text[200],
    overlay: {
      text: resolveTextColor(palette, "muted"),
      fill: palette.gray[400],
    },
    tooltip: {
      line: resolveTextColor(palette, "default"),
      header: palette.text[300],
      label: resolveTextColor(palette, "contrast"),
      value: resolveTextColor(palette, "contrast"),
    },
  })),
};

/**
 * Default theme: XYChart
 */
export default DefaultChartXYTheme;
