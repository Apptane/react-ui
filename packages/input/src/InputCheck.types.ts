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
import { InputCheckVisualAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";

export interface InputCheckProps extends MarginProps, CheckBoxProps, AppearanceProps<InputCheckVisualAppearance> {
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

  /**
   * Indicates whether control is allowed to be in indeterminate state
   * represented by non-boolean `value` value. onChange is passed `undefined`
   * as a representation of indeterminate state.
   */
  indeterminateAllowed?: boolean;
}

const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
export const InputCheckPropTypes = {
  ...MarginPropTypes,
  ...CheckBoxPropTypes,
  ...AppearancePropTypes,
  label: PropTypes.any,
  children: PropTypes.any,
  size: PropTypes.oneOfType([PropTypeComponentSize, PropTypes.number]),
  width: PropTypeNumberOrString,
  labelWidth: PropTypeNumberOrString,
  inline: PropTypes.bool,
  indeterminateAllowed: PropTypes.bool,
};
