import { AppearanceProps, MarginProps, MarginPropTypes, PropTypeColorMode } from "@apptane/react-ui-core";
import { IconData, IconDataPropTypes } from "@apptane/react-ui-icon";
import { HyperlinkAppearance, HyperlinkVisualAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";
import { TextProps, TextPropTypes } from "./Text.types";

export interface HyperlinkProps
  extends MarginProps,
    TextProps,
    AppearanceProps<HyperlinkVisualAppearance, HyperlinkAppearance> {
  /**
   * Indicates whether link must be rendered decorated (underlined)
   * when in hover or focused state.
   */
  decorated?: boolean;

  /**
   * Callback invoked when link is clicked.
   */
  onClick?: React.MouseEventHandler;

  /**
   * Anchor reference.
   */
  href?: string;

  /**
   * Anchor title.
   */
  title?: string;

  /**
   * Anchor target.
   */
  target?: string;

  /**
   * Indicates whether link must be rendered in a disabled state.
   */
  disabled?: boolean;

  /**
   * Size of the icon in pixels. Icon has the same width and height.
   * Defaults to 16 pixels.
   */
  iconSize?: number;

  /**
   * Name of the icon to render after the link's content.
   * Must be a name supported by `Icon` component.
   */
  iconAfterName?: string;

  /**
   * Vector data of the icon to render after the link's content.
   * See `Icon` component for details.
   */
  iconAfterData?: IconData;

  /**
   * Name of the icon to render before the link's content.
   * Must be a name supported by `Icon` component.
   */
  iconBeforeName?: string;

  /**
   * Vector data of the icon to render before the link's content.
   * See `Icon` component for details.
   */
  iconBeforeData?: IconData;

  /**
   * Indicates whether it must be rendered as a block element.
   */
  block?: boolean;
}

export const HyperlinkPropTypes = {
  ...TextPropTypes,
  ...MarginPropTypes,
  colorMode: PropTypeColorMode,
  appearance: PropTypes.oneOfType([
    PropTypes.oneOf<HyperlinkAppearance>(["primary", "secondary", "inverted"]),
    PropTypes.func,
  ]),
  decorated: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  title: PropTypes.string,
  target: PropTypes.string,
  iconSize: PropTypes.number,
  iconAfterName: PropTypes.string,
  iconAfterData: IconDataPropTypes,
  iconBeforeName: PropTypes.string,
  iconBeforeData: IconDataPropTypes,
  block: PropTypes.bool,
};
