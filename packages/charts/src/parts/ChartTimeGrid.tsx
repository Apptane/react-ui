import { useMemo } from "react";
import { ChartGrid } from "./ChartGrid";
import { ChartTimeGridProps } from "./ChartTimeGrid.types";

export function ChartTimeGrid({ scale, tickValues, ...other }: ChartTimeGridProps) {
  const ticks = useMemo(
    () => (tickValues != null && Array.isArray(tickValues) ? tickValues : scale.ticks(tickValues)),
    [scale, tickValues]
  );

  return <ChartGrid {...other} ticks={ticks} tickPosition={scale} />;
}
