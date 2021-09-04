import {
  AppearancePropTypes,
  ButtonBasePropTypes,
  ItemValue,
  MarginPropTypes,
  ToggleButtonProps,
} from "@apptane/react-ui-core";
import { RadioButtonVisualAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";

export interface RadioButtonProps<T extends ItemValue>
  extends ToggleButtonProps<T, RadioButtonVisualAppearance, string> {
  /**
   * Label to display.
   */
  label?: React.ReactNode;

  /**
   * Additional content to display below label.
   */
  children?: React.ReactNode;

  /**
   * Overrides the default width of the component.
   */
  width?: number | string;

  /**
   * Overrides the default width of the label content.
   */
  labelWidth?: number | string;

  /**
   * Indicates whether control must be rendered in a readonly state.
   * The presentation is the same as in the default state, but
   * the control is not interactive.
   */
  readonly?: boolean;
}

const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
export const RadioButtonPropTypes = {
  ...MarginPropTypes,
  ...ButtonBasePropTypes,
  ...AppearancePropTypes,
  label: PropTypes.any,
  children: PropTypes.any,
  width: PropTypeNumberOrString,
  labelWidth: PropTypeNumberOrString,
  readonly: PropTypes.bool,
};
