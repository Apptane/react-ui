import PropTypes from "prop-types";
import { ItemValue, PropTypeItemValue } from "./CommonTypes";

/**
 * Base properties common to all controls bound to value.
 */
export interface ValueBoundControlProps<T extends ItemValue> {
  /**
   * Indicates disabled state.
   */
  disabled?: boolean;

  /**
   * Currently bound value.
   */
  value?: T;

  /**
   * Callback invoked when bound `value` property changes.
   * @param {*} value - new value
   */
  onChange?: (value?: T) => void;
}

export const ValueBoundControlPropTypes = {
  disabled: PropTypes.bool,
  value: PropTypeItemValue,
  onChange: PropTypes.func,
};
