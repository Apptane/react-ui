import {
  AnimationStyle,
  getColorMap,
  PaletteReference,
  resolveMappedColor,
  resolvePaletteReference,
} from "@apptane/react-ui-core";
import { useComponentSize } from "@apptane/react-ui-hooks";
import { useColorMode, useTheme } from "@apptane/react-ui-theme";
import { Tooltip } from "@apptane/react-ui-tooltip";
import { css } from "@emotion/react";
import { useCallback, useMemo, useRef, useState } from "react";
import { GaugeProps, GaugePropTypes, GaugeValue } from "./Gauge.types";

const StyleContainer = (width?: number) => css`
  position: relative;
  width: ${width ? `${width}px` : "100%"};
  > svg {
    display: block;
  }
`;

const StyleChunk = css`
  pointer-events: all;
`;

const StyleTooltip = (animation: AnimationStyle) => css`
  transition-delay: ${animation.delay}ms;
  transition-duration: ${animation.duration}ms;
  transition-timing-function: ${animation.function};

  position: absolute;
  > div {
    left: -50%;
  }
`;

type MeasuredGaugeValue = GaugeValue & { width: number; offset: number };

/**
 * `Gauge` component — supports one or more values.
 */
function Gauge({ value, total, width, height = 4, tooltipHidden, formatTooltip, size = 4, colorMode }: GaugeProps) {
  const theme = useTheme();
  const actualColorMode = useColorMode(colorMode);
  const palette = theme.palette[actualColorMode];

  const containerRef = useRef<HTMLDivElement>(null);
  const containerSize = useComponentSize(containerRef);
  const containerWidth = containerSize.width;
  const containerHeight = height;

  const [hovered, setHovered] = useState<MeasuredGaugeValue | null>(null);
  const showTooltip = useCallback((value: MeasuredGaugeValue | null) => setHovered(value), [setHovered]);
  const hideTooltip = useCallback(() => setHovered(null), [setHovered]);

  const chunks = useMemo(() => {
    let colormap: PaletteReference[];
    const valueWithoutColor = value.reduce((acc: number, v: GaugeValue) => acc + (!v.color ? 1 : 0), 0);
    if (valueWithoutColor > 0) {
      colormap = getColorMap(palette, valueWithoutColor);
    }

    const maxValue = total ?? value.reduce((acc, d) => acc + d.value, 0);

    let offsetX = 0;
    let colorIndex = 0;
    const chunks: Array<MeasuredGaugeValue> = [];
    value.forEach((d) => {
      const chunkWidth = Math.round(((containerWidth || 0) * d.value) / maxValue);
      const chunkColor = d.color
        ? resolveMappedColor(palette, d.color)
        : resolvePaletteReference(palette, colormap[colorIndex++]);

      chunks.push({
        ...d,
        width: chunkWidth,
        offset: offsetX,
        color: chunkColor,
      });

      offsetX += chunkWidth;
    });

    return chunks;
  }, [total, value, containerWidth, palette]);

  // rounding radius
  const rr = size / 2;
  const chunkOffsetY = (containerHeight - size) / 2;
  const filterId = `--apptane-round-corner-${size}-${containerWidth}`;

  return (
    <div ref={containerRef} css={StyleContainer(width)}>
      <svg
        viewBox={`0 0 ${containerWidth} ${containerHeight}`}
        width={`${containerWidth}px`}
        height={`${containerHeight}px`}>
        <defs>
          <clipPath id={filterId}>
            <rect x="0" y={chunkOffsetY} width={containerWidth} height={size} rx={rr} ry={rr} />
          </clipPath>
        </defs>
        <rect
          x={0}
          y={chunkOffsetY}
          width={Math.max(containerWidth - 0.5, 0)}
          height={size}
          rx={rr}
          ry={rr}
          fill={palette.gray[200]}
        />
        {chunks.map((value: MeasuredGaugeValue, i: number) => {
          const offsetX = value.width + value.offset - 1;
          const offsetY = (containerHeight - size) / 2;
          return (
            <g key={`__${i}`} onMouseEnter={() => showTooltip(value)} onMouseLeave={hideTooltip}>
              <rect css={StyleChunk} x={value.offset} y={0} fill="none" width={value.width} height={containerHeight} />
              <rect
                css={StyleChunk}
                clipPath={`url(#${filterId})`}
                x={value.offset}
                y={chunkOffsetY}
                fill={value.color}
                width={value.width}
                height={size}
              />
              {offsetX <= containerWidth - size && (
                <line
                  x1={offsetX}
                  y1={offsetY - 0.5}
                  x2={offsetX}
                  y2={size + offsetY + 1}
                  stroke={palette.white}
                  strokeWidth={2}
                />
              )}
            </g>
          );
        })}
      </svg>
      {!tooltipHidden && hovered && (
        <div
          css={StyleTooltip(theme.animation)}
          style={{ top: containerHeight, left: Math.max(0, hovered?.offset + hovered?.width / 2) }}>
          <Tooltip colorMode={colorMode}>
            {formatTooltip ? formatTooltip(hovered) : `${hovered.label}: ${hovered.value}`}
          </Tooltip>
        </div>
      )}
    </div>
  );
}

Gauge.displayName = "Gauge";
Gauge.propTypes = GaugePropTypes;

export default Gauge;
