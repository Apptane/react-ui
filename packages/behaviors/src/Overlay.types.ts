import { MarginProps, MarginPropTypes } from "@apptane/react-ui-core";
import PropTypes from "prop-types";
import { TransitionStatus } from "react-transition-group/Transition";

export type OverlayChildProps = {
  /**
   * A callback function to signal to the overlay that it must close itself.
   */
  close?: () => void;

  /**
   * State of the animated transition.
   */
  transitionState?: TransitionStatus;
};

export interface OverlayProps extends MarginProps {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * Controls component visibility.
   */
  visible?: boolean;

  /**
   * Determines whether backdrop should be rendered.
   * If backdrop is rendered then focus is automatically trapped
   * within the panel. Otherwise, the focus capture should be
   * controlled via `shouldCaptureFocus` property.
   */
  backdrop?: boolean;

  /**
   * Indicates whether focus management is enabled - focus is moved into
   * the component when it is made visible and reverted on close.
   */
  shouldCaptureFocus?: boolean;

  /**
   * Indicates whether the component must be closed when user presses Esc key.
   */
  shouldCloseOnEsc?: boolean;

  /**
   * Indicates whether the component must be closed when user clicks on backdrop.
   */
  shouldCloseOnBackdropClick?: boolean;

  /**
   * Callback invoked when user presses Esc key and `shouldCloseOnEsc` is true.
   */
  onCloseOnEsc?: (close: () => void) => void;

  /**
   * Callback invoked when overlay requests to close itself.
   */
  onClosing?: () => void;

  /**
   * Duration of the animated transition in milliseconds.
   */
  transitionDuration?: number;

  /**
   * Indicates whether body scrolling should be enabled when overlay is visible.
   */
  enableBodyScroll?: boolean;
}

export const OverlayPropTypes = {
  ...MarginPropTypes,
  visible: PropTypes.bool,
  backdrop: PropTypes.bool,
  shouldCaptureFocus: PropTypes.bool,
  shouldCloseOnEsc: PropTypes.bool,
  shouldCloseOnBackdropClick: PropTypes.bool,
  onCloseOnEsc: PropTypes.func,
  onClosing: PropTypes.func,
  transitionDuration: PropTypes.number,
  enableBodyScroll: PropTypes.bool,
};
