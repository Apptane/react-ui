import {
  AppearanceProps,
  AppearancePropTypes,
  CheckBoxProps,
  CheckBoxPropTypes,
  ContentAlignment,
  MarginProps,
  MarginPropTypes,
  PropTypeContentAlignment,
} from "@apptane/react-ui-core";
import { DividerVisualAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";

export interface DividerProps extends MarginProps, CheckBoxProps, AppearanceProps<DividerVisualAppearance> {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * Overrides the default width.
   */
  width?: number | string;

  /**
   * Content alignment. Defaults to `center`.
   */
  alignment?: ContentAlignment;
}

const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
export const DividerPropTypes = {
  ...MarginPropTypes,
  ...CheckBoxPropTypes,
  ...AppearancePropTypes,
  children: PropTypes.any,
  width: PropTypeNumberOrString,
  alignment: PropTypeContentAlignment,
  interactive: PropTypes.bool,
};
