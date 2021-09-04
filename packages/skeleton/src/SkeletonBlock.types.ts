import { AppearanceProps, AppearancePropTypes, MarginProps, MarginPropTypes } from "@apptane/react-ui-core";
import { SkeletonVisualAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";

export interface SkeletonBlockProps extends MarginProps, AppearanceProps<SkeletonVisualAppearance> {
  /**
   * Width of the block.
   */
  width?: number | string;

  /**
   * Height of the block.
   */
  height?: number;

  /**
   * Indicates that circle must be rendered with `height` representing
   * the diameter; `width` is ignored.
   */
  round?: boolean;
}

const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

export const SkeletonBlockPropTypes = {
  ...MarginPropTypes,
  ...AppearancePropTypes,
  width: PropTypeNumberOrString,
  height: PropTypes.number,
  round: PropTypes.bool,
};
