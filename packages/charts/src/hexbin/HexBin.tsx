import chunk from "lodash/chunk";
import { AnimationStyle, Color, resolveColor } from "@apptane/react-ui-core";
import { Pane } from "@apptane/react-ui-pane";
import { useColorMode, useTheme } from "@apptane/react-ui-theme";
import { Tooltip } from "@apptane/react-ui-tooltip";
import { Text } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { useCallback, useMemo, useState } from "react";
import { ScaleSequential, scaleSequential } from "d3-scale";
import { getColorInterpolator } from "../common/ColorScheme";
import { ChartMarker } from "../parts/ChartMarker";
import { HexBinDatum, HexBinProps, HexBinPropTypes } from "./HexBin.types";

const StyleContainer = css`
  position: relative;
  width: max-content;
  > svg {
    display: block;
  }
`;

const StyleBorder = (color: Color, opacity: number) => css`
  stroke-width: 1;
  stroke: ${color};
  stroke-opacity: ${opacity};
`;

const StyleNoBorder = css`
  stroke-width: 0;
  stroke: none;
`;

const StyleInteractive = css`
  > path {
    cursor: pointer;
  }
`;

const StyleTooltip = (animation: AnimationStyle) => css`
  transition-delay: ${animation.delay}ms;
  transition-duration: ${animation.duration}ms;
  transition-timing-function: ${animation.function};
  position: absolute;

  // prevents tooltip from triggering onMouseLeave
  pointer-events: none;
`;

const A = Math.sqrt(3) / 2; // sin(𝜋/3)
const thirdPi = Math.PI / 3;
const angles = [0, thirdPi, 2 * thirdPi, 3 * thirdPi, 4 * thirdPi, 5 * thirdPi];

/**
 * Generator function for the hex path.
 */
function hex(radius: number): number[][] {
  let x0 = 0;
  let y0 = 0;
  return angles.map((angle) => {
    const x1 = Math.sin(angle) * radius;
    const y1 = -Math.cos(angle) * radius;
    const dx = x1 - x0;
    const dy = y1 - y0;
    x0 = x1;
    y0 = y1;
    return [dx, dy];
  });
}

type CellData<Data> = {
  d: HexBinDatum<Data>;
  c: Color;
  x: number;
  y: number;
};

type HexBinCellProps<Data> = {
  cell: CellData<Data>;
  p: string;
  update: React.Dispatch<React.SetStateAction<CellData<Data> | undefined>>;
  onClick?: (datum: HexBinDatum<Data>) => void;
};

function HexBinCell<Data>({ cell, p, onClick, update }: HexBinCellProps<Data>) {
  const handleClick = useCallback(() => {
    if (onClick != null) {
      onClick(cell.d);
    }
  }, [onClick, cell.d]);

  const handleEnter = useCallback(() => update(cell), [update, cell]);
  const handleLeave = useCallback(() => update(undefined), [update]);
  return (
    <path
      transform={`translate(${cell.x}, ${cell.y})`}
      d={p}
      fill={cell.c}
      onMouseOver={handleEnter}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    />
  );
}

function getRange<Data>(data: ArrayLike<HexBinDatum<Data>>, rangeMin?: number, rangeMax?: number) {
  let min: number | undefined;
  let max: number | undefined;
  for (let i = 0; i < data.length; ++i) {
    const datum = data[i];
    if (datum.value != null) {
      if (min == null || datum.value < min) {
        min = datum.value;
      }
      if (max == null || datum.value > max) {
        max = datum.value;
      }
    }
  }

  // overrides
  if (rangeMin != null) {
    min = rangeMin;
  }

  if (rangeMax != null) {
    max = rangeMax;
  }

  return [min, max];
}

/**
 * `HexBin` component — renders a grid of hexagonal cells, one for each datum.
 * Supports different chromatic schemes for coloring.
 */
function HexBin<Data = void>({
  data,
  rangeMin,
  rangeMax,
  colorScheme,
  color,
  size = 20,
  gap = 4,
  borderless,
  maxWidth,
  maxPerRow,
  formatTooltip,
  onClick,
  colorMode,
}: HexBinProps<Data>) {
  const theme = useTheme();
  const actualColorMode = useColorMode(colorMode);
  const palette = theme.palette.light; // use light palette for colormap

  const visualStyle = theme.charts.hexbin.style;
  const visualAppearance = theme.charts.hexbin.appearance(
    theme.palette[actualColorMode],
    actualColorMode,
    undefined,
    "none"
  );

  const hexPath = useMemo(() => "m" + hex(size / 2).join("l") + "z", [size]);
  const [cells, width, height] = useMemo(() => {
    if (data == null || data.length === 0) {
      return [[], 0, 0];
    }

    const w = A * size;
    const h = size;
    const b = borderless ? 0 : 2;

    // determine maximum number of cells per line based on the available width;
    // if the specified width is too small default to one cell per line
    let countPerRow = maxPerRow;
    if (maxWidth != null) {
      const candidatePerRow = Math.max(1, Math.floor((maxWidth - b - (w - gap) / 2) / (w + gap)));
      countPerRow = countPerRow == null ? candidatePerRow : Math.min(countPerRow, candidatePerRow);
    }

    if (countPerRow == null) {
      countPerRow = data.length;
    }

    let colorScale: ScaleSequential<Color, never> | undefined;
    const [min, max] = getRange(data, rangeMin, rangeMax);
    if (min != null && max != null) {
      const interpolator = getColorInterpolator(palette, colorScheme);
      colorScale = scaleSequential(interpolator).domain([min, max]);
    }

    const cells: CellData<Data>[] = [];

    const evenRowOffset = Math.ceil((w + gap) / 2);
    const rows = chunk(data, countPerRow);
    for (let i = 0; i < rows.length; ++i) {
      const row = rows[i];
      const offset = i % 2 !== 0 ? evenRowOffset : 0;
      for (let j = 0; j < row.length; ++j) {
        const datum = row[j];

        let c = datum.color;
        if (typeof color === "function") {
          c = color(datum);
        }

        // use value to establish the color based on the color scheme
        if (c == null) {
          c = colorScale != null && datum.value != null ? colorScale(datum.value) : palette.gray[200];
        } else {
          c = resolveColor(palette, c);
        }

        cells.push({
          d: datum,
          c: c ?? palette.gray[200],
          x: offset + j * (w + gap) + (w + b) / 2,
          y: i * (h * 0.75 + gap) + (h + b) / 2,
        });
      }
    }

    const width = (w - gap) / 2 + (w + gap) * countPerRow + b;
    const height = rows.length * (h * 0.75 + gap) + h * 0.25 - gap + b;

    return [cells, width, height, [min, max]];
  }, [data, maxWidth, maxPerRow, size, gap, borderless, colorScheme, color, rangeMin, rangeMax, palette]);

  const [current, setCurrent] = useState<CellData<Data> | undefined>(undefined);
  const interactive = onClick != null;
  return (
    <div css={StyleContainer}>
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        <g
          css={[
            borderless ? StyleNoBorder : StyleBorder(palette.black, visualStyle.borderOpacity),
            interactive && StyleInteractive,
          ]}>
          {cells.map((c, index) => (
            <HexBinCell<Data> key={c.d.id ?? `_${index}`} cell={c} p={hexPath} onClick={onClick} update={setCurrent} />
          ))}
        </g>
      </svg>
      {current && (
        <div css={StyleTooltip(theme.animation)} style={{ top: Math.round(current.y), left: Math.round(current.x) }}>
          <Tooltip colorMode={actualColorMode}>
            {formatTooltip != null ? (
              formatTooltip(current.d)
            ) : (
              <Pane verticalAlignment="center" orientation="horizontal">
                <ChartMarker theme={theme} colorMode={actualColorMode} color={current.c} />
                <Text
                  color={visualAppearance.tooltip.label}
                  {...visualStyle.font.tooltip.label}
                  marginLeft={visualStyle.tooltip.markerSpacing}
                  nowrap>
                  {current.d.label}
                </Text>
                {current.d.value != null && (
                  <Text
                    color={visualAppearance.tooltip.value}
                    {...visualStyle.font.tooltip.value}
                    marginLeft={visualStyle.tooltip.valueSpacing}
                    nowrap>
                    {current.d.value.toLocaleString()}
                  </Text>
                )}
              </Pane>
            )}
          </Tooltip>
        </div>
      )}
    </div>
  );
}

HexBin.displayName = "HexBin";
HexBin.propTypes = HexBinPropTypes;

export default HexBin;
