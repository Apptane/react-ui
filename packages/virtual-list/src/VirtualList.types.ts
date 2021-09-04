import { ScrollerProps, ScrollerPropTypes } from "@apptane/react-ui-scroller";
import PropTypes from "prop-types";
import { ListBaseProps, ListBasePropTypes, ListItemData } from "./List.types";

export interface VirtualListProps<T extends ListItemData = void>
  extends ListBaseProps<T>,
    Omit<ScrollerProps, "children" | "onScrollX" | "onScrollY"> {
  /**
   * Height of the item in pixels as a fixed value or a function
   * providing item's height given its index.
   *
   * If this property is not specified the list becomes non-virtualized
   * and relies on the item's rendered content instead.
   */
  itemHeight?: number | ((index: number) => number);

  /**
   * Estimated height of the item in pixels.
   * Required when `itemHeight` is passed as a function.
   */
  estimatedItemHeight?: number;

  /**
   * Number of items to render above/below the visible items.
   */
  overscan?: number;
}

export const VirtualListPropTypes = {
  ...ScrollerPropTypes,
  ...ListBasePropTypes,
  itemHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  estimatedItemHeight: PropTypes.number,
  overscan: PropTypes.number,
};

export type VirtualListHandle = {
  invalidate: (index?: number) => void;
};
