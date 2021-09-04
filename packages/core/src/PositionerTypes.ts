import PropTypes from "prop-types";
import { Placement } from "./Placement";

/**
 * Base properties common to all components that support positioning
 * via placement specification.
 */
export interface PositionerBaseProps {
  /**
   * Preferred placement of the positioned element. Actual placement
   * may differ if there is not enough space in the viewport.
   */
  placement?: Placement;

  /**
   * Offset in pixels between the anchor element side and positioned element.
   */
  offset?: number;

  /**
   * Duration of the animated transition in milliseconds.
   */
  transitionDuration?: number;

  /**
   * Initial scale for the element (0-1).
   */
  initialScale?: number;

  /**
   * Callback invoked when the positioned element is shown and
   * completely transitioned into place.
   */
  onShown?: () => void;

  /**
   * Callback invoked when the positioned element becomes closed.
   */
  onClosed?: () => void;

  /**
   * Determines whether backdrop should be rendered.
   * If backdrop is rendered then focus is automatically trapped
   * within the content.
   */
  backdrop?: boolean;
}

export const PositionerBasePropTypes = {
  placement: PropTypes.oneOf<Placement>([
    "top",
    "top-left",
    "top-center",
    "top-right",
    "bottom",
    "bottom-left",
    "bottom-center",
    "bottom-right",
    "left",
    "left-top",
    "left-middle",
    "left-bottom",
    "right",
    "right-top",
    "right-middle",
    "right-bottom",
  ]),
  offset: PropTypes.number,
  transitionDuration: PropTypes.number,
  initialScale: PropTypes.number,
  onShown: PropTypes.func,
  onClosed: PropTypes.func,
  backdrop: PropTypes.bool,
};
