import { useCallback } from "react";
import { ChartAxis } from "./ChartAxis";
import { ChartOrdinalAxisProps } from "./ChartOrdinalAxis.types";

/**
 * Formats tick labels for the ordinal axis.
 */
function formatValue(v: string) {
  return v;
}

export function ChartOrdinalAxis({ scale, format, ...other }: ChartOrdinalAxisProps) {
  const offset = scale.bandwidth() * 0.5;
  const positioner = useCallback(
    (v: string) => {
      const p = scale(v);
      return p != null ? p + offset : undefined;
    },
    [scale, offset]
  );

  return (
    <ChartAxis
      {...other}
      extent={scale.range()[1]}
      ticks={scale.domain()}
      tickPosition={positioner}
      format={format ?? formatValue}
    />
  );
}
