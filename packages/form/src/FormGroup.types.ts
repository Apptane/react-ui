import PropTypes from "prop-types";

export interface FormGroupProps {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * CSS grid template describing horizontal layout.
   */
  layout?: string;
}

export const FormGroupPropTypes = {
  layout: PropTypes.string,
};
