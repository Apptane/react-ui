import PropTypes from "prop-types";

export interface PortalProps {
  /**
   * Children nodes.
   */
  children?: React.ReactNode;

  /**
   * Indicates whether events trap must be installed.
   */
  trapEvents?: boolean;
}

export const PortalPropTypes = {
  trapEvents: PropTypes.bool,
  children: PropTypes.any,
};
