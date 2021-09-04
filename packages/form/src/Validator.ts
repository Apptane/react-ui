type GuardFunction = (value: unknown | null | undefined) => boolean;

export default class Validator {
  private readonly __guard?: GuardFunction;
  private static readonly __required = new Validator(Validator.require);
  private static readonly __optional = new Validator(undefined);

  private constructor(guard?: GuardFunction) {
    this.__guard = guard;
  }

  private static require(value: unknown | null | undefined) {
    return value != null && (typeof value === "string" ? value.length > 0 : true);
  }

  public static get optional() {
    return this.__optional;
  }

  public static get required() {
    return this.__required;
  }

  /**
   * Returns `true` or the specified error message if the value is not
   * a valid email address.
   */
  public email(value: string | null | undefined, message?: string): boolean | string {
    if (this.__guard && !this.__guard(value)) {
      return message ?? true;
    }
    return Validator.email(value) ? false : message ?? true;
  }

  /**
   * Returns `true` or the specified error message if the value is not
   * a string within the specified length.
   */
  public string(value: string | null | undefined, length: number, message?: string): boolean | string {
    if (this.__guard && !this.__guard(value)) {
      return message ?? true;
    }
    return Validator.string(value, length) ? false : message ?? true;
  }

  /**
   * Returns `true` or the specified error message if the value is not
   * a number within the specified range.
   */
  public number(value: string | null | undefined, min: number, max: number, message?: string): boolean | string {
    if (this.__guard && !this.__guard(value)) {
      return message ?? true;
    }
    return Validator.number(value, min, max) ? false : message ?? true;
  }

  /**
   * Returns `true` or the specified error message if the value is not
   * an integer within the specified range.
   */
  public integer(value: string | null | undefined, min: number, max: number, message?: string): boolean | string {
    if (this.__guard && !this.__guard(value)) {
      return message ?? true;
    }
    return Validator.integer(value, min, max) ? false : message ?? true;
  }

  /**
   * Validates email address.
   */
  public static email(value: string | null | undefined): boolean {
    if (value == null) {
      return false;
    }

    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(
      value
    );
  }

  /**
   * Validates string.
   */
  public static string(value: string | null | undefined, length: number): boolean {
    if (value == null) {
      return false;
    }

    return !length || value.length <= length;
  }

  /**
   * Validates real number.
   */
  public static number(value: string | null | undefined, min: number, max: number): boolean {
    if (value == null) {
      return false;
    }

    const number = parseFloat(value);
    return !isNaN(number) && number >= min && number <= max;
  }

  /**
   * Validates integer number.
   */
  public static integer(value: string | null | undefined, min: number, max: number): boolean {
    if (value == null) {
      return false;
    }

    const number = parseInt(value, 10);
    return !isNaN(number) && number >= min && number <= max;
  }
}
