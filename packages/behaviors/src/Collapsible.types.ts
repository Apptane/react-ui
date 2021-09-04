import PropTypes from "prop-types";

export interface CollapsibleProps {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * Indicates whether the panel is open and content is displayed.
   */
  open?: boolean;

  /**
   * Duration of the animated transition in milliseconds.
   */
  transitionDuration?: number;
}

export const CollapsiblePropTypes = {
  open: PropTypes.bool,
  transitionDuration: PropTypes.number,
};
