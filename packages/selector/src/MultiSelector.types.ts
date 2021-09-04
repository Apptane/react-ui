import { ItemValue, PropTypeItemValue } from "@apptane/react-ui-core";
import { InputBoxProps, InputBoxPropTypes } from "@apptane/react-ui-input";
import PropTypes from "prop-types";

export interface MultiSelectorProps<T extends ItemValue>
  extends Omit<InputBoxProps, "empty" | "glyph" | "theme" | "control" | "cursor"> {
  /**
   * Indicates whether default focus must be set to the input element.
   */
  autoFocus?: boolean;

  /**
   * An optional function to format display value. By default the display value
   * represents number of selected items.
   */
  formatValue?: (value?: T[]) => string;

  /**
   * Currently bound value.
   */
  value?: T[];

  /**
   * Callback invoked when `value` changes.
   */
  onChange?: (value: T[]) => void;
}

export interface MultiSelectorItemProps<T extends ItemValue> {
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

export const MultiSelectorPropTypes = {
  ...InputBoxPropTypes,
  autoFocus: PropTypes.bool,
  formatValue: PropTypes.func,
  value: PropTypes.arrayOf(PropTypeItemValue),
  onChange: PropTypes.func,
};

export const MultiSelectorItemPropTypes = {
  value: PropTypeItemValue.isRequired,
  disabled: PropTypes.bool,
};
