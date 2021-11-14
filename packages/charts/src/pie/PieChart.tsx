import take from "lodash/take";
import {
  AnimationStyle,
  Color,
  ColorMode,
  getColorMap,
  resolveMappedColor,
  resolvePaletteReference,
} from "@apptane/react-ui-core";
import { Pane } from "@apptane/react-ui-pane";
import { Theme, useColorMode, useTheme } from "@apptane/react-ui-theme";
import { Tooltip } from "@apptane/react-ui-tooltip";
import { Paragraph, Text } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { useCallback, useMemo, useState } from "react";
import { quantize } from "d3-interpolate";
import { ScaleQuantize, scaleQuantize } from "d3-scale";
import { arc, pie, PieArcDatum } from "d3-shape";
import { getColorInterpolator } from "../common/ColorScheme";
import { ChartMarker } from "../parts/ChartMarker";
import { PieChartDatum, PieChartProps, PieChartPropTypes } from "./PieChart.types";

const StyleContainer = css`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  overflow: visible;
`;

const StyleInteractive = css`
  cursor: pointer;
`;

const StyleTooltip = (animation: AnimationStyle) => css`
  > div {
    transition-delay: ${animation.delay}ms;
    transition-duration: ${animation.duration}ms;
    transition-timing-function: ${animation.function};
    position: absolute;
    transform: translateY(-50%);
  }

  // prevents tooltip from triggering onMouseLeave
  pointer-events: none;
  position: absolute;
`;

const StyleChart = css`
  position: relative;
  flex: none;
  display: grid;
  place-items: center;
`;

const StyleContent = css`
  position: absolute;
  text-align: center;
`;

const StyleArcs = css`
  position: absolute;
  > svg {
    display: block;
    > g > path {
      stroke: none
      stroke-width: 0;
    }
  }
`;

const StyleArcsHover = css`
  > svg > g > path {
    pointer-events: visible;
  }
`;

const StyleLegend = (margin: number) => css`
  flex: auto;
  overflow: hidden;
  padding-left: ${margin}px;
`;

const StyleLegendItem = (height: number, padding: number) => css`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  box-sizing: border-box;
  height: ${height}px;
  padding: 0 ${padding}px;

  > div:first-of-type {
    display: flex;
    flex: auto;
    flex-wrap: nowrap;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
  }
`;

const StyleLegendItemBorder = (color: Color) => css`
  border-bottom: solid 1px ${color};
`;

const StyleLegendItemActive = (color: Color) => css`
  background: ${color};
`;

const StyleLegendItemValue = (spacing: number) => css`
  text-align: right;
  flex: none;
  margin-left: auto;
  padding-left: ${spacing}px;
`;

const StyleLegendItemPercent = (spacing: number) => css`
  text-align: right;
  flex: none;
  width: ${40 + spacing}px;
  padding-left: ${spacing}px;
`;

const PAD_ANGLE = 0.00872665; // radians (~0.5 degree)
const RADIUS_BAND = 0.95;
const RADIUS_DEAD = 0.35;
const OPACITY_SHADOW = 0.2;
const OPACITY_INACTIVE = 0.5;

type ArcData<Data = void> = {
  d: PieChartDatum<Data>;
  c: Color;
  x: number;
  y: number;
  p: number;
  path: {
    outer?: string;
    inner?: string;
    hover?: string;
  };
};

type PieEmptyProps = {
  size: number;
  color: Color;
};

function PieEmpty({ size, color }: PieEmptyProps) {
  const radius = size / 2;
  const path =
    arc()({
      outerRadius: radius,
      innerRadius: radius * RADIUS_BAND,
      startAngle: 0,
      endAngle: 2 * Math.PI,
    }) ?? undefined;

  return (
    <div css={StyleArcs}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <g transform={`translate(${size / 2}, ${size / 2})`}>
          <path d={path} fill={color} />
        </g>
      </svg>
    </div>
  );
}

type PieArcsProps<Data = void> = {
  arcs: ArcData<Data>[];
  size: number;
  activeId?: string;
  shadow?: boolean;
  onMouseEnter?: (data: ArcData<Data>) => void;
  onMouseClick?: (data: ArcData<Data>) => void;
};

function PieArcs<Data = void>({ arcs, size, activeId, shadow, onMouseEnter, onMouseClick }: PieArcsProps<Data>) {
  const elements: JSX.Element[] = [];
  arcs.forEach((arc, index) => {
    const opacity = shadow ? OPACITY_SHADOW : activeId == null || activeId === arc.d.id ? 1 : OPACITY_INACTIVE;
    const visible = !shadow || activeId === arc.d.id;
    if (visible) {
      elements.push(
        <path
          key={`arc${index}`}
          d={shadow ? arc.path.inner : arc.path.outer}
          fill={arc.c}
          fillOpacity={opacity}
          onMouseEnter={onMouseEnter ? () => onMouseEnter(arc) : undefined}
          onMouseDown={onMouseClick ? () => onMouseClick(arc) : undefined}
        />
      );
    }
  });

  return (
    <div css={StyleArcs}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <g transform={`translate(${size / 2}, ${size / 2})`}>{elements}</g>
      </svg>
    </div>
  );
}

function PieArcsHover<Data = void>({
  arcs,
  size,
  onMouseEnter,
  onMouseClick,
}: Pick<PieArcsProps<Data>, "arcs" | "size" | "onMouseEnter" | "onMouseClick">) {
  return onMouseEnter ? (
    <div css={[StyleArcs, StyleArcsHover, onMouseClick && StyleInteractive]}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <g transform={`translate(${size / 2}, ${size / 2})`}>
          {arcs.map((arc, index) => (
            <path
              key={`arc${index}`}
              d={arc.path.hover}
              fill="none"
              onMouseEnter={() => onMouseEnter(arc)}
              onMouseDown={onMouseClick ? () => onMouseClick(arc) : undefined}
            />
          ))}
        </g>
      </svg>
    </div>
  ) : null;
}

type PieLegendItemProps<Data = void> = {
  theme: Theme;
  colorMode: ColorMode;
  arc: ArcData<Data>;
  formatValue?: (value: number) => string;
  active?: boolean;
  hasBorder?: boolean;
  onMouseEnter?: (data: ArcData<Data>) => void;
  onMouseLeave?: (data: ArcData<Data>) => void;
  onMouseClick?: (data: ArcData<Data>) => void;
};

function PieLegendItem<Data = void>({
  theme,
  colorMode,
  arc,
  formatValue,
  active,
  hasBorder,
  onMouseEnter,
  onMouseLeave,
  onMouseClick,
}: PieLegendItemProps<Data>) {
  const visualStyle = theme.charts.pie.style;
  const visualAppearance = theme.charts.pie.appearance(theme.palette[colorMode], colorMode, undefined, "none");
  return (
    <div
      role="row"
      css={[
        StyleLegendItem(visualStyle.legend.itemHeight, visualStyle.legend.itemPadding),
        onMouseClick && StyleInteractive,
        active && StyleLegendItemActive(visualAppearance.legend.highlight),
        hasBorder && StyleLegendItemBorder(visualAppearance.legend.border),
      ]}
      onMouseEnter={onMouseEnter ? () => onMouseEnter(arc) : undefined}
      onMouseLeave={onMouseLeave ? () => onMouseLeave(arc) : undefined}
      onClick={onMouseClick ? () => onMouseClick(arc) : undefined}>
      <div role="gridcell">
        <ChartMarker theme={theme} colorMode={colorMode} color={arc.c} />
        <Text
          color={visualAppearance.legend.label}
          {...visualStyle.font.legend.label}
          marginLeft={visualStyle.legend.markerSpacing}
          nowrap
          ellipsis>
          {arc.d.label}
        </Text>
        <div css={StyleLegendItemValue(visualStyle.legend.itemSpacing)}>
          <Text color={visualAppearance.legend.value} {...visualStyle.font.legend.value} nowrap>
            {formatValue != null ? formatValue(arc.d.value) : arc.d.value.toLocaleString()}
          </Text>
        </div>
      </div>
      <div role="gridcell" css={StyleLegendItemPercent(visualStyle.legend.itemSpacing)}>
        <Text color={visualAppearance.legend.percent} {...visualStyle.font.legend.value} nowrap>
          {arc.p.toFixed(1)}%
        </Text>
      </div>
    </div>
  );
}

type PieLegendProps<Data = void> = {
  theme: Theme;
  colorMode: ColorMode;
  arcs: ArcData<Data>[];
  formatValue?: (value: number) => string;
  activeId?: string;
  onMouseEnter?: (data: ArcData<Data>) => void;
  onMouseLeave?: (data: ArcData<Data>) => void;
  onMouseClick?: (data: ArcData<Data>) => void;
};

function PieLegend<Data = void>({ arcs, activeId, ...other }: PieLegendProps<Data>) {
  return (
    <div role="grid" css={StyleLegend(other.theme.charts.pie.style.legend.margin)}>
      {arcs.map((arc, index) => (
        <PieLegendItem
          key={`arc${index}`}
          arc={arc}
          active={activeId === arc.d.id}
          hasBorder={index < arcs.length - 1}
          {...other}
        />
      ))}
    </div>
  );
}

/**
 * `PieChart` component — renders pie chart with an optional legend,
 * supports interactivity via both legend and pie presentation.
 */
function PieChart<Data = void>({
  data,
  colorScheme,
  color,
  width,
  size,
  formatValue,
  totalValue,
  totalLabel,
  emptyText,
  tooltipVisible = true,
  legendVisible,
  onClick,
  colorMode,
}: PieChartProps<Data>) {
  const theme = useTheme();
  const actualColorMode = useColorMode(colorMode);
  const palette = theme.palette[actualColorMode];
  const visualStyle = theme.charts.pie.style;
  const visualAppearance = theme.charts.pie.appearance(palette, actualColorMode, undefined, "none");

  const [arcs, totalActual] = useMemo(() => {
    if (data == null || data.length === 0) {
      return [[], 0];
    }

    const outerR = size / 2;
    const innerR = outerR * RADIUS_BAND;

    const generatorOuter = arc<PieArcDatum<PieChartDatum<Data>>>()
      .outerRadius(outerR)
      .innerRadius(outerR * RADIUS_BAND);

    const generatorInner = arc<PieArcDatum<PieChartDatum<Data>>>()
      .outerRadius(innerR)
      .innerRadius(innerR * RADIUS_BAND);

    const generatorHover = arc<PieArcDatum<PieChartDatum<Data>>>()
      .outerRadius(outerR)
      .innerRadius(outerR * RADIUS_DEAD);

    const slices = Array.from(data);
    const count = slices.length;

    // minimum number of colors to quantize the spectrum into
    const MIN_SHADES = 5;

    let colorScale: ScaleQuantize<Color>;
    if (colorScheme != null) {
      const interpolator = getColorInterpolator(palette, colorScheme);
      const reduced = (t: number) => interpolator(t * 0.8 + 0.1); // reduce range to avoid too light/dark colors
      colorScale = scaleQuantize(take(quantize(reduced, Math.max(count, MIN_SHADES)), count)).domain([0, count]);
    } else {
      const colors = getColorMap(palette, count).map((r) => resolvePaletteReference(palette, r));
      colorScale = scaleQuantize(take(colors, count)).domain([0, count]);
    }

    let total = 0;
    const arcs: ArcData<Data>[] = [];

    const generator = pie<PieChartDatum<Data>>()
      .sort(null)
      .value((d) => d.value)
      .padAngle(PAD_ANGLE);

    generator(slices).forEach((d) => {
      const [x, y] = generatorOuter.centroid(d);
      total += d.data.value;

      let c = d.data.color;
      if (typeof color === "function") {
        c = color(d.data);
      }

      // use arc index to establish the color based on the color scheme
      if (c == null) {
        c = colorScale(d.index);
      } else {
        c = resolveMappedColor(palette, c);
      }

      arcs.push({
        d: d.data,
        c: c,
        x: x + outerR,
        y: y + outerR,
        p: d.data.value,
        path: {
          outer: generatorOuter(d) ?? undefined,
          inner: generatorInner(d) ?? undefined,
          hover: generatorHover(d) ?? undefined,
        },
      });
    });

    if (total > 0) {
      arcs.forEach((arc) => {
        arc.p = (100 * arc.p) / total;
      });
    }

    return [arcs, total];
  }, [data, size, colorScheme, color, palette]);

  const [current, setCurrent] = useState<{ arc: ArcData<Data>; legend: boolean } | undefined>(undefined);

  const onMouseLeave = useCallback(() => setCurrent(undefined), []);
  const onMouseEnter = useCallback((d: ArcData<Data>) => setCurrent({ arc: d, legend: false }), []);
  const onMouseClick = useCallback(
    (d: ArcData<Data>) => {
      if (onClick != null) {
        onClick(d.d);
      }
    },
    [onClick]
  );

  const onMouseEnterLegend = useCallback((d: ArcData<Data>) => setCurrent({ arc: d, legend: true }), []);

  const chart =
    arcs.length === 0 ? (
      <div css={StyleChart} style={{ width: size, height: size }}>
        <PieEmpty size={size} color={visualAppearance.blank} />
        <div css={StyleContent}>
          <Paragraph color={visualAppearance.empty} {...visualStyle.font.empty} alignment="center">
            {emptyText}
          </Paragraph>
        </div>
      </div>
    ) : (
      <div css={StyleChart} style={{ width: size, height: size }} onMouseLeave={onMouseLeave}>
        {current && <PieArcs arcs={arcs} size={size} activeId={current.arc.d.id} shadow onMouseEnter={onMouseEnter} />}
        {(totalValue || totalActual > 0) && (
          <div css={StyleContent}>
            <Text color={visualAppearance.value} {...visualStyle.font.value} alignment="center">
              {totalValue ?? (formatValue != null ? formatValue(totalActual) : totalActual.toLocaleString())}
            </Text>
            {totalLabel && (
              <Paragraph color={visualAppearance.title} {...visualStyle.font.title} alignment="center">
                {totalLabel}
              </Paragraph>
            )}
          </div>
        )}
        <PieArcs arcs={arcs} size={size} activeId={current?.arc.d.id} onMouseEnter={onMouseEnter} />
        <PieArcsHover
          arcs={arcs}
          size={size}
          onMouseEnter={onMouseEnter}
          onMouseClick={onClick ? onMouseClick : undefined}
        />
        {tooltipVisible && current && !current.legend && (
          <div css={StyleTooltip(theme.animation)} style={{ width: size, height: size }}>
            <div style={{ left: Math.round(current.arc.x), top: Math.round(current.arc.y) }}>
              <Tooltip colorMode={actualColorMode}>
                <Pane verticalAlignment="center" orientation="horizontal">
                  <ChartMarker theme={theme} colorMode={actualColorMode} color={current.arc.c} />
                  <Text
                    color={visualAppearance.tooltip.label}
                    {...visualStyle.font.tooltip.label}
                    marginLeft={visualStyle.tooltip.markerSpacing}
                    nowrap>
                    {current.arc.d.label}
                  </Text>
                  <Text
                    color={visualAppearance.tooltip.value}
                    {...visualStyle.font.tooltip.value}
                    marginLeft={visualStyle.tooltip.valueSpacing}
                    nowrap>
                    {formatValue != null ? formatValue(current.arc.d.value) : current.arc.d.value.toLocaleString()}
                  </Text>
                </Pane>
              </Tooltip>
            </div>
          </div>
        )}
      </div>
    );

  return (
    <div css={StyleContainer} style={{ width: width, minHeight: size }}>
      {chart}
      {legendVisible && (
        <PieLegend
          theme={theme}
          colorMode={actualColorMode}
          arcs={arcs}
          formatValue={formatValue}
          activeId={current?.arc.d.id}
          onMouseEnter={onMouseEnterLegend}
          onMouseLeave={onMouseLeave}
          onMouseClick={onClick ? onMouseClick : undefined}
        />
      )}
    </div>
  );
}

PieChart.displayName = "PieChart";
PieChart.propTypes = PieChartPropTypes;

export default PieChart;
