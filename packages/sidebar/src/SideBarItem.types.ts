import {
  AppearanceProps,
  Color,
  Intent,
  PaletteTextSlot,
  PropTypeColorMode,
  PropTypeIntent,
} from "@apptane/react-ui-core";
import { IconData, IconDataPropTypes } from "@apptane/react-ui-icon";
import { SideBarAppearance, SideBarVisualAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";
import { SideBarPropTypes } from "./SideBar.types";

export interface SideBarItemProps extends AppearanceProps<SideBarVisualAppearance, SideBarAppearance> {
  /**
   * Sub-items.
   */
  children?: React.ReactNode;

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
   * Defaults to `content`.
   */
  tooltipContent?: React.ReactNode;

  /**
   * Visual intent. Defaults to `none`.
   */
  intent?: Intent;

  /**
   * Badge value to display after the content.
   */
  badge?: number | string;

  /**
   * Indicates whether item must be rendered in a disabled state.
   */
  disabled?: boolean;

  /**
   * Indicates whether item must be rendered in a checked (selected) state.
   */
  checked?: boolean;

  /**
   * Callback invoked when item is clicked.
   */
  onClick?: () => void;

  /**
   * Name of the icon to render before the icon's content.
   * Must be a name supported by `Icon` component.
   */
  iconName?: string;

  /**
   * Vector data of the icon to render before the icon's content.
   * See `Icon` component for details.
   */
  iconData?: IconData;

  /**
   * Size of the icon in pixels. Icon has the same width and height.
   * If not specified icon size defaults to 24 pixels.
   */
  iconSize?: number;

  /**
   * Overrides the color of the icon.
   */
  iconColor?: Color | PaletteTextSlot;
}

const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
export const SideBarItemPropTypes = {
  colorMode: PropTypeColorMode,
  appearance: SideBarPropTypes.appearance,
  content: PropTypes.any,
  collapsedContent: PropTypes.any,
  intent: PropTypeIntent,
  badge: PropTypeNumberOrString,
  height: PropTypes.number,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onClick: PropTypes.func,
  iconName: PropTypes.string,
  iconData: IconDataPropTypes,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
};
