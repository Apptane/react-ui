import PropTypes from "prop-types";

export interface TableViewExpansionProps {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * Minimum height in pixels.
   */
  minHeight?: number;

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
}

export const TableViewExpansionPropTypes = {
  minHeight: PropTypes.number,
  padding: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
};
