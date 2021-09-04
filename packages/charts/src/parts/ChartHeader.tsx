import { Text } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { ChartHeaderProps } from "./ChartHeader.types";

export const StyleContainer = (height: number) => css`
  height: ${height}px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const StyleLegend = css`
  margin-left: auto;
`;

/**
 * Chart pane header component.
 */
export function ChartHeader({ theme, colorMode, header, legend, axisYTitle }: ChartHeaderProps) {
  const visualStyle = theme.charts.xy.style;
  const visualAppearance = theme.charts.xy.appearance(theme.palette[colorMode], colorMode, undefined, "none");

  const headerRow = (header || legend) && (
    <div
      css={[
        StyleContainer(visualStyle.header.height),
        {
          marginBottom: axisYTitle ? visualStyle.yAxis.titleSpacing : visualStyle.header.spacing,
        },
      ]}>
      {header && (
        <Text color={visualAppearance.header} {...visualStyle.font.header}>
          {header}
        </Text>
      )}
      {legend && <div css={StyleLegend}>{legend}</div>}
    </div>
  );

  return axisYTitle ? (
    headerRow ? (
      <div css={{ marginBottom: visualStyle.header.spacing }}>
        {headerRow}
        <div css={StyleContainer(visualStyle.yAxis.titleHeight)}>
          <Text color={visualAppearance.axis.text} {...visualStyle.font.axis}>
            {axisYTitle}
          </Text>
        </div>
      </div>
    ) : (
      <div css={StyleContainer(visualStyle.yAxis.titleHeight)}>
        <Text color={visualAppearance.axis.text} {...visualStyle.font.axis} marginBottom={visualStyle.header.spacing}>
          {axisYTitle}
        </Text>
      </div>
    )
  ) : (
    headerRow ?? null
  );
}
