import PropTypes from "prop-types";

/**
 * Alignment options when scrolling to the specified index.
 */
export type ScrollAlignment = "smart" | "auto" | "center" | "start" | "end";

export type ListItemData = Record<string, unknown> | void;

export interface ListBaseProps<T extends ListItemData = void> {
  /**
   * Function that renders the item given its index.
   */
  children: React.ReactNode;

  /**
   * Total number of items in the list.
   */
  itemCount: number;

  /**
   * Data to pass to the item renderer.
   */
  itemData?: T | ((index: number) => T | undefined);

  /**
   * Minimum width of the content in pixels.
   * If specified horizontal scrolling is enabled automatically.
   */
  minContentWidth?: number;

  /**
   * Provides a way to imperatively set initial or
   * change current scroll position to the specified index.
   */
  scrollIndex?: number;

  /**
   * Alignment option when using `scrollIndex` to imperatively set scroll offset.
   * Defaults to `smart`.
   */
  scrollAlignment?: ScrollAlignment;

  /**
   * Callback invoked when the vertical scroll offset changes.
   * Passed the vertical scroll offset in pixels, the indices
   * of the first and the last visible items.
   */
  onScroll?: (offset: number, indexFirst: number, indexLast: number) => void;

  /**
   * Callback invoked when the visibility of horizontal or
   * vertical scrollbar changes.
   */
  onScrollBarVisibilityChanged?: (verticalVisible: boolean, horizontalVisible: boolean) => void;

  /**
   * Callback invoked when the horizontal scroll offset changes.
   * Passed the horizontal scroll offset in pixels.
   */
  onHorizontalScroll?: (offset: number) => void;

  /**
   * Indicates support for keyboard navigation.
   */
  keyboardNavigation?: boolean;

  /**
   * Callback invoked when item receives focus through mouse
   * interaction or keyboard navigation. This callback allows
   * updating `focusIndex` property to enable navigation.
   * Passed the index of the focused item.
   */
  onItemFocus?: (index: number) => void;

  /**
   * Callback invoked when item is clicked or activated via
   * keyboard with Enter or Space.
   * Passed the index of the focused item.
   */
  onItemClick?: (index: number) => void;
}

export const ListBasePropTypes = {
  children: PropTypes.any,
  itemCount: PropTypes.number.isRequired,
  minContentWidth: PropTypes.number,
  scrollIndex: PropTypes.number,
  scrollAlignment: PropTypes.oneOf<ScrollAlignment>(["smart", "auto", "center", "start", "end"]),
  onScroll: PropTypes.func,
  onHorizontalScroll: PropTypes.func,
  keyboardNavigation: PropTypes.bool,
  onItemFocus: PropTypes.func,
  onItemClick: PropTypes.func,
};

export type CallbackFunction = () => void;

export interface ListManager {
  /**
   * Gets the number of items.
   */
  readonly itemCount: number;

  /**
   * Gets the offset of the specified item.
   * @param index index of the item
   */
  getItemOffset(index: number): number;

  /**
   * Gets the size of the specified item.
   * @param index index of the item
   */
  getItemSize(index: number): number;

  /**
   * Gets the total estimated size of all items as measured so far.
   */
  getEstimatedTotalSize(): number;

  /**
   * Gets the effective offset to the item with the specified index
   * according to the alignment.
   *
   * @param index index of the item to compute the offset for
   * @param offset current scrolling offset
   * @param pageSize window (page) size
   * @param align alignment option
   */
  getOffsetForIndexAndAlignment(index: number, offset: number, pageSize: number, align: ScrollAlignment): number;

  /**
   * Gets the items index range for the specified offset.
   *
   * @param offset offset to determine the range for
   * @param pageSize window (page) size
   */
  getRange(offset: number, pageSize: number): [number, number];

  /**
   * Subscribes to notifications when list measurements are reset.
   */
  subscribe(callback: CallbackFunction): CallbackFunction;

  /**
   * Unsubscribes from notifications.
   */
  unsubscribe(callback: CallbackFunction): void;

  /**
   * Resets all measured items at and above the specified index.
   * @param index index to reset at
   */
  reset(index?: number): void;
}
