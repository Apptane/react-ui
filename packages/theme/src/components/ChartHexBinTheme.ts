import { resolveTextColor } from "@apptane/react-ui-core";
import memoize from "memoizee";
import { ChartHexBinTheme } from "./ChartHexBinTheme.types";

const DefaultChartHexBinTheme: ChartHexBinTheme = {
  style: {
    tooltip: {
      markerSpacing: 6,
      valueSpacing: 12,
    },
    borderOpacity: 0.1,
    font: {
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
    tooltip: {
      label: resolveTextColor(palette, "contrast"),
      value: resolveTextColor(palette, "contrast"),
    },
  })),
};

/**
 * Default theme: HexBin
 */
export default DefaultChartHexBinTheme;
