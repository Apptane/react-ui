import take from "lodash/take";
import {
  AnimationStyle,
  Color,
  getColorMap,
  resolveMappedColor,
  resolvePaletteReference,
} from "@apptane/react-ui-core";
import { useComponentClientSize } from "@apptane/react-ui-hooks";
import { Pane } from "@apptane/react-ui-pane";
import { useColorMode, useTheme } from "@apptane/react-ui-theme";
import { Tooltip } from "@apptane/react-ui-tooltip";
import { Text } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { useCallback, useMemo, useRef, useState } from "react";
import { quantize } from "d3-interpolate";
import { scaleQuantize, ScaleQuantize } from "d3-scale";
import { getColorInterpolator } from "../common/ColorScheme";
import { Datum } from "../common/Types";
import { ChartLegend } from "../parts/ChartLegend";
import { ChartMarker } from "../parts/ChartMarker";
import { GaugeDatum, GaugeProps, GaugePropTypes } from "./Gauge.types";

const StyleContainer = (width?: number) => css`
  position: relative;
  overflow: visible;
  width: ${width ? `${width}px` : "100%"};
  > svg {
    display: block;
  }
`;

const StyleChunk = css`
  pointer-events: all;
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

type SliceData<Data = void> = Datum<Data> & {
  d: GaugeDatum<Data>;
  w: number;
  x: number;
  color: Color;
};

/**
 * `Gauge` component — supports multiple slices, legend and interactivity.
 */
function Gauge<Data = void>({
  data,
  colorScheme,
  color,
  total,
  width,
  height,
  size = 4,
  formatValue,
  tooltipVisible = true,
  legendVisible,
  onClick,
  colorMode,
}: GaugeProps<Data>) {
  const theme = useTheme();
  const actualColorMode = useColorMode(colorMode);
  const palette = theme.palette[actualColorMode];
  const visualStyle = theme.charts.gauge.style;
  const visualAppearance = theme.charts.gauge.appearance(palette, actualColorMode, undefined, "none");

  const containerRef = useRef<HTMLDivElement>(null);
  const containerSize = useComponentClientSize(containerRef);
  const containerWidth = containerSize.width;
  const containerHeight = height != null ? Math.max(height, size) : size;

  const chunks = useMemo(() => {
    if (data == null || data.length === 0) {
      return [];
    }

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

    const actualTotal = total ?? slices.reduce((acc, d) => acc + d.value, 0);

    let x = 0;
    const chunks: Array<SliceData<Data>> = [];

    slices.forEach((d, index) => {
      const chunkWidth = Math.round(((containerWidth || 0) * d.value) / actualTotal);

      let c = d.color;
      if (typeof color === "function" && d) {
        c = color(d);
      }

      // use slice index to establish the color based on the color scheme
      if (c == null) {
        c = colorScale(index);
      } else {
        c = resolveMappedColor(palette, c);
      }

      chunks.push({
        ...d,
        id: d.id,
        label: d.label,
        color: c,
        d: d,
        w: chunkWidth,
        x: x,
      });

      x += chunkWidth;
    });

    return chunks;
  }, [total, data, containerWidth, colorScheme, color, palette]);

  // rounding radius
  const rr = size / 2;
  const y = (containerHeight - size) / 2;
  const filterId = `--apptane-round-corner-${size}-${containerWidth}`;

  const [current, setCurrent] = useState<SliceData<Data> | undefined>(undefined);

  const onMouseLeave = useCallback(() => setCurrent(undefined), []);
  const onMouseEnter = useCallback((d: SliceData<Data>) => setCurrent(d), []);
  const onMouseClick = useCallback(
    (d: SliceData<Data>) => {
      if (onClick != null) {
        onClick(d.d);
      }
    },
    [onClick]
  );

  return (
    <div ref={containerRef} css={StyleContainer(width)}>
      <svg
        css={onClick ? StyleInteractive : undefined}
        viewBox={`0 0 ${containerWidth} ${containerHeight}`}
        width={`${containerWidth}px`}
        height={`${containerHeight}px`}>
        <defs>
          <clipPath id={filterId}>
            <rect x="0" y={y} width={containerWidth} height={size} rx={rr} ry={rr} />
          </clipPath>
        </defs>
        <rect
          x={0}
          y={y}
          width={Math.max(containerWidth - 0.5, 0)}
          height={size}
          rx={rr}
          ry={rr}
          fill={visualAppearance.blank}
        />
        {chunks.map((d, i) => {
          const offsetX = d.x + d.w - 1;
          return (
            <g
              key={`__${i}`}
              onMouseEnter={() => onMouseEnter(d)}
              onMouseLeave={onMouseLeave}
              onMouseDown={onClick ? () => onMouseClick(d) : undefined}>
              <rect css={StyleChunk} x={d.x} y={0} fill="none" width={d.w} height={containerHeight} />
              <rect
                css={StyleChunk}
                clipPath={`url(#${filterId})`}
                x={d.x}
                y={y}
                fill={d.color}
                width={d.w}
                height={size}
              />
              {offsetX <= containerWidth - size && (
                <line x1={offsetX} y1={y - 0.5} x2={offsetX} y2={y + size + 1} stroke={palette.light} strokeWidth={2} />
              )}
            </g>
          );
        })}
      </svg>
      {legendVisible && (
        <div style={{ marginTop: visualStyle.legend.margin }}>
          <ChartLegend<SliceData<Data>, Data>
            theme={theme}
            colorMode={actualColorMode}
            data={chunks}
            selectedDatumId={current?.d.id}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick ? onMouseClick : undefined}
          />
        </div>
      )}
      {tooltipVisible && current && (
        <div
          css={StyleTooltip(theme.animation)}
          style={{ top: containerHeight / 2, width: containerWidth, height: containerHeight }}>
          <div style={{ top: 0, left: Math.max(0, current.x + current.w * 0.5) }}>
            <Tooltip colorMode={actualColorMode}>
              <Pane verticalAlignment="center" orientation="horizontal">
                <ChartMarker theme={theme} colorMode={actualColorMode} color={current.color} />
                <Text
                  color={visualAppearance.tooltip.label}
                  {...visualStyle.font.tooltip.label}
                  marginLeft={visualStyle.tooltip.markerSpacing}
                  nowrap>
                  {current.d.label}
                </Text>
                <Text
                  color={visualAppearance.tooltip.value}
                  {...visualStyle.font.tooltip.value}
                  marginLeft={visualStyle.tooltip.valueSpacing}
                  nowrap>
                  {formatValue != null ? formatValue(current.d.value) : current.d.value.toLocaleString()}
                </Text>
              </Pane>
            </Tooltip>
          </div>
        </div>
      )}
    </div>
  );
}

Gauge.displayName = "Gauge";
Gauge.propTypes = GaugePropTypes;

export default Gauge;
