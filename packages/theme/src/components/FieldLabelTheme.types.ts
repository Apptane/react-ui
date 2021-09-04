import { Color, ComponentTheme, FontProps } from "@apptane/react-ui-core";

export type FieldLabelVisualStyle = {
  /**
   * Typography.
   */
  font: FontProps;
};

export type FieldLabelVisualAppearance = {
  /**
   * Default text color.
   */
  default: Color;

  /**
   * Disabled text color.
   */
  disabled: Color;

  /**
   * Error text color.
   */
  error: Color;
};

/**
 * Theme type definitions: FieldLabel
 */
export type FieldLabelTheme = ComponentTheme<FieldLabelVisualStyle, FieldLabelVisualAppearance>;
