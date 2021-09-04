import { AppearanceProps, PropTypeColorMode } from "@apptane/react-ui-core";
import { SideBarAppearance, SideBarVisualAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";
import { SideBarPropTypes } from "./SideBar.types";

export interface SideBarGroupProps extends AppearanceProps<SideBarVisualAppearance, SideBarAppearance> {
  /**
   * Items.
   */
  children?: React.ReactNode;

  /**
   * Header.
   */
  header?: React.ReactNode;

  /**
   * Actions.
   */
  actions?: React.ReactNode;

  /**
   * Top margin in pixels.
   */
  marginTop?: number;

  /**
   * Bottom margin in pixels.
   */
  marginBottom?: number;

  /**
   * Height of the group.
   */
  height?: number | string;

  /**
   * Indicates that the group should stretch to occupy
   * all available space.
   */
  stretch?: boolean;
}

const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
export const SideBarGroupPropTypes = {
  colorMode: PropTypeColorMode,
  appearance: SideBarPropTypes.appearance,
  header: PropTypes.any,
  actions: PropTypes.any,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  height: PropTypeNumberOrString,
  stretch: PropTypes.bool,
};
