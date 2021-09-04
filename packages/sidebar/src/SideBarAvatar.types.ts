import { AvatarProps, AvatarPropTypes } from "@apptane/react-ui-avatar";
import { AppearanceProps, PropTypeColorMode } from "@apptane/react-ui-core";
import { SideBarAppearance, SideBarVisualAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";
import { SideBarPropTypes } from "./SideBar.types";

export interface SideBarAvatarProps extends AvatarProps, AppearanceProps<SideBarVisualAppearance, SideBarAppearance> {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * Indicates whether item must be rendered in a disabled state.
   */
  disabled?: boolean;

  /**
   * Indicates whether item must be rendered in a checked (selected) state.
   */
  checked?: boolean;
}

export const SideBarAvatarPropTypes = {
  ...AvatarPropTypes,
  colorMode: PropTypeColorMode,
  appearance: SideBarPropTypes.appearance,
  children: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
};
