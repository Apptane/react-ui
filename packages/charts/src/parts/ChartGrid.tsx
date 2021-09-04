import { Color } from "@apptane/react-ui-core";
import { css } from "@emotion/react";
import { useMemo } from "react";
import { DomainValue } from "../common/Types";
import { ChartGridProps } from "./ChartGrid.types";

const StyleGridLine = (stroke: Color, width: number, dash: string) => css`
  line {
    stroke: ${stroke};
    stroke-width: ${width};
    stroke-dasharray: ${dash};
    // shape-rendering: crispedges;
  }
`;

const StyleGridLineBottom = css`
  > line {
    stroke-dasharray: none !important;
  }
`;

export type ChartGridPropsEx<T extends DomainValue> = ChartGridProps<T> & {
  ticks: T[];
  tickPosition: (value: T) => number | number[] | undefined;
};

export function ChartGrid<T extends DomainValue>({
  theme,
  colorMode,
  orientation,
  left = 0,
  top = 0,
  width,
  height,
  tickPosition,
  ticks,
}: ChartGridPropsEx<T>) {
  const horizontal = orientation === "horizontal";

  const visualAppearance = theme.charts.xy.appearance(theme.palette[colorMode], colorMode, undefined, "none");
  const visualStyle = theme.charts.xy.style;
  const strokeWidth = horizontal ? visualStyle.xAxis.gridStroke : visualStyle.yAxis.gridStroke;
  const strokeDash = visualStyle.dash;
  const extent = horizontal ? height : width;

  const positions = useMemo(() => {
    const set = new Set<number>();
    ticks.forEach((value) => {
      const p = tickPosition(value);
      if (p != null) {
        const positions = typeof p === "number" ? [p] : p;
        positions.forEach((position) => {
          if (position >= 0 && position <= extent) {
            set.add(position);
          }
        });
      }
    });

    return Array.from(set.values());
  }, [ticks, tickPosition, extent]);

  return (
    <g transform={`translate(${left},${top})`} css={StyleGridLine(visualAppearance.grid, strokeWidth, strokeDash)}>
      {positions.map((position, index) => (
        <g
          key={`_${index}`}
          transform={horizontal ? `translate(0,${position})` : `translate(${position},0)`}
          css={horizontal && position === extent ? StyleGridLineBottom : undefined}>
          <line x1={0} y1={0} x2={horizontal ? width : 0} y2={horizontal ? 0 : height} />
        </g>
      ))}
    </g>
  );
}
