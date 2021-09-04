import { AnimatedComponentTheme, Color, ComponentTheme } from "@apptane/react-ui-core";

export type SkeletonVisualStyle = {
  /**
   * Border radius in pixels.
   */
  borderRadius: number;

  /**
   * Line height in pixels.
   */
  lineHeight: number;

  /**
   * Paragraph spacing in pixels.
   */
  paragraphSpacing: number;
};

export type SkeletonVisualAppearance = {
  /**
   * Default color.
   */
  default: Color;
};

/**
 * Theme type definitions: Skeleton
 */
export type SkeletonTheme = ComponentTheme<SkeletonVisualStyle, SkeletonVisualAppearance> & AnimatedComponentTheme;
