import { TriggerOption, TriggerPropTypes } from "@apptane/react-ui-behaviors";
import {
  Color,
  Intent,
  MarginProps,
  MarginPropTypes,
  PaletteTextSlot,
  Placement,
  PositionerBasePropTypes,
  PropTypeIntent,
} from "@apptane/react-ui-core";
import { IconData, IconDataPropTypes } from "@apptane/react-ui-icon";
import { TooltipAppearance } from "@apptane/react-ui-theme";
import { TooltipPropTypes } from "@apptane/react-ui-tooltip";
import PropTypes from "prop-types";

export interface CueProps extends MarginProps {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * Header.
   */
  header?: React.ReactNode;

  /**
   * Visual appearance. Defaults to `dark`.
   */
  appearance?: TooltipAppearance;

  /**
   * Preferred placement of the tooltip or popover. Defaults to `top-left`.
   * May be overridden by the positioner if conflicts with the viewport.
   */
  placement?: Placement;

  /**
   * Overrides maximum width specified by the theme.
   */
  maxWidth?: number;

  /**
   * Visual intent. Defaults to `none`.
   * Determines default presentation.
   */
  intent?: Intent;

  /**
   * Trigger options.
   */
  trigger?: TriggerOption | TriggerOption[];

  /**
   * Color of the icon. Overrides the color specified by `intent`.
   */
  color?: Color | PaletteTextSlot;

  /**
   * Name of the icon. See `Icon` component.
   */
  name?: string;

  /**
   * Vector data of the icon. If specified overrides `iconName` property.
   */
  data?: IconData;

  /**
   * Size of the icon in pixels. Icon has the same width and height.
   * Defaults to 16px.
   */
  size?: number;

  /**
   * Z-index (passed to `Trigger` layer).
   */
  zIndex?: number;

  /**
   * Indicates whether it must be rendered as an inline element.
   */
  inline?: boolean;
}

export const CuePropTypes = {
  ...MarginPropTypes,
  children: PropTypes.any,
  header: PropTypes.any,
  appearance: TooltipPropTypes.appearance,
  placement: PositionerBasePropTypes.placement,
  maxWidth: PropTypes.number,
  intent: PropTypeIntent,
  trigger: TriggerPropTypes.trigger,
  color: PropTypes.string,
  name: PropTypes.string,
  data: IconDataPropTypes,
  size: PropTypes.number,
  zIndex: PropTypes.number,
  inline: PropTypes.bool,
};
