import { Color, resolveMappedColor } from "@apptane/react-ui-core";
import { FontProperties, resolveFont } from "@apptane/react-ui-theme";
import { StyleTextBase } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { useMemo } from "react";
import { DomainXValue } from "../common/Types";
import { XYChartOverlayProps } from "./XYChartOverlay.types";

const StyleOverlay = (font: FontProperties, text: Color) => css`
  text {
    ${StyleTextBase(font)};
    fill: ${text};
    user-select: none;
  }
`;

function getTitlePosition<X extends DomainXValue>(
  titleAlignment: XYChartOverlayProps<X>["titleAlignment"],
  padding: number,
  x0: number,
  x1: number,
  height: number
) {
  switch (titleAlignment) {
    case "bottom-left":
      return `${x0 + padding},${height - padding}`;
    case "top-left":
      return `${x0 + padding},${padding}`;
    case "bottom-right":
      return `${x1 - padding},${height - padding}`;
    case "top-right":
      return `${x1 - padding},${padding}`;
  }
}

export function XYChartOverlay<X extends DomainXValue>({
  theme,
  colorMode,
  scaleX,
  width,
  height,
  title,
  titleAlignment = "bottom-left",
  color,
  x0,
  x1,
}: XYChartOverlayProps<X>) {
  const palette = theme.palette[colorMode];
  const visualAppearance = theme.charts.xy.appearance(palette, colorMode, undefined, "none");
  const visualStyle = theme.charts.xy.style;

  const fill = color != null ? resolveMappedColor(palette, color) : visualAppearance.overlay.fill;
  const cx0 = Math.max(x0 != null ? scaleX(x0) ?? 0 : 0, 0);
  const cx1 = Math.min(x1 != null ? scaleX(x1) ?? width : width, width);

  const font = useMemo(
    () => resolveFont(theme.typography, visualStyle.font.overlay),
    [theme.typography, visualStyle.font.overlay]
  );

  return (
    <g css={StyleOverlay(font, visualAppearance.overlay.text)}>
      <rect x={cx0} y={0} width={cx1 - cx0} height={height} fill={fill} opacity={visualStyle.overlay.opacity} />
      {title && (
        <text
          transform={`translate(${getTitlePosition(titleAlignment, visualStyle.overlay.padding, cx0, cx1, height)})`}
          textAnchor={titleAlignment === "top-right" || titleAlignment === "bottom-right" ? "end" : "start"}
          dominantBaseline={
            titleAlignment === "top-right" || titleAlignment === "top-left" ? "text-before-edge" : "text-after-edge"
          }>
          {title}
        </text>
      )}
    </g>
  );
}
