import { Color, useComponentId, warning } from "@apptane/react-ui-core";
import { useCallback, useContext } from "react";
import { Domain } from "../common/Types";
import { ChartData, ChartOrdinalDataContext } from "../parts/ChartDataContext";
import { ChartDatumContext } from "../parts/ChartDatumContext";
import { findValue } from "./common";
import { formatNumericTooltip, useXYPaneData, XYComputedValue, XYDatumEx } from "./commonXY";
import { XYBarChartPaneProps, XYChartDatum, XYChartPanePropsEx } from "./XYChart.types";
import { XYChartPane } from "./XYChartPane";

type XYBarLayerProps<Data = void> = {
  componentId: string;
  data: XYDatumEx<string, Data>[];
  offset: number;
  stacked: boolean;
  width: number;
  baseline?: number;
  background: Color;
};

const BAR_GAP = 1;

function XYBarLayer<Data = void>({
  componentId,
  data,
  offset,
  stacked,
  width,
  baseline = 0,
  background,
}: XYBarLayerProps<Data>) {
  const selectedDatumId = useContext(ChartDatumContext);

  const barWidth = stacked ? width : Math.max(1, Math.round((width - (data.length - 1) * BAR_GAP) / data.length));
  const barStart = width * 0.5;

  const bars: React.ReactNode[] = [];
  data.forEach(({ id, index, color, hiColor, loColor, pri, sec }) => {
    const unselected = selectedDatumId != null && id !== selectedDatumId;
    const key = id ?? `_${index}`;
    [pri, sec].forEach((_, i) => {
      if (_ != null && _.length > 0) {
        const strokeProps =
          i === 1
            ? {
                stroke: color,
                strokeWidth: 1,
                strokeDasharray: "3",
              }
            : {};

        _.forEach((p) => {
          if (p.c != null) {
            bars.push(
              <rect
                transform={`translate(${p.c.x - barStart},${p.c.y})`}
                key={`${key}-${i}-${p.index}`}
                x={stacked ? 0 : index * (barWidth + BAR_GAP)}
                y={0}
                width={barWidth}
                height={stacked ? Math.max(0, baseline - p.c.v) : baseline - p.c.y}
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
    <g
      transform={`translate(${offset},0)`}
      strokeWidth={stacked ? 1 : 0}
      stroke={background}
      clipPath={`url(#${componentId}-main-clip)`}>
      {bars}
    </g>
  );
}

function findNearestDatum<Data = void>(
  cx: number,
  cy: number,
  data: XYChartDatum<string, number, Data>[],
  domainX: Domain<string> | undefined,
  domainY: Domain<number> | undefined,
  x: string | undefined,
  y: number | undefined,
  ix: number | undefined,
  iy: number | undefined,
  context: ChartData<string>,
  baseline: number,
  stacked: boolean
): XYChartDatum<string, number, Data> | undefined {
  if (domainX == null || x == null) {
    return undefined;
  }

  const _domainX = domainX;
  const _x = x;

  function testDatum(d: XYChartDatum<string, number, Data>) {
    const p = findValue(d, (p) => _domainX.isEqual(p.x, _x));
    if (p != null) {
      const _p = p as unknown as XYComputedValue;
      if (_p.c != null) {
        if (stacked) {
          if (cy >= _p.c.y && cy <= _p.c.y + baseline - _p.c.v) {
            return true;
          }
        } else {
          if (cy >= _p.c.y) {
            return true;
          }
        }
      }
    }
    return false;
  }

  if (context.bandwidth == null) {
    return undefined;
  }

  let x0 = context.scaleX(x);
  if (x0 == null) {
    return undefined;
  }

  const barStart = context.bandwidth * 0.5;
  if (!stacked) {
    const barWidth = Math.max(1, Math.round((context.bandwidth - (data.length - 1) * BAR_GAP) / data.length));
    x0 -= barStart;

    // determine the applicable index of datum
    const datumIndex = Math.floor((cx - x0) / (barWidth + BAR_GAP));
    if (datumIndex < 0 || datumIndex >= data.length) {
      return undefined;
    }

    const d = data[datumIndex];
    return testDatum(d) ? d : undefined;
  } else {
    if (cx < x0 - barStart || cx > x0 + barStart) {
      return undefined;
    }
  }

  for (let i = 0; i < data.length; ++i) {
    const d = data[i];
    if (testDatum(d)) {
      return d;
    }
  }

  return undefined;
}

export function XYBarChartPane<Data = void>(props: XYBarChartPaneProps<Data>) {
  const componentId = useComponentId("--apptane-chart");
  const {
    axisYVisible = true,
    gridYVisible = true,
    legendInteractive = true,
    tooltipVisible = true,
    formatYTooltip = formatNumericTooltip,
    ...p
  } = props as XYBarChartPaneProps<Data> & XYChartPanePropsEx<string>; // see XYChartPanes

  const propsEx = {
    componentId,
    axisYVisible,
    gridYVisible,
    legendInteractive,
    tooltipVisible,
    formatYTooltip: formatYTooltip,
    axisYWidth: axisYVisible ? p.axisYWidth : 0,
  };

  const context = useContext(ChartOrdinalDataContext);
  const bandwidth = context.bandwidth ?? 0;
  const [computed, domainX, scaleY, layers] = useXYPaneData<string, Data>(context, { ...p, ...propsEx });
  const offset = propsEx.axisYWidth;
  const baseline = scaleY ? scaleY.range()[1] : 0;

  const findDatum = useCallback(
    (
      cx: number,
      cy: number,
      data: XYChartDatum<string, number, Data>[],
      domainX: Domain<string> | undefined,
      domainY: Domain<number> | undefined,
      x: string | undefined,
      y: number | undefined,
      ix: number | undefined,
      iy: number | undefined
    ) => findNearestDatum(cx, cy, data, domainX, domainY, x, y, ix, iy, context, baseline, props.stacked == true),
    [baseline, props.stacked, context]
  );

  warning(p.domainXType === "ordinal", `Chart pane is not supported with domainXType='${p.domainXType}'`);
  return (
    <XYChartPane<string, number, Data>
      {...p}
      {...propsEx}
      computed={computed}
      computedDomainX={domainX}
      findDatum={props.legendInteractive ? findDatum : undefined}
      {...context}
      tooltipOffset={bandwidth * 0.5 - p.theme.charts.xy.style.tooltip.offset}
      formatTooltipValue={props.formatYTooltip ?? p.formatYDomain}>
      {layers}
      {computed && (
        <XYBarLayer<Data>
          componentId={componentId}
          background={p.theme.charts.xy.appearance(p.palette, p.colorMode, undefined, "none").back}
          offset={offset}
          data={computed}
          stacked={!!props.stacked}
          width={bandwidth}
          baseline={baseline}
        />
      )}
    </XYChartPane>
  );
}
