import { Color, ComponentTheme, FontProps } from "@apptane/react-ui-core";

export type CalendarVisualStyle = {
  /**
   * Day entry (cell) size in pixels.
   */
  size: number;

  /**
   * Border radius in pixels.
   */
  borderRadius: number;

  /**
   * Pane spacing in pixels.
   */
  spacing: number;

  /**
   * Typography.
   */
  font: {
    /**
     * Header font.
     */
    header: FontProps;

    /**
     * Day entry font.
     */
    day: FontProps;
  };
};

export type CalendarVisualAppearance = {
  /**
   * Text color.
   */
  text: {
    /**
     * Header color.
     */
    header: Color;

    /**
     * Day-of-week color.
     */
    dow: Color;

    /**
     * Default color.
     */
    normal: Color;

    /**
     * Muted color.
     */
    muted: Color;

    /**
     * Highlight color.
     */
    highlight: Color;

    /**
     * Selected color.
     */
    selected: Color;
  };

  /**
   * Background color.
   */
  back: {
    /**
     * Highlight color.
     */
    highlight: Color;

    /**
     * Selected color.
     */
    selected: Color;
  };

  /**
   * Border color.
   */
  border: {
    /**
     * Today color.
     */
    today: Color;

    /**
     * Focused color.
     */
    focused: Color;
  };
};

/**
 * Theme type definition: Calendar
 */
export type CalendarTheme = ComponentTheme<CalendarVisualStyle, CalendarVisualAppearance>;
