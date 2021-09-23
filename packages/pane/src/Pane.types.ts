import {
  AppearanceProps,
  AppearancePropTypes,
  BoxBorderProps,
  BoxBorderPropTypes,
  BoxDimensionsProps,
  BoxDimensionsPropTypes,
  BoxLayoutProps,
  BoxLayoutPropTypes,
  Color,
  Elevation,
  InteractiveProps,
  MarginProps,
  MarginPropTypes,
  PaddingProps,
  PaddingPropTypes,
  PaletteBackgroundSlot,
  PropTypeElevation,
} from "@apptane/react-ui-core";
import { PaneVisualAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";

export type PaneInteractivity = "none" | "shadow" | "border" | "border+shadow";

export interface PaneProps
  extends MarginProps,
    PaddingProps,
    BoxDimensionsProps,
    BoxLayoutProps,
    BoxBorderProps,
    InteractiveProps,
    AppearanceProps<PaneVisualAppearance> {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * The background color. Supports theme palette background names and
   * special `transparent` value for checkered background.
   */
  background?: Color | PaletteBackgroundSlot | "transparent";

  /**
   * Indicates whether striped background style must be used.
   */
  striped?: boolean;

  /**
   * The elevation level.
   */
  elevation?: Elevation;

  /**
   * Indicates whether pane must use inline style instead of block.
   */
  inline?: boolean;

  /**
   * Overrides default z-index.
   */
  zIndex?: number;

  /**
   * Indicates whether pane must use animated transitions.
   */
  animated?: boolean;

  /**
   * Indicates whether pane can be interacted with (via mouse or keyboard)
   * and the visual appearance of the interactive state.
   */
  interactivity?: PaneInteractivity;

  /**
   * Indicates whether pane can receive focus.
   */
  focusable?: boolean;

  /**
   * Duration of the animated transition in milliseconds.
   */
  transitionDuration?: number;

  /**
   * Indicates whether to scroll content vertically on overflow.
   */
  scrollOnOverflow?: boolean;

  /**
   * Overrides overflow. Defaults to 'visible'.
   */
  overflow?: string;

  /**
   * Overrides accessibility role.
   */
  accessibilityRole?: string;

  /**
   * Custom styles.
   */
  style?: React.CSSProperties;
}

export const PanePropTypes = {
  ...MarginPropTypes,
  ...PaddingPropTypes,
  ...BoxBorderPropTypes,
  ...BoxDimensionsPropTypes,
  ...BoxLayoutPropTypes,
  ...AppearancePropTypes,
  children: PropTypes.any,
  background: PropTypes.string,
  striped: PropTypes.bool,
  elevation: PropTypeElevation,
  inline: PropTypes.bool,
  zIndex: PropTypes.number,
  animated: PropTypes.bool,
  interactivity: PropTypes.oneOf(["none", "shadow", "border", "border+shadow"]),
  focusable: PropTypes.bool,
  transitionDuration: PropTypes.number,
  scrollOnOverflow: PropTypes.bool,
  overflow: PropTypes.string,
  accessibilityRole: PropTypes.string,
  style: PropTypes.object,
};
