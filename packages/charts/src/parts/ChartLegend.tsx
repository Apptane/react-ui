import { css } from "@emotion/react";
import { ChartLegendProps } from "./ChartLegend.types";
import { ChartLegendItem } from "./ChartLegendItem";

const StyleContainer = (spacing: number) => css`
  display: flex;
  align-items: flex-start;
  > * + * {
    margin-left: ${spacing}px;
  }
`;

/**
 * Chart legend component with support for interactivity.
 */
export function ChartLegend<Data = void>({ data, selectedDatumId, ...other }: ChartLegendProps<Data>) {
  const items: JSX.Element[] = [];
  for (let i = 0; i < data.length; ++i) {
    const datum = data[i];
    items.push(
      <ChartLegendItem<Data>
        key={datum.id}
        {...other}
        datum={datum}
        muted={selectedDatumId != null && selectedDatumId !== datum.id}
      />
    );
  }

  return <div css={StyleContainer(other.theme.charts.xy.style.legend.itemSpacing)}>{items}</div>;
}
