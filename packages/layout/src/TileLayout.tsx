import { Scroller } from "@apptane/react-ui-scroller";
import { css } from "@emotion/react";
import { TileLayoutProps, TileLayoutPropTypes } from "./TileLayout.types";

const StyleBase = (placement: string, minTileWidth: number, tileGap: number) => css`
  display: grid;
  column-gap: ${tileGap}px;
  row-gap: ${tileGap}px;
  grid-template-columns: repeat(${placement}, minmax(${minTileWidth}px, 1fr));
`;

/**
 * `TileLayout` component — implements tile-based layout.
 */
function TileLayout({ children, placement = "fill", tileGap, minTileWidth, ...other }: TileLayoutProps) {
  return (
    <Scroller {...other}>
      <div css={StyleBase(placement === "fit" ? "auto-fit" : "auto-fill", minTileWidth, tileGap ?? 0)}>{children}</div>
    </Scroller>
  );
}

TileLayout.displayName = "TileLayout";
TileLayout.propTypes = TileLayoutPropTypes;

export default TileLayout;
