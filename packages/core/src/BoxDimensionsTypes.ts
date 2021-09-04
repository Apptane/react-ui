import PropTypes from "prop-types";

/**
 * Box dimensions properties.
 */
export interface BoxDimensionsProps {
  /**
   * An optional height. By default the component is sized to content.
   */
  height?: number | string;

  /**
   * An optional width. By default the component is sized to content.
   */
  width?: number | string;

  /**
   * An optional minimum height.
   */
  minHeight?: number | string;

  /**
   * An optional maximum height.
   */
  maxHeight?: number | string;

  /**
   * An optional minimum width.
   */
  minWidth?: number | string;

  /**
   * An optional maximum width.
   */
  maxWidth?: number | string;

  /**
   * An optional height. By default the component is sized to content.
   * This is the shortcut version of the `height` property.
   */
  h?: number | string;

  /**
   * An optional width. By default the component is sized to content.
   * This is the shortcut version of the `width` property.
   */
  w?: number | string;

  /**
   * An optional minimum height.
   * This is the shortcut version of the `minHeight` property.
   */
  minH?: number | string;

  /**
   * An optional maximum height.
   * This is the shortcut version of the `maxHeight` property.
   */
  maxH?: number | string;

  /**
   * An optional minimum width.
   * This is the shortcut version of the `minWidth` property.
   */
  minW?: number | string;

  /**
   * An optional maximum width.
   * This is the shortcut version of the `maxWidth` property.
   */
  maxW?: number | string;

  /**
   * The flex basis.
   * Applies when used within flex layout of the parent container.
   */
  basis?: number | string;

  /**
   * The flex grow. The default is no grow allowed.
   * Applies when used within flex layout of the parent container.
   */
  grow?: boolean | number;

  /**
   * The flex shrink. The default is no shrink allowed.
   * Applies when used within flex layout of the parent container.
   */
  shrink?: boolean | number;
}

const PropTypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
const PropTypeBoolOrNumber = PropTypes.oneOfType([PropTypes.bool, PropTypes.number]);

export const BoxDimensionsPropTypes = {
  height: PropTypeNumberOrString,
  width: PropTypeNumberOrString,
  minHeight: PropTypeNumberOrString,
  maxHeight: PropTypeNumberOrString,
  minWidth: PropTypeNumberOrString,
  maxWidth: PropTypeNumberOrString,
  h: PropTypeNumberOrString,
  w: PropTypeNumberOrString,
  minH: PropTypeNumberOrString,
  maxH: PropTypeNumberOrString,
  minW: PropTypeNumberOrString,
  maxW: PropTypeNumberOrString,
  basis: PropTypeNumberOrString,
  grow: PropTypeBoolOrNumber,
  shrink: PropTypeBoolOrNumber,
};
