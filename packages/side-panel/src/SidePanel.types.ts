import { OverlayProps, OverlayPropTypes } from "@apptane/react-ui-behaviors";
import { AppearanceProps, AppearancePropTypes } from "@apptane/react-ui-core";
import { PaneProps, PanePropTypes } from "@apptane/react-ui-pane";
import { SidePanelVisualAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";

export type SidePanelEdge = "top" | "right" | "bottom" | "left";

export interface SidePanelProps
  extends OverlayProps,
    Omit<
      PaneProps,
      | "appearance"
      | "height"
      | "h"
      | "minHeight"
      | "minH"
      | "maxHeight"
      | "maxH"
      | "width"
      | "w"
      | "minWidth"
      | "minW"
      | "maxWidth"
      | "maxW"
      | "elevation"
      | "inline"
      | "zIndex"
      | "animated"
      | "interactive"
    >,
    AppearanceProps<SidePanelVisualAppearance> {
  /**
   * Size of the panel.
   * This property controls panel width or height depending on the `side`.
   */
  size: number | string;

  /**
   * Side to display the panel on.
   */
  side: SidePanelEdge;

  /**
   * Indicates whether close button must be visible.
   */
  closeButtonVisible?: boolean;
}

const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
export const SidePanelPropTypes = {
  ...OverlayPropTypes,
  ...PanePropTypes,
  ...AppearancePropTypes,
  size: PropTypeNumberOrString,
  side: PropTypes.oneOf<SidePanelEdge>(["top", "right", "bottom", "left"]).isRequired,
  closeButtonVisible: PropTypes.bool,
};
