import PropTypes from "prop-types";
import { InputTextBaseProps, InputTextBasePropTypes } from "./InputTextBase.types";

export type InputTextType = "text" | "password" | "email";

export interface InputTextProps extends Omit<InputTextBaseProps, "empty"> {
  /**
   * Type of the input. Should specify `password` to show password characters
   * instead of actual value in disabled state.
   */
  type?: InputTextType;

  /**
   * Converts the input into text area with the specified number of lines
   * when this property is equal or larger than 2.
   */
  lines?: number;

  /**
   * Currently bound value.
   */
  value?: string;

  /**
   * Callback invoked when `value` changes.
   */
  onChange?: (value?: string) => void;

  /**
   * Custom key down event handler.
   */
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

export const InputTextPropTypes = {
  ...InputTextBasePropTypes,
  type: PropTypes.oneOf<InputTextType>(["text", "password", "email"]),
  lines: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
};
