import { ContentAlignment, PropTypeContentAlignment } from "@apptane/react-ui-core";
import PropTypes from "prop-types";

export interface TableViewColumnProps {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * Width of the column expressed as fixed width value in pixels
   * or as a relative weight.
   */
  width?: number | string;

  /**
   * Minimum width of the column in pixels.
   * Must be specified for flexible width columns.
   */
  minWidth?: number;

  /**
   * Indicates that column should be fixed to the left side
   * and not be horizontally scroll-able. Requires fixed `width`.
   */
  fixed?: boolean;

  /**
   * Alignment of the content.
   */
  alignment?: ContentAlignment;

  /**
   * Overrides default cell padding for the column.
   */
  padding?: number;

  /**
   * Overrides default cell left padding for the column.
   */
  paddingLeft?: number;

  /**
   * Overrides default cell right padding for the column.
   */
  paddingRight?: number;

  /**
   * Header content.
   */
  header?: React.ReactNode;

  /**
   * Sort order key associated with the column.
   */
  sortKey?: string;
}

const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
export const TableViewColumnPropTypes = {
  width: PropTypeNumberOrString,
  minWidth: PropTypes.number,
  fixed: PropTypes.bool,
  alignment: PropTypeContentAlignment,
  padding: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  header: PropTypes.any,
  sortKey: PropTypes.string,
};
