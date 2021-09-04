import { useContext } from "react";
import { DomainXValue, DomainYValue } from "../common/Types";
import { ChartDatumContext } from "../parts/ChartDatumContext";
import { XYZDatumEx } from "./commonXYZ";

export type XYBubbleLayerProps<X extends DomainXValue, Y extends DomainYValue, Data = void> = {
  componentId: string;
  data: XYZDatumEx<X, Y, Data>[];
  offset: number;
};

export function XYBubbleLayer<X extends DomainXValue, Y extends DomainYValue, Data = void>({
  componentId,
  data,
  offset,
}: XYBubbleLayerProps<X, Y, Data>) {
  const selectedDatumId = useContext(ChartDatumContext);

  const bubbles: React.ReactNode[] = [];
  data.forEach(({ id, index, color, loColor, hiColor, pri, sec }) => {
    const unselected = selectedDatumId != null && id !== selectedDatumId;
    const key = id ?? `_${index}`;
    [pri, sec].forEach((_, i) => {
      if (_ != null && _.length > 0) {
        const strokeProps =
          i === 1
            ? {
                stroke: color,
                strokeWidth: 1,
                strokeDasharray: "2",
              }
            : {};

        _.forEach((p) => {
          if (p.c != null) {
            bubbles.push(
              <circle
                transform={`translate(${p.c.x},${p.c.y})`}
                key={`${key}-${i}-${p.index}`}
                cx={0}
                cy={0}
                r={p.c.d * 0.5}
                fill={unselected ? loColor : i === 1 ? hiColor : color}
                {...strokeProps}
              />
            );
          }
        });
      }
    });
  });

  return (
    <g transform={`translate(${offset},0)`} clipPath={`url(#${componentId}-main-clip)`}>
      {bubbles}
    </g>
  );
}
