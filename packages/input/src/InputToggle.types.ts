import {
  AppearanceProps,
  AppearancePropTypes,
  CheckBoxProps,
  CheckBoxPropTypes,
  ComponentSize,
  MarginProps,
  MarginPropTypes,
  PropTypeComponentSize,
} from "@apptane/react-ui-core";
import { InputToggleVisualAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";

export interface InputToggleProps extends MarginProps, CheckBoxProps, AppearanceProps<InputToggleVisualAppearance> {
  /**
   * Label to display.
   */
  label?: React.ReactNode;

  /**
   * Additional content to display below label.
   */
  children?: React.ReactNode;

  /**
   * The pre-defined theme sizes. Defaults to `default`.
   * Or a numeric size in pixels.
   */
  size?: ComponentSize | number;

  /**
   * Overrides the default width of the component.
   */
  width?: number | string;

  /**
   * Overrides the default width of the label content.
   */
  labelWidth?: number | string;

  /**
   * Indicates whether it must be rendered as an inline element.
   */
  inline?: boolean;
}

const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
export const InputTogglePropTypes = {
  ...MarginPropTypes,
  ...CheckBoxPropTypes,
  ...AppearancePropTypes,
  label: PropTypes.any,
  children: PropTypes.any,
  size: PropTypes.oneOfType([PropTypeComponentSize, PropTypes.number]),
  width: PropTypeNumberOrString,
  labelWidth: PropTypeNumberOrString,
  inline: PropTypes.bool,
};
