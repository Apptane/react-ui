import { MarginProps, MarginPropTypes, PaddingProps, PaddingPropTypes } from "@apptane/react-ui-core";
import PropTypes from "prop-types";

export type TileLayoutPlacement = "fill" | "fit";

export interface TileLayoutProps extends MarginProps, PaddingProps {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * Width of the container.
   */
  width?: number;

  /**
   * Height of the container. If the content height exceeds
   * this value the vertical scrolling is enabled automatically.
   */
  height?: number;

  /**
   * Indicates whether top and/or bottom shadow must be visible
   * when content is scrolled.
   */
  shadow?: boolean;

  /**
   * Spacing in pixels around tiles.
   */
  tileGap?: number;

  /**
   * Minimum width of the tile.
   */
  minTileWidth: number;

  /**
   * Tile grid placement. Defaults to `fill`.
   */
  placement?: TileLayoutPlacement;
}

export const TileLayoutPropTypes = {
  ...MarginPropTypes,
  ...PaddingPropTypes,
  width: PropTypes.number,
  height: PropTypes.number,
  shadow: PropTypes.bool,
  tileGap: PropTypes.number,
  minTileWidth: PropTypes.number.isRequired,
  placement: PropTypes.oneOf(["fill", "fit"]),
};
