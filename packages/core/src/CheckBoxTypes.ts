import PropTypes from "prop-types";

/**
 * Base properties common to all components implementing
 * checkbox-like behavior.
 */
export interface CheckBoxProps {
  /**
   * Indicates whether control must be rendered in a disabled state.
   */
  disabled?: boolean;

  /**
   * Indicates whether control must be rendered in a readonly state.
   * The presentation is the same as in the default state, but
   * the control is not interactive.
   */
  readonly?: boolean;

  /**
   * Currently bound value.
   */
  value?: boolean;

  /**
   * Callback invoked when `value` changes.
   */
  onChange?: (newValue?: boolean, oldValue?: boolean) => void;
}

export const CheckBoxPropTypes = {
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  value: PropTypes.bool,
  onChange: PropTypes.func,
};
