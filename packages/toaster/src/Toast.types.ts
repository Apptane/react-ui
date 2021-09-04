import {
  AppearanceProps,
  Color,
  Direction,
  Intent,
  PaletteTextSlot,
  PropTypeColorMode,
  PropTypeIntent,
} from "@apptane/react-ui-core";
import { IconData, IconDataPropTypes } from "@apptane/react-ui-icon";
import { ToastAppearance, ToastVisualAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";

export interface ToastProps extends AppearanceProps<ToastVisualAppearance, ToastAppearance> {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * Header.
   */
  header?: React.ReactNode;

  /**
   * Overrides maximum width specified by the theme.
   */
  maxWidth?: number;

  /**
   * Visual intent. Defaults to `none`.
   * Determines default presentation.
   */
  intent?: Intent;

  /**
   * Color of the icon. Overrides the color specified by `intent`.
   */
  iconColor?: Color | PaletteTextSlot;

  /**
   * Name of the icon. See `Icon` component.
   */
  iconName?: string;

  /**
   * Vector data of the icon. If specified overrides `iconName` property.
   */
  iconData?: IconData;

  /**
   * Overrides icon size.
   */
  iconSize?: number;

  /**
   * Callback invoked when the action button is clicked.
   * By default toast hides itself afterwards, unless
   * the action callback return value is `truthy`.
   */
  onAction?: () => boolean | undefined;

  /**
   * Content of the action button. Defaults to "Hide".
   */
  actionContent?: React.ReactNode;

  /**
   * Indicates whether action block should be hidden.
   */
  actionHidden?: boolean;

  /**
   * Controls visibility of the toast.
   * This property is used internally to signal the toast that it must hide
   * itself when `visible = false`.
   */
  visible?: boolean;

  /**
   * Overrides the default z-index.
   */
  zIndex?: number;

  /**
   * Duration of the toast in seconds before it automatically disappears.
   * 0 or -1 to show indefinitely until it is manually closed.
   */
  duration?: number;

  /**
   * Callback invoked when the toast becomes closed.
   */
  onClosed?: () => void;

  /**
   * Animation direction. Defaults to `down`.
   */
  animationDirection?: Direction;
}

export const ToastPropTypes = {
  children: PropTypes.any,
  header: PropTypes.any,
  colorMode: PropTypeColorMode,
  appearance: PropTypes.oneOf<ToastAppearance>(["default", "inverted"]),
  maxWidth: PropTypes.number,
  intent: PropTypeIntent,
  iconColor: PropTypes.string,
  iconName: PropTypes.string,
  iconData: IconDataPropTypes,
  iconSize: PropTypes.number,
  onAction: PropTypes.func,
  actionContent: PropTypes.any,
  actionHidden: PropTypes.bool,
  visible: PropTypes.bool,
  zIndex: PropTypes.number,
  duration: PropTypes.number,
  onClosed: PropTypes.func,
  animationDirection: PropTypes.oneOf<Direction>(["up", "down"]),
};
