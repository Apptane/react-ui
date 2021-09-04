import PropTypes from "prop-types";

/**
 * Color modes.
 */
export type ColorMode = "dark" | "light";
export const PropTypeColorMode = PropTypes.oneOf<ColorMode>(["light", "dark"]);

/**
 * Visual intents.
 */
export type Intent = "none" | "success" | "danger" | "error" | "warning" | "neutral";
export const PropTypeIntent = PropTypes.oneOf<Intent>(["none", "success", "warning", "danger", "error", "neutral"]);

/**
 * Content alignment along the orientation axis.
 */
export type ContentAlignment = "left" | "right" | "center";
export const PropTypeContentAlignment = PropTypes.oneOf<ContentAlignment>(["left", "right", "center"]);

/**
 * Content orientation axis.
 */
export type ContentOrientation = "horizontal" | "vertical";
export const PropTypeContentOrientation = PropTypes.oneOf<ContentOrientation>(["horizontal", "vertical"]);

/**
 * Content horizontal alignment options.
 */
export type ContentHorizontalAlignment = "left" | "middle" | "center" | "right" | "stretch" | "space-between";

/**
 * Content vertical alignment options.
 */
export type ContentVerticalAlignment = "top" | "middle" | "center" | "bottom" | "stretch" | "space-between";

/**
 * Direction.
 */
export type Direction = "up" | "down";

/**
 * Semantic sizes of inputs and controls.
 */
export type ComponentSize = "default" | "small" | "medium" | "large";
export const PropTypeComponentSize = PropTypes.oneOf<ComponentSize>(["default", "small", "medium", "large"]);

/**
 * Color.
 */
export type Color = string;

/**
 * Value attached to buttons and other items with toggle-like behavior.
 */
export type ItemValue = string | number;
export const PropTypeItemValue = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

/**
 * Namespace prefix for built-in glyphs.
 */
export const BuiltinGlyphsNamespace = "i:";
