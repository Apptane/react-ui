/**
 * Provides virtual (UI-agnostic) component for numeric input.
 * This component maintains virtual value, cursor position and selection
 * and enables value manipulations via virtual input actions.
 */

import defaultsDeep from "lodash/defaultsDeep";
import isEqual from "lodash/isEqual";
import isString from "lodash/isString";

/**
 * Replaces character at the specified position.
 */
function replaceAt(content: string, c: string, position: number) {
  return content.substring(0, position) + c + content.substring(position + 1);
}

/**
 * Inserts character at specified position.
 */
function insertAt(content: string, c: string, position: number) {
  return content.substring(0, position) + c + content.substring(position);
}

/**
 * Checks whether the character is a digit.
 */
function isDigit(c: string) {
  return c && c.length === 1 && c[0] >= "0" && c[0] <= "9";
}

const DefaultNumericVirtualOptions = {
  prefix: "",
  suffix: "",
  negative: false, // allow negative numbers
  thousands: true,
  precision: 0,
  digits: -1, // whole part digits
  delimiters: {
    decimal: ".",
    thousand: ",",
  },
};

type NumericVirtualOptions = {
  prefix?: string;
  suffix?: string;
  negative?: boolean;
  thousands?: boolean;
  precision?: number;
  digits?: number;
  delimiters?: {
    decimal?: string;
    thousand?: string;
  };
};

export default class NumericVirtualInput {
  public format!: typeof DefaultNumericVirtualOptions;
  public value: number | null | undefined;
  public content: string;
  public readonly selection: {
    start: number;
    end: number;
  };

  constructor(options: NumericVirtualOptions) {
    this.__options(options);
    this.value = null;
    this.content = "";
    this.selection = {
      start: 0,
      end: 0,
    };
  }

  /**
   * Sets formatting options.
   */
  __options(options: NumericVirtualOptions) {
    const format = defaultsDeep(options, DefaultNumericVirtualOptions);

    // NB: this check also protects against null values
    if (!isString(format.prefix)) {
      format.prefix = "";
    }

    if (!isString(format.suffix)) {
      format.suffix = "";
    }

    if (isEqual(this.format, format)) {
      return false;
    }

    this.format = format;
    return true;
  }

  /**
   * Returns formatted display content from numeric value and translates
   * numeric string cursor position into content cursor position.
   */
  __format(value: number | null | undefined, position: number) {
    if (value == null || isNaN(value)) {
      return {
        content: "",
        position: 0,
      };
    }

    const n = value < 0;
    const v = Math.abs(value).toString();

    // coerce position
    if (position < 0) {
      position = v.length;
    } else if (n && position > 0) {
      --position; // adjust for sign
    }

    let result = "";
    let offset = 0;

    const t = v.split(".");
    const w = t[0]; // whole part

    if (this.format.thousands) {
      for (let i = 0; i < w.length; ++i) {
        if (i > 0 && (w.length - i) % 3 === 0) {
          result += this.format.delimiters.thousand;
          if (i < position) {
            ++offset;
          }
        }
        result += w[i];
      }
    }

    // adjust position due to formatting characters (thousands)
    position += offset;

    if (this.format.precision > 0) {
      result += this.format.delimiters.decimal;
      for (let i = 0; i < this.format.precision; ++i) {
        // pad with zeros
        if (t.length === 1 || i >= t[1].length) {
          result += "0";
        } else {
          result += t[1][i];
        }
      }
    }

    // sign
    if (n) {
      result = "-" + result;
      ++position;
    }

    result = result + this.format.suffix;
    result = this.format.prefix + result;
    position += this.format.prefix.length;

    const lb = this.format.prefix.length;
    const ub = result.length - this.format.suffix.length;

    return {
      content: result,
      position: Math.min(Math.max(position, lb), ub),
    };
  }

  /**
   * Returns raw numeric string without formatting and translates
   * content cursor position into numeric string cursor position.
   */
  __unformat(content: string, position: number) {
    if (content === "") {
      return {
        content: "",
        position: 0,
      };
    }

    if (position < 0) {
      position = content.length;
    }

    let result = "";
    let offset = 0;
    for (let i = this.format.prefix.length; i < content.length - this.format.suffix.length; ++i) {
      if (content[i] !== this.format.delimiters.thousand) {
        result += content[i];
      } else if (i < position) {
        ++offset;
      }
    }

    // account for prefix and offset
    position = Math.max(0, position - this.format.prefix.length - offset);
    return {
      content: result,
      position: Math.min(position, result.length),
    };
  }

  /**
   * Cuts selected part of the content and returns new content.
   */
  __cut(content: string) {
    // remove the selected part of the content, but preserve decimal delimiter
    const lead = content.substring(0, this.selection.start);
    const part = content.substring(this.selection.start, this.selection.end);
    const tail = content.substring(this.selection.end);

    if (part.indexOf(this.format.delimiters.decimal) >= 0) {
      content = lead + this.format.delimiters.decimal + tail;
    } else {
      content = lead + tail;
    }

    return content;
  }

  /**
   * Synchronizes value, position and display content.
   */
  __sync(content: string, position: number) {
    this.value = parseFloat(content);
    const formatted = this.__format(this.value, position);
    this.content = formatted.content;
    this.selection.start = this.selection.end = formatted.position;
  }

  /**
   * Sets the numeric value.
   */
  setValue(value: number | null | undefined) {
    if (this.value !== value) {
      this.value = value;
      const formatted = this.__format(value, -1);
      this.content = formatted.content;
      this.selection.start = this.selection.end = formatted.position;
    }
  }

  /**
   * Sets formatting options.
   */
  setOptions(options: NumericVirtualOptions) {
    if (this.__options(options)) {
      // determine current unformatted position
      const unformatted = this.__unformat(this.content, this.selection.start);
      const formatted = this.__format(this.value, unformatted.position);
      this.content = formatted.content;
      this.selection.start = this.selection.end = formatted.position;
    }
  }

  /**
   * Sets the cursor selection to the specified range.
   */
  setSelection(start: number, end: number) {
    if (arguments.length === 1 || end < start) {
      end = start;
    }

    const lb = this.format.prefix.length;
    const ub = this.content.length - this.format.suffix.length;

    // do not allow selecting prefix/suffix characters
    this.selection.start = Math.min(Math.max(start, lb), ub);
    this.selection.end = Math.min(Math.max(end, lb), ub);
  }

  /**
   * Accepts a single character.
   */
  input(c: string) {
    let content = this.content;
    let position = this.selection.start;

    if (content.length > 0) {
      if (this.selection.start !== this.selection.end) {
        content = this.__cut(content);
      }

      const unformatted = this.__unformat(content, position);
      content = unformatted.content;
      position = unformatted.position;
    } else {
      content = "";
      position = 0;
    }

    if (this.format.negative && c === "-") {
      if (this.value == null) {
        return false;
      }

      if (this.value < 0) {
        position = Math.max(0, position - 1);
      } else if (this.value > 0) {
        position++;
      }

      this.value = -this.value;
      const formatted = this.__format(this.value, position);
      this.content = formatted.content;
      this.selection.start = this.selection.end = formatted.position;
      return true;
    }

    // entering decimal delimiter moves the cursor at
    // the position immediately past the decimal and
    // initializes the number to zero if it was empty
    if (c === this.format.delimiters.decimal) {
      if (this.format.precision === 0) {
        return false;
      }

      // initialize the value
      if (content.length === 0) {
        this.value = 0;
      }

      const formatted = this.__format(this.value, position);
      const index = formatted.content.indexOf(this.format.delimiters.decimal);
      if (index >= 0) {
        position = index + 1;
      }

      this.content = formatted.content;
      this.selection.start = this.selection.end = position;
      return true;
    }

    let advance = true;

    // determine whether we are entering in the fixed precision zone
    const decimalAt = content.indexOf(this.format.delimiters.decimal);
    if (this.format.precision > 0 && decimalAt >= 0 && position > decimalAt) {
      // must be a number 0-9
      if (!isDigit(c)) {
        return false;
      }

      // special case: if content has been truncated due to delete/cut
      // after the decimal point, append/insert number, otherwise replace
      // existing digits and do not allow appending more digits at the end
      if (content.length - (decimalAt + 1) < this.format.precision) {
        if (position >= content.length) {
          content = content + c;
        } else {
          content = insertAt(content, c, position);
        }
      } else {
        if (position >= content.length) {
          // do not allow more characters at the end
          return false;
        } else {
          content = replaceAt(content, c, position);
        }
      }
    } else {
      // special case 1: entering leading zero
      if (position === 0 && content.length > 0 && c === "0" && content[0] !== ".") {
        return false;
      }

      const shortcut = "bBmMtThH".indexOf(c) >= 0;
      if (!shortcut && !isDigit(c)) {
        return false;
      }

      // special case 2: 0|[.xx]
      if (position === 1 && content.length > 0 && content[0] === "0") {
        advance = false;
      }

      // whole part digits
      const digits = decimalAt >= 0 ? decimalAt : content.length;

      // limit number of whole part digits
      if (this.format.digits > 0 && digits >= this.format.digits) {
        if (shortcut) {
          return false;
        }

        if (position >= digits) {
          return false;
        }

        content = replaceAt(content, c, position);
      } else {
        // support for shortcuts: [b]illion, [m]illion, [t]housand, [h]undred
        if (shortcut) {
          if (position < digits || digits === 0) {
            return false;
          }

          let zeros = 0;
          switch (c) {
            case "b":
            case "B":
              zeros = 9;
              break;
            case "m":
            case "M":
              zeros = 6;
              break;
            case "t":
            case "T":
              zeros = 3;
              break;
            case "h":
            case "H":
              zeros = 2;
              break;
          }

          let count = 0;
          while (count < zeros && (this.format.digits <= 0 || digits + count <= this.format.digits)) {
            content = insertAt(content, "0", position);
            count++;
          }

          position += count;
          advance = false;
        } else {
          content = insertAt(content, c, position);
        }
      }
    }

    if (advance) {
      ++position;
    }

    this.__sync(content, position);
    return true;
  }

  /**
   * Emulates backspace behavior.
   */
  backspace() {
    let content = this.content;
    let position = this.selection.start;

    if (content.length === 0) {
      return false;
    }

    // remove the selected part of the content
    let handled = false;
    if (this.selection.start !== this.selection.end) {
      handled = true;
      content = this.__cut(content);
    }

    const unformatted = this.__unformat(content, position);
    content = unformatted.content;
    position = unformatted.position;

    // remove character at the position except for the decimal delimiter
    if (!handled && position > 0) {
      if (content[position - 1] !== this.format.delimiters.decimal) {
        content = content.substring(0, position - 1) + content.substring(position);
      }
      --position;
    }

    this.__sync(content, position);
    return true;
  }

  /**
   * Emulates paste behavior.
   */
  paste(content: string) {
    let success = false;
    if (content) {
      for (let i = 0; i < content.length; ++i) {
        success = success || this.input(content[i]);
      }
    }
    return success;
  }
}
