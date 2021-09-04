import {
  Color,
  ContentAlignment,
  FontProps,
  FontPropTypes,
  MarginProps,
  MarginPropTypes,
  PaletteTextSlot,
  PropTypeContentAlignment,
} from "@apptane/react-ui-core";
import PropTypes from "prop-types";

/**
 * Base properties common to all components that support text rendering.
 */
export interface TextProps extends FontProps, MarginProps {
  /**
   * Children.
   */
  children?: React.ReactNode;

  /**
   * Color of the text. Defaults to `default'.
   * Supports palette semantic text colors.
   */
  color?: Color | PaletteTextSlot;

  /**
   * Text alignment. Defaults to `left`.
   */
  alignment?: ContentAlignment;

  /**
   * Indicates that the text must not wrap into new line.
   * Paragraph ignores this property.
   */
  nowrap?: boolean;

  /**
   * Indicates that the text must show ellipsis on overflow.
   */
  ellipsis?: boolean;
}

export const TextPropTypes = {
  ...MarginPropTypes,
  ...FontPropTypes,
  color: PropTypes.string,
  alignment: PropTypeContentAlignment,
  nowrap: PropTypes.bool,
  ellipsis: PropTypes.bool,
};
