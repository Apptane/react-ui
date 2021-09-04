import PropTypes from "prop-types";
import { InputBoxProps, InputBoxPropTypes } from "./InputBox.types";

export type TextSelection = {
  start: number;
  end: number;
};

export interface InputTextBaseProps extends Omit<InputBoxProps, "glyph" | "theme" | "control" | "cursor"> {
  /**
   * Indicates whether default focus must be set to the input element.
   */
  autoFocus?: boolean;

  /**
   * Placeholder text to display when value is empty and
   * the control is enabled.
   */
  placeholder?: string;
}

export const InputTextBasePropTypes = {
  ...InputBoxPropTypes,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
};
