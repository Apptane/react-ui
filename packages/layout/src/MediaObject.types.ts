import PropTypes from "prop-types";

export type MediaAlignment = "top" | "center" | "overhang";

export interface MediaObjectProps {
  /**
   * Main content.
   */
  children?: React.ReactNode;

  /**
   * Header slot.
   */
  header?: React.ReactNode;

  /**
   * Media slot.
   */
  media?: React.ReactNode;

  /**
   * Media alignment relative to the content. Defaults to `overhang`.
   */
  alignment?: MediaAlignment;

  /**
   * Spacing in pixels between media and content.
   */
  spacing?: number;
}

export const MediaObjectPropTypes = {
  children: PropTypes.any,
  header: PropTypes.any,
  media: PropTypes.any,
  alignment: PropTypes.oneOf<MediaAlignment>(["top", "center", "overhang"]),
  spacing: PropTypes.number,
};
