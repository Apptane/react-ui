import PropTypes from "prop-types";
import { InputBoxProps, InputBoxPropTypes } from "./InputBox.types";

export interface InputDropdownProps<T> extends Omit<InputBoxProps, "empty" | "glyph" | "theme" | "control" | "cursor"> {
  /**
   * Indicates whether default focus must be set to the input element.
   */
  autoFocus?: boolean;

  /**
   * An optional function to format display value.
   */
  formatValue?: (value?: T) => string;

  /**
   * Currently bound value.
   */
  value?: T;

  /**
   * Callback invoked when `value` changes.
   */
  onChange?: (value?: T | null) => void;

  /**
   * Embedded control to render within the dropdown.
   */
  control: (
    value: T | null | undefined,
    onChange: ((value?: T | null) => void) | undefined,
    close: () => void
  ) => React.ReactNode;
}

export const InputDropdownPropTypes = {
  ...InputBoxPropTypes,
  autoFocus: PropTypes.bool,
  formatValue: PropTypes.func,
  value: PropTypes.any,
  onChange: PropTypes.func,
  control: PropTypes.func,
};
