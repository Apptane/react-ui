import PropTypes from "prop-types";
import { InputTextBaseProps, InputTextBasePropTypes } from "./InputTextBase.types";

export interface InputNumericProps extends Omit<InputTextBaseProps, "empty"> {
  /**
   * Numeric format: prefix.
   */
  prefix?: string;

  /**
   * Numeric format: suffix,
   */
  suffix?: string;

  /**
   * Numeric format: show thousands separator. Defaults to `true`.
   */
  thousands?: boolean;

  /**
   * Numeric format: precision.
   */
  precision?: number;

  /**
   * Numeric format: total number of digits before decimal point.
   * Defaults to `-1`.
   */
  digits?: number;

  /**
   * Numeric format: indicates whether negative numbers are allowed.
   */
  negative?: boolean;

  /**
   * Numeric format: delimiter characters for decimal point and thousand separator.
   */
  delimiters?: {
    decimal?: string;
    thousand?: string;
  };

  /**
   * Currently bound value.
   */
  value?: number;

  /**
   * Callback invoked when `value` changes.
   * If callback returns `false` the change is not accepted and reverted to previous value.
   */
  onChange?: (value?: number | null) => boolean | undefined;

  /**
   * Custom key down event handler.
   */
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

export const InputNumericPropTypes = {
  ...InputTextBasePropTypes,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  thousands: PropTypes.bool,
  precision: PropTypes.number,
  digits: PropTypes.number,
  negative: PropTypes.bool,
  delimiters: PropTypes.shape({
    decimal: PropTypes.string,
    thousand: PropTypes.string,
  }),
  value: PropTypes.number,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
};
