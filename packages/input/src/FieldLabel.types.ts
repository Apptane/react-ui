import { AppearanceProps, AppearancePropTypes, MarginProps, MarginPropTypes } from "@apptane/react-ui-core";
import { FieldLabelVisualAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";

export interface FieldLabelProps extends MarginProps, AppearanceProps<FieldLabelVisualAppearance> {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * Overrides the default width.
   */
  width?: number | string;

  /**
   * Indicates whether label must be rendered in a disabled state.
   */
  disabled?: boolean;

  /**
   * Indicates whether label must be rendered in a readonly state.
   */
  readonly?: boolean;

  /**
   * Indicates whether label must be rendered in an error state.
   */
  error?: boolean;

  /**
   * Indicates whether it must be rendered as a block element.
   */
  block?: boolean;

  /**
   * Field name to pass to `htmlFor` attribute.
   */
  name?: string;

  /**
   * Callback invoked on click.
   */
  onClick?: (event: React.SyntheticEvent) => void;
}

const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
export const FieldLabelPropTypes = {
  ...MarginPropTypes,
  ...AppearancePropTypes,
  children: PropTypes.any,
  width: PropTypeNumberOrString,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  error: PropTypes.bool,
  block: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func,
};
