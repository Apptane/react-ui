import PropTypes from "prop-types";

export interface TableViewCellProps<T> {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * Flex alignment of the content.
   */
  flexAlignment: "flex-start" | "flex-end" | "center" | "stretch";

  /**
   * Indicates flexible cell width. See `width` property.
   */
  flex?: boolean;

  /**
   * When `flex = true` represents the flex-grow value.
   * When `flex = false` represents fixed width in pixels.
   */
  width: number;

  /**
   * Minimum width in pixels for flexible width cells.
   */
  minWidth?: number;

  /**
   * Left padding in pixels.
   */
  paddingLeft: number;

  /**
   * Right padding in pixels.
   */
  paddingRight: number;

  /**
   * Represents the object associated with the row.
   */
  rowObject?: T;

  /**
   * Represents the index of the row.
   */
  rowIndex?: number;
}

export const TableViewCellPropTypes = {
  fixed: PropTypes.number,
  flexAlignment: PropTypes.oneOf(["flex-start", "flex-end", "center", "stretch"]).isRequired,
  flex: PropTypes.bool,
  width: PropTypes.number.isRequired,
  minWidth: PropTypes.number,
  paddingLeft: PropTypes.number.isRequired,
  paddingRight: PropTypes.number.isRequired,
  rowObject: PropTypes.any,
  rowIndex: PropTypes.number,
};
