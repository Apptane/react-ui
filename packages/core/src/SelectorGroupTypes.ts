import PropTypes from "prop-types";
import { ItemValue, PropTypeItemValue } from "./CommonTypes";

/**
 * Base properties common to all components implementing
 * selector/toggle group behavior.
 *
 * Typical components are: radio button group, toggle group, tabs.
 */
export interface SelectorGroupProps<T extends ItemValue> {
  /**
   * Indicates whether entire group is disabled, including all child items.
   */
  disabled?: boolean;

  /**
   * Current bound value.
   * This property matches selected child item `value` property.
   */
  value?: T;

  /**
   * Callback invoked when bound `value` property changes.
   * @param {*} value - new value
   */
  onChange?: (value?: T) => void;

  /**
   * Callback invoked when user clicks one of the child items.
   * @param {*} value - `value` property associated with the clicked item
   */
  onItemClick?: (value?: T) => void;
}

export const SelectorGroupPropTypes = {
  disabled: PropTypes.bool,
  value: PropTypeItemValue,
  onChange: PropTypes.func,
  onItemClick: PropTypes.func,
};
