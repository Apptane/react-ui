import {
  AppearanceProps,
  AppearancePropTypes,
  BoxDimensionsProps,
  BoxDimensionsPropTypes,
  Color,
  ContentOrientation,
  Intent,
  MarginProps,
  MarginPropTypes,
  PaddingProps,
  PaddingPropTypes,
  PaletteTextSlot,
  PropTypeContentOrientation,
  PropTypeIntent,
} from "@apptane/react-ui-core";
import { IconData, IconDataPropTypes } from "@apptane/react-ui-icon";
import { MediaAlignment, MediaObjectPropTypes } from "@apptane/react-ui-layout";
import { BannerVisualAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";

export interface BannerProps
  extends MarginProps,
    PaddingProps,
    BoxDimensionsProps,
    AppearanceProps<BannerVisualAppearance> {
  /**
   * Content.
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
   * Visual intent. Defaults to `none`.
   * Determines default presentation.
   */
  intent?: Intent;

  /**
   * The orientation of the content. Defaults to `horizontal`.
   */
  orientation?: ContentOrientation;

  /**
   * Indicates that banner should use card style with border.
   * Default is to render as borderless panel.
   */
  card?: boolean;

  /**
   * Alignment of the icon. Defaults to `center`.
   */
  iconAlignment?: MediaAlignment;

  /**
   * Color of the icon. Overrides the color specified by `intent`.
   */
  iconColor?: Color | PaletteTextSlot;

  /**
   * Name of the icon. See `Icon` component.
   */
  iconName?: string;

  /**
   * Vector data of the icon. If specified overrides `iconName` property.
   */
  iconData?: IconData;

  /**
   * Overrides icon size.
   */
  iconSize?: number;
}

export const BannerPropTypes = {
  ...MarginPropTypes,
  ...PaddingPropTypes,
  ...BoxDimensionsPropTypes,
  ...AppearancePropTypes,
  children: PropTypes.any,
  header: PropTypes.any,
  actions: PropTypes.any,
  intent: PropTypeIntent,
  orientation: PropTypeContentOrientation,
  card: PropTypes.bool,
  iconAlignment: MediaObjectPropTypes.alignment,
  iconColor: PropTypes.string,
  iconName: PropTypes.string,
  iconData: IconDataPropTypes,
  iconSize: PropTypes.number,
};
