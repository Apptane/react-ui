import { useMemo } from "react";
import { ChartAxis } from "./ChartAxis";
import { ChartLinearAxisProps } from "./ChartLinearAxis.types";

/**
 * Formats tick labels for the linear (numeric) axis.
 */
function formatNumber(v: number) {
  return v.toLocaleString();
}

export function ChartLinearAxis({ scale, format, tickValues, ...other }: ChartLinearAxisProps) {
  const ticks = useMemo(
    () => (tickValues != null && Array.isArray(tickValues) ? tickValues : scale.ticks(tickValues)),
    [scale, tickValues]
  );

  return (
    <ChartAxis
      {...other}
      extent={scale.range()[1]}
      ticks={ticks}
      tickPosition={scale}
      format={format ?? formatNumber}
    />
  );
}
