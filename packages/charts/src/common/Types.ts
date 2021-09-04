import { binarySearch, Color, PaletteHue } from "@apptane/react-ui-core";
import PropTypes from "prop-types";

/**
 * One of D3 chromatic color schemes.
 * See: https://github.com/d3/d3-scale-chromatic
 */
export type ChromaticScheme =
  | "BrBG"
  | "PRGn"
  | "PiYG"
  | "PuOr"
  | "RdBu"
  | "RdGy"
  | "RdYlBu"
  | "RdYlGn"
  | "BuGn"
  | "BuPu"
  | "GnBu"
  | "OrRd"
  | "PuBuGn"
  | "PuBu"
  | "PuRd"
  | "RdPu"
  | "YlGnBu"
  | "YlGn"
  | "YlOrBr"
  | "YlOrRd"
  | "spectral"
  | "blues"
  | "greens"
  | "greys"
  | "oranges"
  | "purples"
  | "reds"
  | "turbo"
  | "viridis"
  | "inferno"
  | "magma"
  | "plasma"
  | "cividis"
  | "warm"
  | "cool"
  | "cubehelix"
  | "rainbow"
  | "sinebow";

/**
 * Base interface for a visualized datum, such as metric, slice or cell.
 */
export interface Datum<Data = void> {
  /**
   * Unique identifier of the datum within the supplied set.
   */
  id?: string;

  /**
   * Display label for the legend or tooltip.
   */
  label?: string;

  /**
   * Color to use overriding the color specification at the component level.
   */
  color?: Color | PaletteHue;

  /**
   * Arbitrary data associated with the datum.
   * This field is passed through to callbacks.
   */
  data?: Data;
}

/**
 * Domain value types.
 */
export type DomainValue = number | string | Date;
export type DomainXValue = DomainValue;
export type DomainYValue = Exclude<DomainValue, Date>;

/**
 * Domain types.
 */
export type DomainType = "time" | "numeric" | "ordinal" | "none";

export type MouseEventCallback<Data = void> = (datum: Datum<Data>, event: React.MouseEvent) => void;

export const PropTypeDatum = {
  id: PropTypes.string,
  label: PropTypes.string,
  color: PropTypes.string,
  data: PropTypes.any,
};

export const PropTypeDomainValue = PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]);
export const PropTypeDomainType = PropTypes.oneOf<DomainType>(["time", "numeric", "ordinal", "none"]);
export const PropTypeColorScheme = PropTypes.oneOf<ChromaticScheme | PaletteHue>([
  "BrBG",
  "PRGn",
  "PiYG",
  "PuOr",
  "RdBu",
  "RdGy",
  "RdYlBu",
  "RdYlGn",
  "BuGn",
  "BuPu",
  "GnBu",
  "OrRd",
  "PuBuGn",
  "PuBu",
  "PuRd",
  "RdPu",
  "YlGnBu",
  "YlGn",
  "YlOrBr",
  "YlOrRd",
  "spectral",
  "blues",
  "greens",
  "greys",
  "oranges",
  "purples",
  "reds",
  "turbo",
  "viridis",
  "inferno",
  "magma",
  "plasma",
  "cividis",
  "warm",
  "cool",
  "cubehelix",
  "rainbow",
  "sinebow",
  "red",
  "orange",
  "yellow",
  "green",
  "cyan",
  "teal",
  "blue",
  "indigo",
  "purple",
]);

/**
 * Represents domain of values, possibly comparable.
 */
export class Domain<T = DomainValue> {
  public readonly values: T[];

  private readonly __comparer?: (a: T, b: T) => number;
  private readonly __ordinal: boolean;

  constructor(values: T[], comparer?: (a: T, b: T) => number, ordinal?: boolean) {
    if (comparer != null) {
      values.sort(comparer);
    }

    this.values = values;
    this.__comparer = comparer;
    this.__ordinal = ordinal == true;
  }

  /**
   * Tests two domain values for equality.
   */
  public isEqual = (a: T, b: T): boolean =>
    !this.__ordinal && this.__comparer != null ? this.__comparer(a, b) === 0 : a === b;

  /**
   * @public
   * Locates the closest value in the domain to the specified value.
   * Returns both the value and its index in the domain.
   */
  public findNearest(v?: T): [T | undefined, number | undefined] {
    if (v == null) {
      return [undefined, undefined];
    }

    // exact match only
    if (this.__ordinal || this.__comparer == null) {
      const index = this.values.indexOf(v);
      return index < 0 ? [undefined, undefined] : [v, index];
    }

    // binary search
    let index = binarySearch(this.values, v, this.__comparer);
    if (index >= 0) {
      return [this.values[index], index];
    }

    // since we only require domain to be comparable, and not necessarily
    // measurable, we always default to the leftmost entry unless first
    index = ~index;
    return index === 0 ? [this.values[0], 0] : [this.values[index - 1], index - 1];
  }
}
