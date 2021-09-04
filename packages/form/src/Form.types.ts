import { MarginProps, MarginPropTypes } from "@apptane/react-ui-core";
import PropTypes from "prop-types";

export interface FormProps extends MarginProps {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * Overrides the default width.
   */
  width?: number | string;

  /**
   * Overrides the default spacing between form fields.
   */
  spacing?: number;

  /**
   * Indicates whether entire form must be rendered in a disabled state.
   * This property applies to all fields within the form.
   */
  disabled?: boolean;

  /**
   * If specified renders <form onSubmit /> as the container.
   */
  submit?: () => void;
}

const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

export const FormPropTypes = {
  ...MarginPropTypes,
  width: PropTypeNumberOrString,
  spacing: PropTypes.number,
  disabled: PropTypes.bool,
  submit: PropTypes.func,
};
