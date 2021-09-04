import { Scroller } from "@apptane/react-ui-scroller";
import { css } from "@emotion/react";
import { TileLayoutProps, TileLayoutPropTypes } from "./TileLayout.types";

const StyleBase = (minTileWidth: number, tileGap: number) => css`
  display: grid;
  column-gap: ${tileGap}px;
  row-gap: ${tileGap}px;
  grid-template-columns: repeat(auto-fit, minmax(${minTileWidth}px, 1fr));
`;

/**
 * `TileLayout` component — implements tile-based layout.
 */
function TileLayout({ children, tileGap, minTileWidth, ...other }: TileLayoutProps) {
  return (
    <Scroller {...other}>
      <div css={StyleBase(minTileWidth, tileGap ?? 0)}>{children}</div>
    </Scroller>
  );
}

TileLayout.displayName = "TileLayout";
TileLayout.propTypes = TileLayoutPropTypes;

export default TileLayout;
