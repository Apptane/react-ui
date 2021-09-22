import {
  AppearanceProps,
  AppearancePropTypes,
  ComponentSize,
  ContentAlignment,
  ItemValue,
  MarginProps,
  MarginPropTypes,
  PropTypeComponentSize,
  PropTypeContentAlignment,
  PropTypeItemValue,
  SelectorGroupProps,
  SelectorGroupPropTypes,
} from "@apptane/react-ui-core";
import { TabsVisualAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";

export interface TabsProps<T extends ItemValue>
  extends MarginProps,
    SelectorGroupProps<T>,
    AppearanceProps<TabsVisualAppearance> {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * The pre-defined theme sizes. Defaults to `default`.
   * Or a numeric size in pixels.
   */
  size?: ComponentSize | number;

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
   * Tabs alignment. Defaults to `center`.
   */
  alignment?: ContentAlignment;

  /**
   * Indicates whether a common bottom border must be rendered.
   */
  border?: boolean;
}

export interface TabItemProps<T extends ItemValue> {
  /**
   * Children.
   */
  children?: React.ReactNode;

  /**
   * Value associated with the tab item.
   */
  value?: T;

  /**
   * Indicates whether tab must be rendered in a disabled state.
   */
  disabled?: boolean;
}

const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
export const TabsPropTypes = {
  ...MarginPropTypes,
  ...SelectorGroupPropTypes,
  ...AppearancePropTypes,
  size: PropTypes.oneOfType([PropTypeComponentSize, PropTypes.number]),
  width: PropTypeNumberOrString,
  offset: PropTypes.number,
  spacing: PropTypes.number,
  alignment: PropTypeContentAlignment,
  border: PropTypes.bool,
};

export const TabItemPropTypes = {
  children: PropTypes.any,
  value: PropTypeItemValue,
  disabled: PropTypes.bool,
};
