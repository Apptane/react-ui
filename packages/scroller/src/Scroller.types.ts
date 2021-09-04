import {
  AppearanceProps,
  AppearancePropTypes,
  MarginProps,
  MarginPropTypes,
  PaddingProps,
  PaddingPropTypes,
} from "@apptane/react-ui-core";
import { ScrollerVisualAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";

export interface ScrollerProps extends MarginProps, PaddingProps, AppearanceProps<ScrollerVisualAppearance> {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * Fixed width of the scroller container in pixels.
   */
  width?: number;

  /**
   * Fixed height of the scroller container in pixels.
   */
  height?: number;

  /**
   * Maximum width of the scroller container in pixels.
   */
  maxWidth?: number;

  /**
   * Maximum height of the scroller container in pixels.
   */
  maxHeight?: number;

  /**
   * Indicates whether top and/or bottom shadow must be visible.
   */
  shadow?: boolean;

  /**
   * Provides a way to set initial or change current
   * horizontal scroll position.
   */
  scrollOffsetX?: number;

  /**
   * Provides a way to set initial or change current
   * vertical scroll position.
   */
  scrollOffsetY?: number;

  /**
   * Callback invoked when the horizontal scroll offset changes.
   * Passed new horizontal offset value as an argument.
   */
  onScrollX?: (offset: number) => void;

  /**
   * Callback invoked when the vertical scroll offset changes.
   * Passed new vertical offset value as an argument.
   */
  onScrollY?: (offset: number) => void;
}

export const ScrollerPropTypes = {
  ...MarginPropTypes,
  ...PaddingPropTypes,
  ...AppearancePropTypes,
  width: PropTypes.number,
  height: PropTypes.number,
  maxWidth: PropTypes.number,
  maxHeight: PropTypes.number,
  shadow: PropTypes.bool,
  scrollOffsetX: PropTypes.number,
  scrollOffsetY: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  onScrollX: PropTypes.func,
  onScrollY: PropTypes.func,
};
