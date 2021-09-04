import { Placement, PositionerBaseProps, PositionerBasePropTypes } from "@apptane/react-ui-core";
import PropTypes from "prop-types";

export type TriggerOption = "manual" | "click" | "hover" | "focus";

export type TriggerComponentProps = {
  placement: Placement;
  close: () => void;
};

export interface TriggerProps extends PositionerBaseProps {
  /**
   * Anchor content.
   */
  children?: React.ReactNode;

  /**
   * Trigger options: "manual", "click", "hover", "focus".
   * Specified as a single option or an array of multiple options.
   */
  trigger?: TriggerOption | TriggerOption[];

  /**
   * Component managed by this behavior.
   */
  component: React.ReactElement<TriggerComponentProps> | ((p: TriggerComponentProps) => JSX.Element);

  /**
   * Controls `component` visibility when the `trigger` option
   * is set to `manual`.
   */
  visible?: boolean;

  /**
   * Prevents default processing on captured "click" events when
   * `trigger is set `click`.
   */
  preventDefault?: boolean;

  /**
   * Indicates whether the `component` must be closed
   * when user clicks outside of the component bounds.
   */
  shouldCloseOnClick?: boolean;

  /**
   * Indicates whether the `component` must be closed
   * when user presses Esc key.
   */
  shouldCloseOnEsc?: boolean;

  /**
   * Indicates whether focus management is enabled —
   * focus is moved into the component when it is made
   * visible and reverted on close.
   */
  shouldCaptureFocus?: boolean;

  /**
   * Indicates inline style for the wrapper element.
   */
  inline?: boolean;

  /**
   * Indicates whether button must be rendered in a disabled state.
   */
  disabled?: boolean;

  /**
   * Controls the width of the anchor element.
   * If not specified the wrapper is sized to `max-content`.
   */
  width?: string | number;

  /**
   * Z-index of the anchor element.
   */
  zIndex?: number;
}

export const PropTypeTriggerOption = [
  PropTypes.oneOf<TriggerOption>(["manual", "click", "hover", "focus"]),
  PropTypes.arrayOf(PropTypes.oneOf<TriggerOption>(["manual", "click", "hover", "focus"]).isRequired),
];

const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

export const TriggerPropTypes = {
  ...PositionerBasePropTypes,
  trigger: PropTypes.oneOfType(PropTypeTriggerOption),
  component: PropTypes.any.isRequired,
  visible: PropTypes.bool,
  preventDefault: PropTypes.bool,
  shouldCloseOnClick: PropTypes.bool,
  shouldCloseOnEsc: PropTypes.bool,
  shouldCaptureFocus: PropTypes.bool,
  inline: PropTypes.bool,
  disabled: PropTypes.bool,
  width: PropTypeNumberOrString,
  zIndex: PropTypes.number,
};

export const HoverOrClickTriggerOptions: TriggerOption[] = ["hover", "click"];
