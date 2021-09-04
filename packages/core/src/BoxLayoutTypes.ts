import PropTypes from "prop-types";
import {
  ContentHorizontalAlignment,
  ContentOrientation,
  ContentVerticalAlignment,
  PropTypeContentOrientation,
} from "./CommonTypes";

/**
 * Box layout properties.
 */
export interface BoxLayoutProps {
  /**
   * The alignment of the content in the horizontal direction.
   * - `stretch` is supported only when `orientation = "vertical"`
   * - `space-between` is supported only when `orientation = "horizontal"`
   */
  horizontalAlignment?: ContentHorizontalAlignment;

  /**
   * The alignment of the content in the vertical direction.
   * - `stretch` is supported only when `orientation = "horizontal"`
   * - `space-between` is supported only when `orientation = "vertical"`
   */
  verticalAlignment?: ContentVerticalAlignment;

  /**
   * The orientation of the content. Default is `vertical`.
   */
  orientation?: ContentOrientation;

  /**
   * Indicates whether content can be wrapped.
   */
  wrap?: boolean;
}

export const BoxLayoutPropTypes = {
  horizontalAlignment: PropTypes.oneOf<ContentHorizontalAlignment>([
    "stretch",
    "space-between",
    "left",
    "middle",
    "center",
    "right",
  ]),
  verticalAlignment: PropTypes.oneOf<ContentVerticalAlignment>([
    "top",
    "middle",
    "center",
    "bottom",
    "stretch",
    "space-between",
  ]),
  orientation: PropTypeContentOrientation,
  wrap: PropTypes.bool,
};
