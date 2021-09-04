import { Color, ComponentTheme, FontProps } from "@apptane/react-ui-core";

export type FormVisualStyle = {
  /**
   * Spacing in pixels between label and content.
   */
  labelSpacing: number;

  /**
   * Spacing in pixels between hint and content.
   */
  hintSpacing: number;

  /**
   * Spacing in pixels between fields or group of fields.
   */
  fieldSpacing: number;

  /**
   * Typography.
   */
  font: {
    /**
     * Hint font.
     */
    hint: FontProps;
  };
};

export type FormVisualAppearance = {
  /**
   * Hint text color.
   */
  hint: Color;
};

/**
 * Theme type definitions: Form
 */
export type FormTheme = ComponentTheme<FormVisualStyle, FormVisualAppearance>;
