import {
  ButtonBasePropTypes,
  ContentAlignment,
  Intent,
  ItemValue,
  MarginPropTypes,
  PropTypeColorMode,
  PropTypeContentAlignment,
  PropTypeIntent,
  ToggleButtonProps,
} from "@apptane/react-ui-core";
import { IconData, IconDataPropTypes } from "@apptane/react-ui-icon";
import { SpinnerPropTypes } from "@apptane/react-ui-spinner";
import { ButtonAppearance, ButtonVisualAppearance, SpinnerAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";

export interface ButtonProps<T extends ItemValue>
  extends ToggleButtonProps<T, ButtonVisualAppearance, ButtonAppearance> {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * Badge value to display after the content when the button is not disabled.
   */
  badge?: number | string;

  /**
   * Overrides the default width.
   */
  width?: number | string;

  /**
   * Visual intent. Defaults to `none`.
   */
  intent?: Intent;

  /**
   * Content alignment. Defaults to `center`.
   */
  alignment?: ContentAlignment;

  /**
   * Overrides theme-defined left and right padding in pixels.
   */
  padding?: number;

  /**
   * Indicates whether button must be rendered in a disabled state with
   * active spinner indicating operation is in progress.
   */
  spinner?: SpinnerAppearance | boolean;

  /**
   * Name of the icon to render after the button's content.
   * Must be a name supported by `Icon` component.
   */
  iconAfterName?: string;

  /**
   * Vector data of the icon to render after the button's content.
   * See `Icon` component for details.
   */
  iconAfterData?: IconData;

  /**
   * Name of the icon to render before the button's content.
   * Must be a name supported by `Icon` component.
   */
  iconBeforeName?: string;

  /**
   * Vector data of the icon to render before the button's content.
   * See `Icon` component for details.
   */
  iconBeforeData?: IconData;

  /**
   * Name of the icon to render as the button's content.
   * Must be a name supported by `Icon` component.
   */
  iconName?: string;

  /**
   * Vector data of the icon to render as the button's content.
   * See `Icon` component for details.
   */
  iconData?: IconData;

  /**
   * Size of the icon in pixels. Icon has the same width and height.
   * If not specified icon size defaults to 24 pixels.
   */
  iconSize?: number;

  /**
   * Indicates whether button must be rendered with round border.
   */
  round?: boolean;

  /**
   * Indicates whether default focus must be set to the button element.
   */
  autoFocus?: boolean;

  /**
   * Tooltip content.
   */
  tooltip?: React.ReactNode;

  /**
   * Prevents default processing of captured `click` events.
   */
  preventDefault?: boolean;
}

const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
export const ButtonPropTypes = {
  ...MarginPropTypes,
  ...ButtonBasePropTypes,
  children: PropTypes.any,
  badge: PropTypeNumberOrString,
  width: PropTypeNumberOrString,
  colorMode: PropTypeColorMode,
  appearance: PropTypes.oneOfType([
    PropTypes.oneOf<ButtonAppearance>(["primary", "secondary", "tertiary", "minimal", "inverted", "link"]),
    PropTypes.func,
  ]),
  alignment: PropTypeContentAlignment,
  padding: PropTypes.number,
  spinner: PropTypes.oneOfType([SpinnerPropTypes.appearance, PropTypes.bool]),
  intent: PropTypeIntent,
  iconAfterName: PropTypes.string,
  iconAfterData: IconDataPropTypes,
  iconBeforeName: PropTypes.string,
  iconBeforeData: IconDataPropTypes,
  iconName: PropTypes.string,
  iconData: IconDataPropTypes,
  iconSize: PropTypes.number,
  round: PropTypes.bool,
  autoFocus: PropTypes.bool,
  tooltip: PropTypes.node,
  preventDefault: PropTypes.bool,
};
