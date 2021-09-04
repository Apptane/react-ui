import PropTypes from "prop-types";
import { InputNumericProps, InputNumericPropTypes } from "./InputNumeric.types";

export interface InputSliderProps extends InputNumericProps {
  /**
   * Minimum value of the numeric range. Defaults to zero.
   */
  min?: number;

  /**
   * Maximum value of the numeric range.
   */
  max: number;

  /**
   * Visibility of the numeric input control.
   */
  inputVisible?: boolean;

  /**
   * Width of the numeric input control. Defaults to 80px.
   */
  inputWidth?: number;
}

export const InputSliderPropTypes = {
  ...InputNumericPropTypes,
  min: PropTypes.number,
  max: PropTypes.number.isRequired,
  inputVisible: PropTypes.bool,
  inputWidth: PropTypes.number,
};
