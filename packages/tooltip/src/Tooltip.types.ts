import { AppearanceProps, Placement, PositionerBasePropTypes, PropTypeColorMode } from "@apptane/react-ui-core";
import { TooltipAppearance, TooltipVisualAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";

export interface TooltipProps extends AppearanceProps<TooltipVisualAppearance, TooltipAppearance> {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * Header.
   */
  header?: React.ReactNode;

  /**
   * Preferred placement of the tooltip.
   * May be overridden by the positioner if conflicts with the viewport.
   */
  placement?: Placement;

  /**
   * Indicates whether tooltip is displayed with an arrow.
   */
  arrowVisible?: boolean;

  /**
   * Overrides maximum width specified by the theme.
   */
  maxWidth?: number;
}

export const TooltipPropTypes = {
  children: PropTypes.any,
  header: PropTypes.any,
  colorMode: PropTypeColorMode,
  appearance: PropTypes.oneOf<TooltipAppearance>(["default", "inverted"]),
  placement: PositionerBasePropTypes.placement,
  arrowVisible: PropTypes.bool,
  maxWidth: PropTypes.number,
};
