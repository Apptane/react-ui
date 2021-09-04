import { useCallback } from "react";
import { ChartGrid } from "./ChartGrid";
import { ChartOrdinalGridProps } from "./ChartOrdinalGrid.types";

export function ChartOrdinalGrid({ scale, ...other }: ChartOrdinalGridProps) {
  // [!] implicitly assumes align = 0.5 and paddingOuter = half of paddingInner
  // as set in XYOrdinalChart where scale is created
  const step = scale.step();
  const pad = step * scale.paddingInner() * scale.align();

  const positioner = useCallback(
    (v: string) => {
      const p = scale(v);
      return p != null ? [Math.round(p - pad), Math.round(p + step - pad)] : undefined;
    },
    [scale, step, pad]
  );

  return <ChartGrid {...other} ticks={scale.domain()} tickPosition={positioner} />;
}
