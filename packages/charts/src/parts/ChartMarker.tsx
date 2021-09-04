import { Color } from "@apptane/react-ui-core";
import { css } from "@emotion/react";
import { ChartMarkerProps } from "./ChartMarker.types";

const StyleContainer = css`
  display: block;
  flex: none;
`;

const StyleMarker = (color: Color, opacity: number, border: Color) => css`
  fill: ${color};
  stroke: ${border};
  stroke-width: 1;
  fill-opacity: ${opacity};
  stroke-opacity: ${opacity};
`;

/**
 * Chart marker component.
 */
export function ChartMarker({ theme, colorMode, appearance = "circle", color, muted, size = 10 }: ChartMarkerProps) {
  const border = theme.palette[colorMode].white;
  const opacity = muted ? 0.3 : 1;

  let marker;
  switch (appearance) {
    case "line":
      marker = (
        <line css={StyleMarker(color, opacity, border)} x1={0} y1={size / 2} x2={size} y2={size / 2} strokeWidth={2} />
      );
      break;
    case "square":
      marker = <rect css={StyleMarker(color, opacity, border)} x={0} y={0} width={size} height={size} />;
      break;
    default:
      marker = (
        <circle css={StyleMarker(color, opacity, border)} cx={size / 2} cy={size / 2} r={Math.ceil(size / 2 - 1)} />
      );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      css={StyleContainer}>
      {marker}
    </svg>
  );
}
