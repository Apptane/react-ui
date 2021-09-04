import PropTypes from "prop-types";
import { ComponentSize, ItemValue, PropTypeComponentSize, PropTypeItemValue } from "./CommonTypes";
import { MarginProps } from "./MarginTypes";
import { AppearanceProps } from "./ThemeTypes";

/**
 * Base properties common to all components implementing
 * button-like behavior.
 */
export interface ButtonBaseProps<T extends ItemValue, VisualAppearance, Appearance = void>
  extends AppearanceProps<VisualAppearance, Appearance> {
  /**
   * The pre-defined theme sizes. Defaults to `default`.
   * Or a numeric size in pixels.
   */
  size?: ComponentSize | number;

  /**
   * Indicates whether button must be rendered in a disabled state.
   */
  disabled?: boolean;

  /**
   * Indicates whether button must be rendered in a checked (selected) state.
   */
  checked?: boolean;

  /**
   * Callback invoked when button is clicked.
   */
  onClick?: (event: React.SyntheticEvent, value?: T) => void;

  /**
   * Value associated with the button in the `ToggleGroup`.
   */
  value?: T;

  /**
   * Indicates whether it must be rendered as an inline element.
   */
  inline?: boolean;

  /**
   * Accessibility label (visually hidden text for screen readers).
   */
  accessibilityLabel?: string;

  /**
   * Overrides default accessibility role.
   */
  accessibilityRole?: string;
}

export const ButtonBasePropTypes = {
  size: PropTypes.oneOfType([PropTypeComponentSize, PropTypes.number]),
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onClick: PropTypes.func,
  value: PropTypeItemValue,
  inline: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
  accessibilityRole: PropTypes.string,
};

export interface ToggleButtonProps<T extends ItemValue, VisualAppearance, Appearance = void>
  extends ButtonBaseProps<T, VisualAppearance, Appearance>,
    MarginProps {
  width?: number | string;
}
