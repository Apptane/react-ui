import { AppearanceProps, AppearancePropTypes } from "@apptane/react-ui-core";
import { SkeletonVisualAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";

export interface SkeletonTextProps extends AppearanceProps<SkeletonVisualAppearance> {
  /**
   * Number of lines of text in the paragraph.
   */
  lines?: number;
}

export const SkeletonTextPropTypes = {
  ...AppearancePropTypes,
  lines: PropTypes.number,
};
