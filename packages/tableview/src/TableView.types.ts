import {
  AppearanceProps,
  AppearancePropTypes,
  BoxBorderProps,
  BoxBorderPropTypes,
  BoxDimensionsProps,
  BoxDimensionsPropTypes,
  MarginProps,
  MarginPropTypes,
} from "@apptane/react-ui-core";
import { TableViewVisualAppearance } from "@apptane/react-ui-theme";
import { ScrollAlignment } from "@apptane/react-ui-virtual-list";
import PropTypes from "prop-types";

export type SortDirection = "asc" | "desc";

export type SortChangedHandler = (sortKey: string, sortDir?: SortDirection | null) => void;

export type TableViewRowHeight = number | [number, number];

export interface TableViewProps<T>
  extends MarginProps,
    BoxBorderProps,
    BoxDimensionsProps,
    AppearanceProps<TableViewVisualAppearance> {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * An array of items to render.
   */
  data?: ArrayLike<T>;

  /**
   * Height of the row in pixels as a fixed value or as
   * a function providing row's height given its index.
   *
   * If table uses expandable rows the height returned should be
   * an array  containing both [regular, expanded] heights,
   * unless `virtualizationDisabled = true`.
   * In non-virtualized mode table rows are sized to content
   * if no explicit height is specified.
   */
  rowHeight?: TableViewRowHeight | ((rowObject?: T, rowIndex?: number) => TableViewRowHeight);

  /**
   * Indicates that row virtualization should be disabled
   * and rows are to be sized based on content if no explicit
   * height is provided via `rowHeight`.
   */
  virtualizationDisabled?: boolean;

  /**
   * Estimated height of the row in pixels.
   * Required when `rowHeight` is passed as a function.
   */
  estimatedRowHeight?: number;

  /**
   * Height of the header in pixels.
   * Specify zero to hide the header.
   */
  headerHeight: number;

  /**
   * Expansion status of the row.
   * Works with `TableViewExpansion` to show additional content for the row.
   */
  rowExpanded?: (rowObject?: T, rowIndex?: number) => boolean;

  /**
   * Callback invoked when row receives focus through mouse
   * interaction or keyboard navigation.
   *
   * Parameters: (rowObject, rowIndex)
   *   rowObject: data object corresponding to new focused row
   *   rowIndex: index of new focused row
   */
  onRowFocus?: (rowObject: T, rowIndex: number) => void;

  /**
   * Callback invoked when row is clicked or activated via
   * keyboard with Enter or Space.
   *
   * Parameters: (rowObject, rowIndex)
   *   rowObject: data object corresponding to clicked row
   *   rowIndex: index of clicked row
   */
  onRowClick?: (rowObject: T, rowIndex: number) => void;

  /**
   * Key of the column representing the sorting.
   * The component does not implement the sort itself, but
   * provides representation of the sorting state.
   */
  sortKey?: string;

  /**
   * Direction of the sorting: ascending or descending.
   */
  sortDir?: SortDirection;

  /**
   * Callback invoked when the sorting changes.
   *
   * Parameters: (sortKey, sortDir)
   *   sortKey: new sort key
   *   sortDir: new sort direction
   */
  onSortChanged?: SortChangedHandler;

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
   * Provides a way to set initial or change current
   * horizontal scroll position.
   */
  scrollOffsetX?: number;

  /**
   * Provides a way to set initial or change current
   * vertical scroll position.
   */
  scrollOffsetY?: number;

  /**
   * Callback invoked when the vertical scroll offset changes.
   * Passed the vertical scroll offset in pixels, the indices
   * of the first and the last visible items if applicable.
   */
  onScroll?: (offset: number, indexFirst?: number, indexLast?: number) => void;

  /**
   * Callback invoked when the horizontal scroll offset changes.
   * Passed the horizontal scroll offset in pixels.
   */
  onHorizontalScroll?: (offset: number) => void;

  /**
   * Indicates whether keyboard navigation is enabled.
   */
  keyboardNavigation?: boolean;

  /**
   * Content to display when there is no data.
   */
  empty?: React.ReactNode;

  /**
   * Overrides default padding for the first and last columns.
   */
  sidePadding?: number;

  /**
   * Indicates that border between rows should be hidden.
   */
  rowBorderHidden?: boolean;

  /**
   * Indicates that the border of the last row should be visible.
   */
  lastRowBorderVisible?: boolean;
}

const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
export const TableViewPropTypes = {
  ...MarginPropTypes,
  ...BoxBorderPropTypes,
  ...BoxDimensionsPropTypes,
  ...AppearancePropTypes,
  data: PropTypes.array,
  width: PropTypeNumberOrString,
  height: PropTypeNumberOrString,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func, PropTypes.any]),
  estimatedRowHeight: PropTypes.number,
  rowExpanded: PropTypes.func,
  virtualizationDisabled: PropTypes.bool,
  headerHeight: PropTypes.number.isRequired,
  onRowFocus: PropTypes.func,
  onRowClick: PropTypes.func,
  sortKey: PropTypes.string,
  sortDir: PropTypes.oneOf<SortDirection>(["asc", "desc"]),
  onSortChanged: PropTypes.func,
  scrollOffsetX: PropTypes.number,
  scrollOffsetY: PropTypes.number,
  scrollIndex: PropTypes.number,
  scrollAlignment: PropTypes.oneOf<ScrollAlignment>(["smart", "auto", "center", "start", "end"]),
  onScroll: PropTypes.func,
  onHorizontalScroll: PropTypes.func,
  keyboardNavigation: PropTypes.bool,
  empty: PropTypes.node,
  sidePadding: PropTypes.number,
  rowBorderHidden: PropTypes.bool,
  lastRowBorderVisible: PropTypes.bool,
};
