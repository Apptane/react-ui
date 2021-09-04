import {
  AnimatedComponentTheme,
  Color,
  ComponentSize,
  ComponentTheme,
  ContentHorizontalAlignment,
  Elevation,
  FontProps,
  Padding,
} from "@apptane/react-ui-core";

/**
 * Kind of the dialog.
 */
export type DialogKind = "default" | "hero";

export type DialogVisualStyle = {
  /**
   * Default width.
   */
  width: number;

  /**
   * Content padding in pixels.
   */
  padding: Padding;

  /**
   * Close button size.
   */
  closeButtonSize: ComponentSize;

  /**
   * Close button margin.
   */
  closeButtonMargin: Padding;

  /**
   * Spacing in pixels between main content and header / footer sections.
   */
  contentSpacing: number;

  /**
   * Spacing in pixels between header elements (heading, description, hero image).
   */
  headerSpacing: number;

  /**
   * Spacing in pixels between buttons in the footer.
   */
  buttonSpacing: number;

  /**
   * Button size.
   */
  buttonSize: ComponentSize;

  /**
   * Button alignment.
   */
  buttonAlignment: ContentHorizontalAlignment;

  /**
   * header alignment.
   */
  headerAlignment: ContentHorizontalAlignment;

  /**
   * Typography.
   */
  font: {
    /**
     * Header font.
     */
    header: FontProps;

    /**
     * Description font.
     */
    description: FontProps;
  };
};

export type DialogVisualStyleAppearance = (kind: DialogKind) => DialogVisualStyle;

export type DialogVisualAppearance = {
  /**
   * Border color.
   */
  border?: Color;

  /**
   * Background color.
   */
  background: Color;

  /**
   * Elevation style.
   */
  elevation: Elevation;

  /**
   * Header color.
   */
  text: Color;

  /**
   * Description color.
   */
  description: Color;
};

/**
 * Theme type definitions: Dialog
 */
export type DialogTheme = ComponentTheme<DialogVisualStyleAppearance, DialogVisualAppearance> & AnimatedComponentTheme;
