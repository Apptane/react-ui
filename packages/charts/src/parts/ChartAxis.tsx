import { Color } from "@apptane/react-ui-core";
import { FontProperties, resolveFont } from "@apptane/react-ui-theme";
import { StyleTextBase } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { useMemo } from "react";
import { DomainValue } from "../common/Types";
import { ChartAxisProps } from "./ChartAxis.types";

const StyleAxisLine = (font: FontProperties, text: Color, stroke: Color, width: number) => css`
  text {
    ${StyleTextBase(font)};
    fill: ${text};
    user-select: none;
  }

  line {
    stroke: ${stroke};
    stroke-width: ${width};
    // shape-rendering: crispedges;
  }
`;

export type ChartAxisPropsEx<T extends DomainValue> = ChartAxisProps<T> & {
  extent: number;
  format: (value: T) => string;
  ticks: T[];
  tickPosition: (value: T) => number | undefined;
};

export function ChartAxis<T extends DomainValue>({
  componentId,
  theme,
  colorMode,
  orientation,
  offset = 0,
  span,
  extent,
  textOffset = 0,
  axisVisible = true,
  tickSize,
  tickVisible = true,
  tickPosition,
  format,
  ticks,
  title,
}: ChartAxisPropsEx<T>) {
  const horizontal = orientation === "x";

  const visualAppearance = theme.charts.xy.appearance(theme.palette[colorMode], colorMode, undefined, "none");
  const visualStyle = theme.charts.xy.style;
  const axisStyle = horizontal ? visualStyle.xAxis : visualStyle.yAxis;

  const font = useMemo(
    () => resolveFont(theme.typography, visualStyle.font.axis),
    [theme.typography, visualStyle.font.axis]
  );

  return (
    <g
      transform={horizontal ? `translate(${offset},0)` : `translate(0,${offset})`}
      css={StyleAxisLine(font, visualAppearance.axis.text, visualAppearance.axis.line, axisStyle.axisStroke)}>
      {axisVisible &&
        (horizontal ? <line x1={0} x2={extent} y1={0} y2={0} /> : <line x1={span} x2={span} y1={0} y2={extent} />)}
      {ticks.map((value, index) => {
        const position = tickPosition(value);
        return (
          position != null &&
          position >= 0 &&
          position <= extent && (
            <g key={`_${index}`} transform={horizontal ? `translate(${position},0)` : `translate(0,${position})`}>
              {tickVisible && <line y1={0} x1={0} y2={horizontal ? tickSize : 0} x2={horizontal ? 0 : tickSize} />}
              <text
                transform={horizontal ? `translate(0,${textOffset})` : `translate(${textOffset},0)`}
                filter={horizontal ? undefined : `url(#${componentId ?? "--apptane-chart"}-axis-label-back)`}
                textAnchor={horizontal ? "middle" : "start"}
                dominantBaseline={horizontal ? "text-before-edge" : "middle"}>
                {format(value)}
              </text>
            </g>
          )
        );
      })}
      {horizontal && title && (
        <text
          transform={`translate(${extent - 2},${textOffset})`}
          filter={`url(#${componentId ?? "--apptane-chart"}-axis-title-back)`}
          textAnchor="end"
          dominantBaseline="text-before-edge">
          {title}
        </text>
      )}
    </g>
  );
}
