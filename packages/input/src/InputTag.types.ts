import { ComponentSize, Palette, PaletteHue, PropTypeComponentSize } from "@apptane/react-ui-core";
import { TagAppearance, TagVisualAppearance } from "@apptane/react-ui-theme";
import PropTypes from "prop-types";
import { InputBoxProps, InputBoxPropTypes } from "./InputBox.types";

export interface InputTagProps
  extends Omit<InputBoxProps, "size" | "alignment" | "empty" | "glyph" | "theme" | "control" | "cursor"> {
  /**
   * Type of the input.
   */
  type?: "text" | "email";

  /**
   * Indicates whether default focus must be set to the input element.
   */
  autoFocus?: boolean;

  /**
   * Currently bound value. Duplicate entries are ignored.
   */
  value?: string[];

  /**
   * Callback invoked when `value` changes.
   */
  onChange?: (value?: string[]) => void;

  /**
   * The pre-defined theme sizes. Defaults to `large`.
   * Or a numeric size in pixels.
   */
  tagSize?: ComponentSize | number;

  /**
   * Visual tag appearance. Defaults to `primary`.
   */
  tagAppearance?: TagAppearance | ((palette: Palette) => TagVisualAppearance);

  /**
   * Overrides the default tag color theme.
   * Supports palette semantic hues.
   */
  tagHue?: PaletteHue;

  /**
   * Overrides default set of keys that are used as a separators.
   * Default is ["Enter", "Tab", ","]
   */
  separators?: string[];

  /**
   * Function to sort tags. If not specified tags are displayed
   * in the order they appear in `value`.
   */
  sort?: (a: string, b: string) => number;

  /**
   * Indicates whether the last tag must be deleted when Backspace
   * is pressed and no current input is present.
   */
  deleteOnBackspace?: boolean;
}

export const InputTagPropsTypes = {
  ...InputBoxPropTypes,
  type: PropTypes.oneOf(["text", "email"]),
  autoFocus: PropTypes.bool,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  tagSize: PropTypes.oneOfType([PropTypeComponentSize, PropTypes.number]),
  tagAppearance: PropTypes.oneOfType([
    PropTypes.oneOf<TagAppearance>(["primary", "secondary", "neutral"]),
    PropTypes.func,
  ]),
  tagHue: PropTypes.string,
  separators: PropTypes.arrayOf(PropTypes.string),
  sort: PropTypes.func,
  deleteOnBackspace: PropTypes.bool,
};
