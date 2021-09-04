import { AppearanceProps, AppearancePropTypes, ContentOrientation } from "@apptane/react-ui-core";
import { ScrollerVisualAppearance, Theme } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";

export interface ScrollBarProps extends AppearanceProps<ScrollerVisualAppearance> {
  /**
   * Scrollbar orientation: vertical or horizontal.
   */
  orientation: ContentOrientation;

  /**
   * Container size in pixels (height - vertical orientation, width - horizontal orientation).
   */
  containerSize: number;

  /**
   * Scroll area offset in pixels (top - vertical orientation, left - horizontal orientation).
   */
  scrollAreaOffset: number;

  /**
   * Scroll area size in pixels (height - vertical orientation, width - horizontal orientation).
   */
  scrollAreaSize: number;

  /**
   * Callback to set new position of the scroll.
   */
  onChange?: (offset: number, orientation: ContentOrientation) => void;

  /**
   * Should be passed Theme instance. Doesn't use context.
   */
  theme: Theme;
}

export const ScrollBarPropTypes = {
  ...AppearancePropTypes,
  orientation: PropTypes.oneOf<ContentOrientation>(["horizontal", "vertical"]).isRequired,
  containerSize: PropTypes.number.isRequired,
  scrollAreaOffset: PropTypes.number.isRequired,
  scrollAreaSize: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  theme: PropTypes.any.isRequired,
};
