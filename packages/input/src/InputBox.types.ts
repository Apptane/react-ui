import {
  AppearanceProps,
  ComponentSize,
  ContentAlignment,
  MarginProps,
  MarginPropTypes,
  PropTypeColorMode,
  PropTypeContentAlignment,
} from "@apptane/react-ui-core";
import { IconData, IconDataPropTypes } from "@apptane/react-ui-icon";
import {
  InputBoxAppearance,
  InputBoxErrorAppearance,
  InputBoxKind,
  InputBoxVisualAppearance,
} from "@apptane/react-ui-theme";
import PropTypes from "prop-types";

export interface InputBoxProps extends MarginProps, AppearanceProps<InputBoxVisualAppearance, InputBoxAppearance> {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * Embedded control component rendered outside of the content area.
   * Typically used to create hidden overlay control.
   */
  control?: React.ReactNode;

  /**
   * Kind. Defaults to `default`.
   */
  kind?: InputBoxKind;

  /**
   * The pre-defined theme sizes. Defaults to `default`.
   * Or a numeric size in pixels.
   */
  size?: ComponentSize | number | "auto";

  /**
   * Overrides the default width. The default is 100%.
   */
  width?: number | string;

  /**
   * Flex layout behavior.
   */
  flex?: string;

  /**
   * Content alignment. Defaults to `left`.
   */
  alignment?: ContentAlignment;

  /**
   * Overrides default cursor.
   */
  cursor?: string;

  /**
   * Indicates whether control must be rendered in a disabled state.
   */
  disabled?: boolean;

  /**
   * Indicates whether control must be rendered in a read-only state.
   */
  readonly?: boolean;

  /**
   * Indicates whether control must be rendered in a focused state.
   */
  focused?: boolean;

  /**
   * Indicates whether control must be rendered in an empty state.
   */
  empty?: boolean;

  /**
   * Indicates whether control must be rendered in an error state.
   * Non-empty string value is used to display the error message.
   */
  error?: boolean | string;

  /**
   * Error information appearance. Defaults to `glyph`.
   */
  errorAppearance?: InputBoxErrorAppearance;

  /**
   * Embedded label.
   */
  label?: string;

  /**
   * Embedded glyph name.
   */
  glyph?: string;

  /**
   * Embedded content placed to the left of the input area.
   */
  embedLeft?: React.ReactNode;

  /**
   * Embedded content placed to the right of the input area.
   */
  embedRight?: React.ReactNode;

  /**
   * Name of the icon to render before the input's content.
   * Must be a name supported by `Icon` component.
   */
  iconBeforeName?: string;

  /**
   * Vector data of the icon to render before the input's content.
   * See `Icon` component for details.
   */
  iconBeforeData?: IconData;

  /**
   * Name of the icon to render after the input's content.
   * Must be a name supported by `Icon` component.
   */
  iconAfterName?: string;

  /**
   * Vector data of the icon to render after the input's content.
   * See `Icon` component for details.
   */
  iconAfterData?: IconData;

  /**
   * Indicates whether it must be rendered as an inline element.
   */
  inline?: boolean;
}

const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
const PropTypeBoolOrString = PropTypes.oneOfType([PropTypes.bool, PropTypes.string]);

export const InputBoxPropTypes = {
  ...MarginPropTypes,
  colorMode: PropTypeColorMode,
  appearance: PropTypes.oneOfType([PropTypes.oneOf<InputBoxAppearance>(["default", "embedded"]), PropTypes.func]),
  size: PropTypes.oneOfType([
    PropTypes.oneOf<ComponentSize | "auto">(["default", "small", "medium", "large", "auto"]),
    PropTypes.number,
  ]),
  width: PropTypeNumberOrString,
  flex: PropTypes.string,
  alignment: PropTypeContentAlignment,
  cursor: PropTypes.string,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  focused: PropTypes.bool,
  error: PropTypeBoolOrString,
  errorAppearance: PropTypes.oneOf<InputBoxErrorAppearance>(["none", "glyph", "hint", "both"]),
  label: PropTypes.string,
  glyph: PropTypes.string,
  embedLeft: PropTypes.node,
  embedRight: PropTypes.node,
  iconBeforeName: PropTypes.string,
  iconBeforeData: IconDataPropTypes,
  iconAfterName: PropTypes.string,
  iconAfterData: IconDataPropTypes,
  inline: PropTypes.bool,
};
