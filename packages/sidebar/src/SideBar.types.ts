import { AppearanceProps, PropTypeColorMode } from "@apptane/react-ui-core";
import { SideBarAppearance, SideBarVisualAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";

export interface SideBarProps extends AppearanceProps<SideBarVisualAppearance, SideBarAppearance> {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * Indicates whether sidebar is collapsed.
   */
  collapsed?: boolean;

  /**
   * Callback invoked when the sidebar transitions
   * between expanded and collapsed states.
   */
  onStateChange?: (collapsed: boolean) => void;

  /**
   * Width of the expanded sidebar.
   */
  expandedWidth: number;

  /**
   * Width of the collapsed sidebar.
   */
  collapsedWidth: number;

  /**
   * Expanded logo content.
   */
  expandedLogo?: React.ReactNode;

  /**
   * Collapsed logo content.
   */
  collapsedLogo?: React.ReactNode;

  /**
   * Duration of the animated transition in milliseconds.
   */
  transitionDuration?: number;
}

export const SideBarPropTypes = {
  colorMode: PropTypeColorMode,
  appearance: PropTypes.oneOf<SideBarAppearance>(["default", "inverted"]),
  collapsed: PropTypes.bool,
  onStateChange: PropTypes.func,
  expandedWidth: PropTypes.number.isRequired,
  collapsedWidth: PropTypes.number.isRequired,
  expandedLogo: PropTypes.any,
  collapsedLogo: PropTypes.any,
  transitionDuration: PropTypes.number,
};
