import { ItemValue, PropTypeItemValue } from "@apptane/react-ui-core";
import { InputBoxProps, InputBoxPropTypes } from "@apptane/react-ui-input";
import PropTypes from "prop-types";

export interface SelectorProps<T extends ItemValue>
  extends Omit<InputBoxProps, "empty" | "glyph" | "theme" | "control" | "cursor"> {
  /**
   * Indicates whether default focus must be set to the input element.
   */
  autoFocus?: boolean;

  /**
   * An optional function to format display value. By default the display value
   * is extracted from the content of the currently selected item.
   */
  formatValue?: (value?: T) => string;

  /**
   * Currently bound value.
   */
  value?: T;

  /**
   * Callback invoked when `value` changes.
   */
  onChange?: (value: T) => void;

  /**
   * Indicates whether item's `value` property should be treated
   * as numeric and converted to number before passing it to onChange.
   */
  numeric?: boolean;
}

export interface SelectorItemProps<T extends ItemValue> {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * Item value.
   */
  value: T;

  /**
   * Indicates whether item represents a disabled option.
   */
  disabled?: boolean;
}

export const SelectorPropTypes = {
  ...InputBoxPropTypes,
  autoFocus: PropTypes.bool,
  formatValue: PropTypes.func,
  value: PropTypeItemValue,
  onChange: PropTypes.func,
  numeric: PropTypes.bool,
};

export const SelectorItemPropTypes = {
  value: PropTypeItemValue.isRequired,
  disabled: PropTypes.bool,
};
