import Trigger from "./Trigger";
import { TriggerProps } from "./Trigger.types";

/**
 * Implements a non-visual behavior for drop-down components.
 * This is just a wrapper for Trigger component with default properties.
 */
const Dropdown = (props: TriggerProps) => (
  <Trigger offset={4} shouldCaptureFocus shouldCloseOnEsc shouldCloseOnClick trigger="click" {...props} />
);

export default Dropdown;
