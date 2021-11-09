import { AnimationStyle, Color, ColorMode } from "@apptane/react-ui-core";
import { Theme } from "@apptane/react-ui-theme";
import { css } from "@emotion/react";
import { useContext } from "react";
import { Domain, DomainXValue } from "../common/Types";
import { ChartSliceContext } from "../parts/ChartSliceContext";
import { findValue } from "./common";
import { XYComputedValue, XYDatumEx } from "./commonXY";

const StyleTooltipAnimation = (animation: AnimationStyle, stroke: Color, width: number) => css`
  &,
  > line,
  > circle {
    transition-delay: ${animation.delay}ms;
    transition-duration: ${animation.duration}ms;
    transition-timing-function: ${animation.function};
  }

  > line {
    stroke: ${stroke};
    stroke-width: ${width};
    // shape-rendering: crispedges;
  }
`;

export type XYTooltipLayerProps<X extends DomainXValue, Data = void> = {
  theme: Theme;
  colorMode: ColorMode;
  offset: number;
  data: XYDatumEx<X, Data>[];
  domainX: Domain<X>;
  baseline: number;
};

export const XYTooltipLayer = <X extends DomainXValue, Data = void>({
  theme,
  colorMode,
  offset,
  data,
  domainX,
  baseline,
}: XYTooltipLayerProps<X, Data>) => {
  const slice = useContext(ChartSliceContext);
  if (slice == null || slice.x == null) {
    return null;
  }

  const palette = theme.palette[colorMode];
  const visualAppearance = theme.charts.xy.appearance(palette, colorMode, undefined, "none");
  const visualStyle = theme.charts.xy.style;

  let minY = Infinity;
  const markers: JSX.Element[] = [];
  if (data != null && domainX != null && slice.domainXIndex != null) {
    // use domain index to locate the corresponding value
    const dx = domainX.values[slice.domainXIndex];
    if (dx != null) {
      data.forEach((d, index) => {
        const p = findValue(d, (p) => domainX.isEqual(p.x, dx));
        if (p != null) {
          const _p = p as unknown as XYComputedValue;
          if (_p.c != null && typeof p.y === "number" && isFinite(p.y)) {
            markers.push(<circle key={`_${index}`} cx={0} cy={_p.c.y} r={4.5} stroke={palette.white} fill={d.color} />);
            if (_p.c.y < minY) {
              minY = _p.c.y;
            }
          }
        }
      });
    }
  }

  return markers.length > 0 ? (
    <g
      transform={`translate(${offset + slice.x},0)`}
      css={StyleTooltipAnimation(
        theme.charts.xy.animation,
        visualAppearance.tooltip.line,
        visualStyle.tooltip.lineStroke
      )}>
      <line x1={0} x2={0} y1={minY} y2={baseline} />
      {markers}
    </g>
  ) : null;
};
