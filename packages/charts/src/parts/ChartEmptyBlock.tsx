import { Color } from "@apptane/react-ui-core";
import { Paragraph } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { hex2rgba } from "../common/ColorScheme";
import { ChartEmptyBlockProps } from "./ChartEmptyBlock.types";

const StyleContainer = (background: Color) => css`
  position: absolute;
  display: grid;
  place-items: center;
  background: ${hex2rgba(background, 0.7)};
`;

const StyleContent = css`
  user-select: none;
`;

/**
 * `EmptyBlock` component — a placeholder for missing data.
 */
export function ChartEmptyBlock({ theme, colorMode, children, width, height, top, left }: ChartEmptyBlockProps) {
  const visualStyle = theme.charts.xy.style;
  const palette = theme.palette[colorMode];
  const visualAppearance = theme.charts.xy.appearance(palette, colorMode, undefined, "none");
  const content =
    children != null ? (
      typeof children === "string" ? (
        <Paragraph color={visualAppearance.empty} {...visualStyle.font.empty}>
          {children}
        </Paragraph>
      ) : (
        children
      )
    ) : (
      <Paragraph color={visualAppearance.empty} {...visualStyle.font.empty}>
        No data
      </Paragraph>
    );

  return (
    <div css={StyleContainer(visualAppearance.back)} style={{ top: top, left: left, width: width, height: height }}>
      <div css={StyleContent}>{content}</div>
    </div>
  );
}
