/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useComponentId, warning } from "@apptane/react-ui-core";
import { useContext, useMemo } from "react";
import {
  area,
  curveBumpX,
  curveCatmullRom,
  curveLinear,
  curveMonotoneX,
  curveNatural,
  curveStep,
  line,
} from "d3-shape";
import { Domain, DomainXValue } from "../common/Types";
import {
  ChartData,
  ChartNumericDataContext,
  ChartOrdinalDataContext,
  ChartTimeDataContext,
} from "../parts/ChartDataContext";
import { ChartDatumContext } from "../parts/ChartDatumContext";
import { findValue } from "./common";
import { formatNumericTooltip, useXYPaneData, XYComputedBand, XYComputedValue, XYDatumEx } from "./commonXY";
import { useGradientDefs } from "./gradients";
import {
  XYChartDatum,
  XYChartPanePropsEx,
  XYChartPanePropsExBase,
  XYLineChartPaneProps,
  XYLineChartPanePropsBase,
  XYNumericLineChartPaneProps,
  XYOrdinalLineChartPaneProps,
  XYTimeLineChartPaneProps,
} from "./XYChart.types";
import { XYChartPane } from "./XYChartPane";
import { XYTooltipLayer } from "./XYTooltipLayer";

type CurveType = "linear" | "bump" | "catmullRom" | "monotone" | "natural" | "step";

function curveFn(curve: CurveType) {
  switch (curve) {
    case "linear":
      return curveLinear;
    case "bump":
      return curveBumpX;
    case "catmullRom":
      return curveCatmullRom.alpha(0.5);
    case "monotone":
      return curveMonotoneX;
    case "natural":
      return curveNatural;
    case "step":
      return curveStep;
  }
}

const createLineGenerator = (curve: CurveType) =>
  line<XYComputedValue>()
    .defined((d) => d.c != null)
    .x((d) => d.c!.x)
    .y((d) => d.c!.y)
    .curve(curveFn(curve));

const lineGenerator = {
  linear: createLineGenerator("linear"),
  bump: createLineGenerator("bump"),
  catmullRom: createLineGenerator("catmullRom"),
  monotone: createLineGenerator("monotone"),
  natural: createLineGenerator("natural"),
  step: createLineGenerator("step"),
};

const createAreaGenerator = (curve: CurveType) =>
  area<XYComputedValue>()
    .defined((d) => d.c != null)
    .x((d) => d.c!.x)
    .y1((d) => d.c!.y)
    .curve(curveFn(curve));

const createBandGenerator = (curve: CurveType) =>
  area<XYComputedBand>()
    .defined((d) => d.c != null)
    .x((d) => d.c!.x)
    .y0((d) => d.c!.y0)
    .y1((d) => d.c!.y1)
    .curve(curveFn(curve));

type XYLineLayerProps<X extends DomainXValue, Data = void> = {
  componentId: string;
  data: XYDatumEx<X, Data>[];
  curve: CurveType;
  offset: number;
};

function XYLineLayer<X extends DomainXValue, Data = void>({
  componentId,
  data,
  curve,
  offset,
}: XYLineLayerProps<X, Data>) {
  const selectedDatumId = useContext(ChartDatumContext);
  const generator = lineGenerator[curve];

  const lines: React.ReactNode[] = [];
  data.forEach(({ id, index, color, pri, sec }) => {
    const selected = id === selectedDatumId;
    const key = id ?? `_${index}`;
    [pri, sec].forEach((_, i) => {
      if (_ != null && _.length > 0) {
        lines.push(
          <path
            key={`${key}-${i}`}
            d={generator(_) ?? undefined}
            fill="none"
            stroke={color}
            strokeDasharray={i === 1 ? "2" : undefined}
            strokeWidth={selected ? 2 : undefined}
          />
        );
      }
    });
  });

  return (
    <g transform={`translate(${offset},0)`} strokeWidth={1.5} clipPath={`url(#${componentId}-main-clip)`}>
      {lines}
    </g>
  );
}

function XYBandLayer<X extends DomainXValue, Data = void>({
  componentId,
  data,
  curve,
  offset,
}: XYLineLayerProps<X, Data>) {
  const selectedDatumId = useContext(ChartDatumContext);
  const generator = useMemo(() => createBandGenerator(curve), [curve]);

  return (
    <g transform={`translate(${offset},0)`} clipPath={`url(#${componentId}-main-clip)`}>
      {data.map(
        ({ id, index, loColor, bands }) =>
          bands &&
          bands.length > 0 && (
            <path
              key={id ?? `_${index}`}
              d={generator(bands) ?? undefined}
              fill={loColor}
              opacity={selectedDatumId != null ? (id !== selectedDatumId ? 0.5 : undefined) : 0.65}
            />
          )
      )}
    </g>
  );
}

type XYAreaLayerProps<X extends DomainXValue, Data = void> = {
  componentId: string;
  data: XYDatumEx<X, Data>[];
  curve: CurveType;
  offset: number;
  stacked: boolean;
  gradient: boolean;
  baseline?: number;
};

function XYAreaLayer<X extends DomainXValue, Data = void>({
  componentId,
  data,
  curve,
  offset,
  stacked,
  gradient,
  baseline = 0,
}: XYAreaLayerProps<X, Data>) {
  const selectedDatumId = useContext(ChartDatumContext);

  // no gradient in stacked mode since areas are overlapping
  const gradientEnabled = gradient && !stacked;
  const generator = useMemo(() => createAreaGenerator(curve).y0(baseline), [curve, baseline]);

  const areas: React.ReactNode[] = [];
  for (let i = stacked ? data.length - 1 : 0; stacked ? i >= 0 : i < data.length; stacked ? --i : ++i) {
    const { id, index, hiColor, loColor, gradientId, pri, sec } = data[i];
    const selected = selectedDatumId != null && id === selectedDatumId;
    const key = id ?? `_${index}`;
    [pri, sec].forEach((_, i) => {
      if (_ != null && _.length > 0) {
        areas.push(
          <path
            key={`${key}-${i}`}
            d={generator(_) ?? undefined}
            fill={
              gradientEnabled ? `url(#${selected ? gradientId + "-active" : gradientId})` : selected ? hiColor : loColor
            }
          />
        );
      }
    });
  }

  return (
    <g transform={`translate(${offset},0)`} strokeWidth={0} clipPath={`url(#${componentId}-main-clip)`}>
      {areas}
    </g>
  );
}

function findNearestDatum<X extends DomainXValue, Data = void>(
  cx: number,
  cy: number,
  data: XYChartDatum<X, number, Data>[],
  domainX?: Domain<X>,
  domainY?: Domain<number>,
  x?: X
): XYChartDatum<X, number, Data> | undefined {
  if (domainX == null || x == null) {
    return undefined;
  }

  let datum: XYChartDatum<X, number, Data> | undefined;
  let distance = Infinity;

  data.forEach((d) => {
    const p = findValue(d, (p) => domainX.isEqual(p.x, x));
    if (p != null) {
      const _p = p as unknown as XYComputedValue;
      if (_p.c != null) {
        const m = Math.abs(_p.c.y - cy);
        if (isFinite(m) && m < distance) {
          datum = d;
          distance = m;
        }
      }
    }
  });

  return datum;
}

type XYLineChartPanePropsBaseEx<X extends DomainXValue, Data = void> = XYLineChartPanePropsBase<X, Data> &
  XYChartPanePropsExBase & {
    curve: CurveType;
    context: ChartData<X>;
  };

function XYLineChartPaneBase<X extends DomainXValue, Data = void>({
  context,
  ...props
}: XYLineChartPanePropsBaseEx<X, Data>) {
  const p = props as XYLineChartPanePropsBase<X, Data> & XYChartPanePropsEx<X>;
  const [computed, domainX, scaleY, layers] = useXYPaneData<X, Data>(context, p);
  const offset = props.axisYWidth;
  const baseline = scaleY ? scaleY.range()[1] : 0;

  return (
    <XYChartPane<X, number, Data>
      {...p}
      defs={useGradientDefs(computed, props.gradient == true && props.stacked != true)}
      computed={computed}
      computedDomainX={domainX}
      findDatum={props.legendInteractive ? findNearestDatum : undefined}
      {...context}
      invertY={scaleY?.invert}
      tooltipOffset={props.theme.charts.xy.style.tooltip.offset}
      formatTooltipValue={props.formatYTooltip ?? p.formatYDomain}>
      {layers}
      {computed && props.area && (
        <XYAreaLayer<X, Data>
          componentId={props.componentId}
          offset={offset}
          curve={props.curve}
          data={computed}
          stacked={!!props.stacked}
          gradient={!!props.gradient}
          baseline={baseline}
        />
      )}
      {computed && !props.area && (
        <XYBandLayer<X, Data> componentId={props.componentId} offset={offset} curve={props.curve} data={computed} />
      )}
      {computed && (
        <XYLineLayer<X, Data> componentId={props.componentId} offset={offset} curve={props.curve} data={computed} />
      )}
      {computed && domainX && props.tooltipVisible && (
        <XYTooltipLayer<X, Data>
          theme={props.theme}
          colorMode={props.colorMode}
          offset={offset}
          data={computed}
          domainX={domainX}
          baseline={baseline}
        />
      )}
    </XYChartPane>
  );
}

type XYLineChartPanePropsEx = XYChartPanePropsExBase & {
  curve: CurveType;
};

function XYTimeLineChartPane<Data = void>(props: XYTimeLineChartPaneProps<Data> & XYLineChartPanePropsEx) {
  const context = useContext(ChartTimeDataContext);
  return <XYLineChartPaneBase<Date, Data> {...props} context={context} />;
}

function XYNumericLineChartPane<Data = void>(props: XYNumericLineChartPaneProps<Data> & XYLineChartPanePropsEx) {
  const context = useContext(ChartNumericDataContext);
  return <XYLineChartPaneBase<number, Data> {...props} context={context} />;
}

function XYOrdinalLineChartPane<Data = void>(props: XYOrdinalLineChartPaneProps<Data> & XYLineChartPanePropsEx) {
  const context = useContext(ChartOrdinalDataContext);
  return <XYLineChartPaneBase<string, Data> {...props} context={context} />;
}

export function XYLineChartPane<Data = void>(props: XYLineChartPaneProps<Data>) {
  const componentId = useComponentId("--apptane-chart");
  const {
    axisYVisible = true,
    gridYVisible = true,
    legendInteractive = true,
    tooltipVisible = true,
    formatYTooltip = formatNumericTooltip,
    ...p
  } = props as XYLineChartPaneProps<Data> & XYChartPanePropsExBase; // see XYChartPanes

  const curve: CurveType = p.curve === true ? "monotone" : typeof p.curve === "string" ? p.curve : "linear";
  const propsEx = {
    componentId,
    axisYVisible,
    gridYVisible,
    legendInteractive,
    tooltipVisible,
    formatYTooltip: formatYTooltip,
    curve: curve,
    axisYWidth: axisYVisible ? p.axisYWidth : 0,
  };

  switch (p.domainXType) {
    case "time":
      return <XYTimeLineChartPane {...p} {...propsEx} />;
    case "numeric":
      return <XYNumericLineChartPane {...p} {...propsEx} />;
    case "ordinal":
      return <XYOrdinalLineChartPane {...p} {...propsEx} />;
    default:
      warning(false, "Chart pane does not have 'domainXType' specified");
      return null;
  }
}
