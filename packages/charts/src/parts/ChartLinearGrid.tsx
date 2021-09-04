import { useMemo } from "react";
import { ChartGrid } from "./ChartGrid";
import { ChartLinearGridProps } from "./ChartLinearGrid.types";

export function ChartLinearGrid({ scale, tickValues, ...other }: ChartLinearGridProps) {
  const ticks = useMemo(
    () => (tickValues != null && Array.isArray(tickValues) ? tickValues : scale.ticks(tickValues)),
    [scale, tickValues]
  );

  return <ChartGrid {...other} ticks={ticks} tickPosition={scale} />;
}
