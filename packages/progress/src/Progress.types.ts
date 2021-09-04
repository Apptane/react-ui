import {
  AppearanceProps,
  AppearancePropTypes,
  ContentAlignment,
  ItemValue,
  MarginProps,
  MarginPropTypes,
  PropTypeContentAlignment,
  PropTypeItemValue,
  SelectorGroupProps,
  SelectorGroupPropTypes,
} from "@apptane/react-ui-core";
import { ProgressVisualAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";

export interface ProgressProps<T extends ItemValue>
  extends MarginProps,
    SelectorGroupProps<T>,
    AppearanceProps<ProgressVisualAppearance> {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * Overrides the default width.
   */
  width?: number | string;

  /**
   * Overrides the lead | tail padding between the edge of the component
   * and the first | last item when `alignment = left | right`.
   */
  offset?: number;

  /**
   * Overrides the default spacing between items.
   */
  spacing?: number;

  /**
   * Items alignment. Defaults to `center`.
   */
  alignment?: ContentAlignment;
}

export interface ProgressItemProps<T extends ItemValue> {
  /**
   * Children.
   */
  children?: React.ReactNode;

  /**
   * Value associated with the item.
   */
  value: T;

  /**
   * Indicates whether item must be rendered in a disabled state.
   */
  disabled?: boolean;

  /**
   * Indicates whether item must be rendered in a completed state.
   */
  completed?: boolean;

  /**
   * Indicates whether item must be rendered in an error state.
   * Non-empty string value is used to display the error message.
   */
  error?: boolean | string;
}

const PropTypeBoolOrString = PropTypes.oneOfType([PropTypes.bool, PropTypes.string]);
const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

export const ProgressPropTypes = {
  ...MarginPropTypes,
  ...SelectorGroupPropTypes,
  ...AppearancePropTypes,
  width: PropTypeNumberOrString,
  offset: PropTypes.number,
  spacing: PropTypes.number,
  alignment: PropTypeContentAlignment,
};

export const ProgressItemPropTypes = {
  children: PropTypes.any,
  value: PropTypeItemValue.isRequired,
  disabled: PropTypes.bool,
  completed: PropTypes.bool,
  error: PropTypeBoolOrString,
};
