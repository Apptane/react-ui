import take from "lodash/take";
import { Color, getColorMap, resolveMappedColor, resolvePaletteReference } from "@apptane/react-ui-core";
import { useMemo } from "react";
import { quantize } from "d3-interpolate";
import { ScaleLinear, scaleLinear, scaleQuantize, ScaleQuantize } from "d3-scale";
import { getColorInterpolator, hex2rgba, mutedColor } from "../common/ColorScheme";
import { Datum, Domain, DomainType, DomainXValue } from "../common/Types";
import { ChartData } from "../parts/ChartDataContext";
import { ChartLinearAxis } from "../parts/ChartLinearAxis";
import { ChartLinearGrid } from "../parts/ChartLinearGrid";
import {
  XYChartBand,
  XYChartPanePropsBase,
  XYChartPanePropsEx,
  XYChartPanePropsExBase,
  XYChartValue,
} from "./XYChart.types";

export type XYComputedValue = {
  index: number;
  stackedY: number;
  c?: {
    x: number;
    y: number;
    v: number;
  };
};

export type XYComputedBand = {
  index: number;
  c?: {
    x: number;
    y0: number;
    y1: number;
  };
};

export type XYChartValueEx<X extends DomainXValue> = XYChartValue<X, number> & XYComputedValue;
export type XYChartBandEx<X extends DomainXValue> = XYChartBand<X, number> & XYComputedBand;

export type XYDatumEx<X extends DomainXValue, Data = void> = Datum<Data> & {
  index: number;
  color: Color;
  areaColor: Color;
  loColor: Color;
  hiColor: Color;
  gradientId: string;
  pri: XYChartValueEx<X>[];
  sec?: XYChartValueEx<X>[];
  bands?: XYChartBandEx<X>[];
};

/**
 * Returns computed data for XY charts with numeric range.
 */
function useComputedData<X extends DomainXValue, Data = void>(
  scaleX: (v: X) => number | undefined,
  compareX: ((a: X, b: X) => number) | undefined,
  domainXType: DomainType,
  {
    componentId,
    data,
    domainY,
    extentY,
    stacked,
    palette,
    colorMode,
    colorScheme,
    color: colorFn,
  }: XYChartPanePropsBase<X, number, Data> & XYChartPanePropsExBase
): [XYDatumEx<X, Data>[] | undefined, Domain<X> | undefined, ScaleLinear<number, number> | undefined] {
  return useMemo(() => {
    if (data == null || data.length === 0) {
      // if domainY is defined we shall return default scaleY
      // for the Y axis to be constructed using one
      const defaultScaleY =
        domainY != null && domainY.length === 2
          ? scaleLinear()
              .rangeRound([0, extentY])
              .domain(domainY.slice().reverse()) // [!] reversed domain
              .nice()
          : undefined;

      return [undefined, undefined, defaultScaleY];
    }

    const prefix = `${componentId}-gradient-`;
    const count = data.length;

    // minimum number of colors to quantize the spectrum into
    const MIN_SHADES = 5;
    const back = colorMode === "dark" ? 16 : 255;

    let colorScale: ScaleQuantize<Color>;
    if (colorScheme != null) {
      const interpolator = getColorInterpolator(palette, colorScheme);
      const reduced = (t: number) => interpolator(t * 0.8 + 0.1); // reduce range to avoid too light/dark colors
      colorScale = scaleQuantize(take(quantize(reduced, Math.max(count, MIN_SHADES)), count)).domain([0, count]);
    } else {
      const colors = getColorMap(palette, count).map((r) => resolvePaletteReference(palette, r));
      colorScale = scaleQuantize(take(colors, count)).domain([0, count]);
    }

    let minY: number | undefined;
    let maxY: number | undefined;

    const valuesX = new Set<X>();

    // tracks baseline for stacked series
    const baselinePri = stacked ? new Map<number, number>() : undefined;
    const baselineSec = stacked ? new Map<number, number>() : undefined;

    const computed = data.map((datum, datumIndex) => {
      const { pri, sec, bands, color, ...other } = datum;

      let c = color;
      if (typeof colorFn === "function") {
        c = colorFn(datum);
      }

      // use series index to establish the color based on the color scheme
      if (c == null) {
        c = colorScale(datumIndex);
      } else {
        c = resolveMappedColor(palette, c);
      }

      function processValue(
        value: XYChartValue<X, number>,
        valueIndex: number,
        baseline?: Map<number, number>
      ): XYChartValueEx<X> {
        const cx = scaleX(value.x);
        const by = cx != null ? baseline?.get(cx) ?? 0 : 0;
        const y = by + value.y;

        valuesX.add(value.x);
        if (isFinite(y)) {
          // shift baseline up by the current series data
          if (baseline && cx != null) {
            baseline.set(cx, y);
          }

          if (minY == null || y < minY) {
            minY = y;
          }

          if (maxY == null || y > maxY) {
            maxY = y;
          }
        }

        return {
          ...value,
          index: valueIndex,
          stackedY: y,
          c:
            cx != null
              ? {
                  x: cx,
                  y: NaN,
                  v: NaN,
                }
              : undefined,
        };
      }

      const priEx = pri.map((p, i) => processValue(p, i, baselinePri));
      const secEx = sec?.map((p, i) => processValue(p, i, baselineSec));
      const bandsEx = stacked
        ? undefined
        : bands?.map((b, bandIndex) => {
            const cx = scaleX(b.x);
            return {
              ...b,
              index: bandIndex,
              c:
                cx != null
                  ? {
                      x: cx,
                      y0: NaN,
                      y1: NaN,
                    }
                  : undefined,
            } as XYChartBandEx<X>;
          });

      return {
        ...other,
        index: datumIndex,
        color: c,
        areaColor: hex2rgba(c),
        loColor: mutedColor(c, 0.2, back),
        hiColor: mutedColor(c, 0.5, back),
        gradientId: `${prefix}${c.replace("#", "")}`,
        pri: priEx,
        sec: secEx,
        bands: bandsEx,
      };
    });

    const realDomainY = domainY?.slice() ?? [];

    if (minY != null && realDomainY[0] == null) {
      realDomainY[0] = minY;
    }

    if (maxY != null && realDomainY[1] == null) {
      realDomainY[1] = maxY;
    }

    // [!] reversed domain to align with SVG coordinate
    const scaleY = scaleLinear().rangeRound([0, extentY]).domain(realDomainY.reverse()).nice();

    // second pass to generate Y coordinate once scale has been established
    computed.forEach((datum) => {
      [datum.pri, datum.sec].forEach((_) =>
        _?.forEach((value) => {
          if (value.c != null) {
            if (isFinite(value.stackedY)) {
              value.c.y = scaleY(value.stackedY);
              value.c.v = scaleY(value.y);
            } else {
              value.c = undefined;
            }
          }
        })
      );

      datum.bands?.forEach((band) => {
        if (band.c != null) {
          if (isFinite(band.y0) && isFinite(band.y1)) {
            band.c.y0 = scaleY(band.y0);
            band.c.y1 = scaleY(band.y1);
          } else {
            band.c = undefined;
          }
        }
      });
    });

    const domain = new Domain(Array.from(valuesX.values()), compareX, domainXType === "ordinal");
    return [computed, domain, scaleY];
  }, [
    componentId,
    data,
    domainY,
    extentY,
    stacked,
    scaleX,
    compareX,
    domainXType,
    palette,
    colorScheme,
    colorMode,
    colorFn,
  ]);
}

/**
 * Generates puzzle pieces for XY pane with numeric range.
 */
export function useXYPaneData<X extends DomainXValue, Data = void>(
  context: ChartData<X>,
  props: XYChartPanePropsBase<X, number, Data> & XYChartPanePropsEx<X>
): [
  XYDatumEx<X, Data>[] | undefined,
  Domain<X> | undefined,
  ScaleLinear<number, number> | undefined,
  React.ReactNode[]
] {
  const [computed, domainX, scaleY] = useComputedData(context.scaleX, context.compareX, context.domainType, props);
  const axisY = scaleY && (
    <ChartLinearAxis
      key="axisY"
      orientation="y"
      componentId={props.componentId}
      theme={props.theme}
      colorMode={props.colorMode}
      span={props.axisYWidth}
      textOffset={1}
      tickSize={props.axisYWidth - 4}
      axisVisible={false}
      tickVisible={true}
      tickValues={props.axisYValues}
      format={props.formatYDomain}
      scale={scaleY}
    />
  );

  const gridY = scaleY && props.gridYVisible && (
    <ChartLinearGrid
      key="gridY"
      orientation="horizontal"
      componentId={props.componentId}
      theme={props.theme}
      colorMode={props.colorMode}
      left={props.axisYWidth}
      width={props.extentX}
      height={props.extentY}
      tickValues={props.axisYValues}
      scale={scaleY}
    />
  );

  const gridX = props.gridXVisible && props.gridX(props);

  return [computed, domainX, scaleY, [axisY, gridY, gridX]];
}

const DefaultFormatNumericLocaleOptions = { maximumFractionDigits: 0 };
const defaultFormatNumeric = (v: number) => v.toLocaleString(undefined, DefaultFormatNumericLocaleOptions);

/**
 * Default formatting function for numeric values in the tooltip.
 */
export function formatNumericTooltip(v: number, lb?: number, ub?: number) {
  const formattedValue = defaultFormatNumeric(v);
  if (lb != null && ub != null) {
    return `${formattedValue} (${defaultFormatNumeric(lb)}—${defaultFormatNumeric(ub)})`;
  }

  return formattedValue;
}
