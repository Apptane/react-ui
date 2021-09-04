import {
  AppearanceProps,
  AppearancePropTypes,
  BoxLayoutPropTypes,
  Color,
  ComponentSize,
  ContentHorizontalAlignment,
  Intent,
  PaddingProps,
  PaddingPropTypes,
  PaletteBackgroundSlot,
  PaletteBorderSlot,
  PropTypeComponentSize,
  PropTypeIntent,
} from "@apptane/react-ui-core";
import { SpinnerPropTypes } from "@apptane/react-ui-spinner";
import { DialogKind, DialogVisualAppearance, SpinnerAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";

export interface DialogProps extends PaddingProps, AppearanceProps<DialogVisualAppearance> {
  /**
   * Kind. Defaults to `default`.
   */
  kind?: DialogKind;

  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * Hero image content.
   */
  heroImage?: React.ReactNode;

  /**
   * Header content.
   */
  header?: React.ReactNode;

  /**
   * Description content.
   */
  description?: React.ReactNode;

  /**
   * Overrides default width of the dialog box.
   */
  width?: number | string;

  /**
   * Visual intent. Defaults to `none`.
   * Applies to style of confirmation button.
   */
  intent?: Intent;

  /**
   * Overrides cancel button content.
   */
  cancelButtonContent?: React.ReactNode;

  /**
   * Overrides confirmation button content.
   */
  confirmButtonContent?: React.ReactNode;

  /**
   * Indicates whether confirmation button must be rendered in a disabled state.
   */
  confirmButtonDisabled?: boolean;

  /**
   * Indicates whether confirmation button must be rendered with an active spinner
   * indicating operation is in progress.
   */
  confirmButtonSpinner?: SpinnerAppearance | boolean;

  /**
   * Indicates whether close button must be visible.
   */
  closeButtonVisible?: boolean;

  /**
   * Indicates whether cancel button must be visible.
   */
  cancelButtonVisible?: boolean;

  /**
   * Indicates whether confirm button must be visible.
   */
  confirmButtonVisible?: boolean;

  /**
   * Size of the buttons.
   */
  buttonSize?: ComponentSize | number;

  /**
   * Alignment of the buttons.
   */
  buttonAlignment?: ContentHorizontalAlignment;

  /**
   * Callback invoked when confirmation button is clicked.
   * Passed a function argument that can be used to close the dialog.
   */
  onConfirm?: (close?: () => void) => void;

  /**
   * Callback invoked when cancellation button is clicked.
   * Passed a function argument that can be used to close the dialog.
   */
  onCancel?: (close?: () => void) => void;

  /**
   * The background color. Supports theme palette background names and
   * special "transparent" value for checkered background.
   */
  background?: Color | PaletteBackgroundSlot;

  /**
   * The border. Supports theme palette border names or boolean value
   * indicating whether all borders must be invisible (false) or default
   * border must be visible (true). If this property is specified it takes
   * precedence over specific side borders.
   */
  border?: boolean | Color | PaletteBorderSlot;

  /**
   * Indicates whether dialog must be centered within the screen.
   */
  centered?: boolean;

  /**
   * Indicates whether dialog must use animated transitions.
   */
  animated?: boolean;

  /**
   * Duration of the animated transition in milliseconds.
   */
  transitionDuration?: number;
}

const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
const PropTypeBoolOrString = PropTypes.oneOfType([PropTypes.bool, PropTypes.string]);

export const DialogPropTypes = {
  ...PaddingPropTypes,
  ...AppearancePropTypes,
  kind: PropTypes.oneOf<DialogKind>(["default", "hero"]),
  heroImage: PropTypes.any,
  header: PropTypes.any,
  description: PropTypes.any,
  width: PropTypeNumberOrString,
  intent: PropTypeIntent,
  cancelButtonContent: PropTypes.node,
  confirmButtonContent: PropTypes.node,
  confirmButtonDisabled: PropTypes.bool,
  confirmButtonSpinner: PropTypes.oneOfType([SpinnerPropTypes.appearance, PropTypes.bool]),
  closeButtonVisible: PropTypes.bool,
  cancelButtonVisible: PropTypes.bool,
  confirmButtonVisible: PropTypes.bool,
  buttonSize: PropTypes.oneOfType([PropTypeComponentSize, PropTypes.number]),
  buttonAlignment: BoxLayoutPropTypes.horizontalAlignment,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  background: PropTypes.string,
  border: PropTypeBoolOrString,
  centered: PropTypes.bool,
  animated: PropTypes.bool,
  transitionDuration: PropTypes.number,
};
