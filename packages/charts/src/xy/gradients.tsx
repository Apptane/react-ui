import { useMemo } from "react";
import { DomainXValue } from "../common/Types";
import { XYDatumEx } from "./commonXY";

type SvgGradientDefinition = {
  id: string;
  stops: Array<{
    offset: number;
    color: string;
    opacity?: number;
  }>;
};

/**
 * Generates gradient definitions for series.
 */
export function useGradientDefs<X extends DomainXValue, Data>(
  data: XYDatumEx<X, Data>[] | undefined,
  required: boolean
) {
  return useMemo(() => {
    if (data && data.length > 0 && required) {
      const gradientsMap = new Map<string, SvgGradientDefinition>();
      data.forEach(({ hiColor, loColor, gradientId }) => {
        if (!gradientsMap.has(gradientId)) {
          gradientsMap.set(gradientId, {
            id: gradientId,
            stops: [
              { offset: 0, color: hiColor, opacity: 0.6 },
              { offset: 100, color: loColor, opacity: 0.3 },
            ],
          });

          gradientsMap.set(gradientId + "-active", {
            id: gradientId + "-active",
            stops: [
              { offset: 0, color: hiColor, opacity: 0.9 },
              { offset: 100, color: loColor, opacity: 0.9 },
            ],
          });
        }
      });

      return Array.from(gradientsMap.values()).map((d) => (
        <linearGradient key={d.id} id={d.id} x1={0} x2={0} y1={0} y2={1}>
          {d.stops.map((s, index) => (
            <stop key={`_${index}`} offset={`${s.offset}%`} stopColor={s.color} stopOpacity={s.opacity} />
          ))}
        </linearGradient>
      ));
    } else {
      return null;
    }
  }, [data, required]);
}
