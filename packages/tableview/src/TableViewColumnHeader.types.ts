import { TableViewVisualAppearance, Theme } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";
import { SortChangedHandler, SortDirection, TableViewPropTypes } from "./TableView.types";
import { TableViewCellProps, TableViewCellPropTypes } from "./TableViewCell.types";

export type TableViewColumnHeaderProps<T> = TableViewCellProps<T> & {
  /**
   * Passed down by the parent `TableViewColumn` component.
   */
  sortKey?: string;

  /**
   * Passed down by the parent `TableViewColumn` component.
   */
  sortDir?: SortDirection;

  /**
   * Passed down by the parent `TableViewColumn` component.
   */
  onSortChanged?: SortChangedHandler;

  /**
   * Should be passed Theme instance. Doesn't use context.
   */
  theme: Theme;

  /**
   * Visual appearance.
   */
  appearance: TableViewVisualAppearance;
};

export const TableViewColumnHeaderPropTypes = {
  ...TableViewCellPropTypes,
  sortKey: PropTypes.string,
  sortDir: TableViewPropTypes.sortDir,
  onSortChanged: PropTypes.func,
  theme: PropTypes.object.isRequired,
  appearance: PropTypes.object.isRequired,
};
