import { Text } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { useCallback } from "react";
import { Datum } from "../common/Types";
import { ChartLegendItemProps } from "./ChartLegendItem.types";
import { ChartMarker } from "./ChartMarker";

const StyleBase = css`
  display: flex;
  align-items: center;
`;

const StyleInteractive = css`
  cursor: pointer;
`;

/**
 * Chart legend item component.
 */
export function ChartLegendItem<T extends Datum<Data>, Data = void>({
  datum,
  onMouseEnter,
  onMouseLeave,
  onClick,
  ...other
}: ChartLegendItemProps<T, Data>) {
  const handleMouseEnter = useCallback(
    (event: React.MouseEvent) => {
      if (typeof onMouseEnter === "function") {
        onMouseEnter(datum, event);
      }
    },
    [datum, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent) => {
      if (typeof onMouseLeave === "function") {
        onMouseLeave(datum, event);
      }
    },
    [datum, onMouseLeave]
  );

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (typeof onClick === "function") {
        onClick(datum, event);
      }
    },
    [datum, onClick]
  );

  const palette = other.theme.palette[other.colorMode];
  const interactive = onClick || onMouseEnter;
  const visualStyle = other.theme.charts.xy.style;
  const visualAppearance = other.theme.charts.xy.appearance(palette, other.colorMode, undefined, "none");

  return (
    <div
      css={[StyleBase, interactive && StyleInteractive]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}>
      <ChartMarker {...other} color={datum.color ?? palette.gray[500]} />
      <Text color={visualAppearance.legend} {...visualStyle.font.legend} marginLeft={visualStyle.legend.markerSpacing}>
        {datum.label}
      </Text>
    </div>
  );
}
