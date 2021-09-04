import { InputDropdownProps, InputDropdownPropTypes } from "@apptane/react-ui-input";
import PropTypes from "prop-types";

export interface InputDateProps extends Omit<InputDropdownProps<Date>, "control"> {
  /**
   * First date in the highlighted range.
   */
  rangeStart?: Date;

  /**
   * First date in the highlighted range.
   */
  rangeEnd?: Date;

  /**
   * If specified indicates that dates before but not including
   * this date are not interactive.
   */
  notBefore?: Date;

  /**
   * If specified indicates that dates after but not including
   * this date are not interactive.
   */
  notAfter?: Date;

  /**
   * Indicates that week should start on Sunday.
   * Otherwise, week starts on Monday.
   */
  weekStartsOnSunday?: boolean;
}

export const InputDatePropTypes = {
  ...InputDropdownPropTypes,
  rangeStart: PropTypes.instanceOf(Date),
  rangeEnd: PropTypes.instanceOf(Date),
  notBefore: PropTypes.instanceOf(Date),
  notAfter: PropTypes.instanceOf(Date),
  weekStartsOnSunday: PropTypes.bool,
};
