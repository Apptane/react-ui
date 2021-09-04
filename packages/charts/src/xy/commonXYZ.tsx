import take from "lodash/take";
import { Color, getColorMap, resolveMappedColor, resolvePaletteReference } from "@apptane/react-ui-core";
import { useMemo } from "react";
import { forceCollide, forceSimulation, forceX, forceY, SimulationNodeDatum } from "d3-force";
import { quantize } from "d3-interpolate";
import { scaleLinear, ScaleLinear, scaleQuantize, ScaleQuantize } from "d3-scale";
import { getColorInterpolator, mutedColor } from "../common/ColorScheme";
import { Datum, Domain, DomainType, DomainXValue, DomainYValue } from "../common/Types";
import { ChartData } from "../parts/ChartDataContext";
import {
  XYChartDatum,
  XYChartPanePropsBase,
  XYChartPanePropsEx,
  XYChartPanePropsExBase,
  XYChartValue,
} from "./XYChart.types";

const ITERATIONS = 60;

type SimulatedNode = SimulationNodeDatum & {
  datumIndex: number;
  valueIndex: number;
  valueType: "pri" | "sec";
  valueData: {
    x: number;
    y: number;
    d: number;
  };
};

export type XYZComputedValue = {
  index: number;
  c?: {
    x: number;
    y: number;
    d: number;
  };
};

export type XYZChartValueEx<X extends DomainXValue, Y extends DomainYValue> = XYChartValue<X, Y> & XYZComputedValue;
export type XYZDatumEx<X extends DomainXValue, Y extends DomainYValue, Data = void> = Datum<Data> & {
  index: number;
  color: Color;
  loColor: Color;
  hiColor: Color;
  pri: XYZChartValueEx<X, Y>[];
  sec?: XYZChartValueEx<X, Y>[];
};

function useComputedData<X extends DomainXValue, Y extends DomainYValue, Data = void>(
  scaleX: (v: X) => number | undefined,
  compareX: ((a: X, b: X) => number) | undefined,
  domainXType: DomainType,
  scaleY: (v: Y) => number | undefined,
  compareY: ((a: Y, b: Y) => number) | undefined,
  domainYType: DomainType,
  extentZ: number,
  { data, palette, colorMode, colorScheme, color: colorFn }: XYChartPanePropsBase<X, Y, Data> & XYChartPanePropsExBase,
  exact?: boolean
): [
  XYZDatumEx<X, Y, Data>[] | undefined,
  Domain<X> | undefined,
  Domain<Y> | undefined,
  ScaleLinear<number, number> | undefined
] {
  return useMemo(() => {
    if (data == null || data.length === 0) {
      return [undefined, undefined, undefined, undefined];
    }

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

    let minZ: number | undefined;
    let maxZ: number | undefined;

    const valuesX = new Set<X>();
    const valuesY = new Set<Y>();

    const computed = data.map((datum, datumIndex) => {
      const { pri, sec, color, ...other } = datum;

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

      function processValue(value: XYChartValue<X, Y>, valueIndex: number): XYZChartValueEx<X, Y> {
        const cx = scaleX(value.x);
        const cy = scaleY(value.y);

        valuesX.add(value.x);
        valuesY.add(value.y);

        if (value.z != null && isFinite(value.z)) {
          if (minZ == null || value.z < minZ) {
            minZ = value.z;
          }

          if (maxZ == null || value.z > maxZ) {
            maxZ = value.z;
          }
        }

        return {
          ...value,
          index: valueIndex,
          c:
            cx != null && cy != null
              ? {
                  x: cx,
                  y: cy,
                  d: NaN,
                }
              : undefined,
        } as XYZChartValueEx<X, Y>;
      }

      const priEx = pri.map((p, i) => processValue(p, i));
      const secEx = sec?.map((p, i) => processValue(p, i));

      return {
        ...other,
        index: datumIndex,
        color: c,
        loColor: mutedColor(c, 0.2, back),
        hiColor: mutedColor(c, 0.5, back),
        pri: priEx,
        sec: secEx,
      };
    });

    const scaleZ = scaleLinear()
      .rangeRound([0, Math.round(extentZ / Math.sqrt(data.length))])
      .domain([minZ ?? 0, maxZ ?? 0]);

    // second pass to generate node sizes
    computed.forEach((datum) =>
      [datum.pri, datum.sec].forEach((_) =>
        _?.forEach((value) => {
          if (value.c != null) {
            if (value.z != null && isFinite(value.z)) {
              value.c.d = scaleZ(value.z);
            } else {
              value.c = undefined;
            }
          }
        })
      )
    );

    // use force simulation to compute positioning
    if (!exact) {
      const nodes: SimulatedNode[] = [];
      computed.forEach((datum) =>
        [datum.pri, datum.sec].forEach((_, i) =>
          _?.forEach((value) => {
            if (value.c != null) {
              nodes.push({
                datumIndex: datum.index,
                valueIndex: value.index,
                valueType: i === 0 ? "pri" : "sec",
                valueData: value.c,
              });
            }
          })
        )
      );

      const spacing = 0.5;
      const fc = forceCollide<SimulatedNode>((d) => d.valueData.d * 0.5 + spacing);
      const fx = forceX<SimulatedNode>((d) => d.valueData.x).strength(0.1);
      const fy = forceY<SimulatedNode>((d) => d.valueData.y).strength(0.1);

      const simulation = forceSimulation(nodes).force("x", fx).force("y", fy).force("collide", fc).stop();
      simulation.tick(ITERATIONS);
      simulation.nodes().forEach((node) => {
        const datum = computed[node.datumIndex];
        const value =
          node.valueType === "pri"
            ? datum.pri[node.valueIndex]
            : datum.sec != null
            ? datum.sec[node.valueIndex]
            : undefined;

        if (value && value.c != null && node.x != null && node.y != null) {
          value.c.x = node.x;
          value.c.y = node.y;
        }
      });
    }

    const domainX = new Domain(Array.from(valuesX.values()), compareX, domainXType === "ordinal");
    const domainY = new Domain(Array.from(valuesY.values()), compareY, domainYType === "ordinal");
    return [computed, domainX, domainY, scaleZ];
  }, [
    data,
    extentZ,
    scaleX,
    compareX,
    domainXType,
    scaleY,
    compareY,
    domainYType,
    palette,
    colorScheme,
    colorMode,
    colorFn,
    exact,
  ]);
}

/**
 * Generates puzzle pieces for XY pane with Z dimension.
 */
export function useXYZPaneData<X extends DomainXValue, Y extends DomainYValue, Data = void>(
  context: ChartData<X>,
  scaleY: (v: Y) => number | undefined,
  compareY: ((a: Y, b: Y) => number) | undefined,
  domainYType: DomainType,
  extentZ: number,
  props: XYChartPanePropsBase<X, Y, Data> & XYChartPanePropsEx<X>,
  exact?: boolean
): [
  XYZDatumEx<X, Y, Data>[] | undefined,
  Domain<X> | undefined,
  Domain<Y> | undefined,
  ScaleLinear<number, number> | undefined,
  React.ReactNode[]
] {
  const [computed, domainX, domainY, scaleZ] = useComputedData(
    context.scaleX,
    context.compareX,
    context.domainType,
    scaleY,
    compareY,
    domainYType,
    extentZ,
    props,
    exact
  );

  return [computed, domainX, domainY, scaleZ, []];
}

/**
 * Finds bubble datum via (X,Y) coordinates.
 */
export function findDatum<X extends DomainXValue, Y extends DomainYValue, Data = void>(
  cx: number,
  cy: number,
  data: XYChartDatum<X, Y, Data>[]
): XYChartDatum<X, Y, Data> | undefined {
  function match(values: XYChartValue<X, Y>[]): boolean {
    for (let j = 0; j < values.length; ++j) {
      const p = values[j];
      if (p != null) {
        const _p = p as unknown as XYZComputedValue;
        if (_p.c != null) {
          const distance = Math.pow(_p.c.d * 0.5, 2);
          if (Math.pow(_p.c.x - cx, 2) < distance && Math.pow(_p.c.y - cy, 2) < distance) {
            return true;
          }
        }
      }
    }

    return false;
  }

  for (let i = 0; i < data.length; ++i) {
    const d = data[i];
    if (match(d.pri) || (d.sec != null && match(d.sec))) {
      return d;
    }
  }

  return undefined;
}
