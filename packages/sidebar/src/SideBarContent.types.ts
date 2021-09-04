import { ColorMode, MarginProps, MarginPropTypes, PropTypeColorMode } from "@apptane/react-ui-core";
import PropTypes from "prop-types";

export interface SideBarContentProps extends MarginProps {
  /**
   * Content to render in the expanded state.
   */
  content?: React.ReactNode;

  /**
   * Content to render in the collapsed state.
   */
  collapsedContent?: React.ReactNode;

  /**
   * Content to render in the tooltip in the collapsed state.
   */
  tooltipContent?: React.ReactNode;

  /**
   * Overrides the color mode.
   * Default is to use globally set theme color mode or fallback to `light`.
   */
  colorMode?: ColorMode;
}

export const SideBarContentPropTypes = {
  ...MarginPropTypes,
  content: PropTypes.node,
  collapsedContent: PropTypes.node,
  tooltipContent: PropTypes.node,
  colorMode: PropTypeColorMode,
};
