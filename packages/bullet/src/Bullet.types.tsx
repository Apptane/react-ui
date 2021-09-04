import {
  AppearanceProps,
  AppearancePropTypes,
  Color,
  Intent,
  MarginProps,
  MarginPropTypes,
  PropTypeIntent,
} from "@apptane/react-ui-core";
import { BulletVisualAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";

export interface BulletProps extends MarginProps, AppearanceProps<BulletVisualAppearance> {
  /**
   * Content to decorate.
   */
  children?: React.ReactNode;

  /**
   * Visual intent. Defaults to `none`.
   */
  intent?: Intent;

  /**
   * Overrides the color based on intent.
   */
  color?: Color;

  /**
   * Overrides theme-defined size.
   */
  size?: number;
}

export const BulletPropTypes = {
  ...MarginPropTypes,
  ...AppearancePropTypes,
  intent: PropTypeIntent,
  color: PropTypes.string,
  size: PropTypes.number,
};
