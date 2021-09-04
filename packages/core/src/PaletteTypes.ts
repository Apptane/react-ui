import cloneDeep from "lodash/cloneDeep";
import { hexToHsluv, hsluvToHex } from "hsluv";
import { Color } from "./CommonTypes";

/**
 * "Weight" of the palette color indicating the color "lightness".
 * Larger weights represent darker colors, smaller weights represent lighter colors.
 */
export type PaletteWeight = 900 | 800 | 700 | 600 | 500 | 400 | 300 | 200 | 100 | 50;

/**
 * Standard palette color hues.
 */
export type PaletteHue = "red" | "orange" | "yellow" | "green" | "cyan" | "teal" | "blue" | "indigo" | "purple";

/**
 * Pigment represents a palette row of color shades with the same hue.
 * Colors in the pigment are indexed by weight.
 */
export type PalettePigment = {
  [weight in PaletteWeight]: Color;
};

/**
 * A set of pigments with a non-gray hue.
 */
export type PalettePigments = {
  [K in PaletteHue]: PalettePigment;
};

/**
 * Semantic text slots.
 */
export type PaletteTextSlot = "default" | "accent" | "muted" | "contrast" | "success" | "warning" | "error";

/**
 * Semantic background slots.
 */
export type PaletteBackgroundSlot = "default" | "accent" | "contrast" | "readonly" | "backdrop" | "highlight";

/**
 * Semantic border slots.
 */
export type PaletteBorderSlot = "default" | "accent" | "contrast" | "focused" | "error" | "divider";

/**
 * References color in the palette.
 */
export type PaletteReference =
  | [PaletteHue | "gray" | "text" | "white" | "black" | "accent", PaletteWeight]
  | [PaletteHue | "gray" | "text" | "white" | "black" | "accent", PaletteWeight, number];

export type PaletteMappingVariants<K extends string | symbol, V> = {
  [key in K]: V;
};

export type PaletteMapping = {
  /**
   * Name of the pigment representing primary color (accent).
   */
  accent: PaletteHue;

  /**
   * Text colors mapping.
   */
  text: PaletteMappingVariants<PaletteTextSlot, PaletteReference>;

  /*
   * Background colors mapping.
   */
  back: PaletteMappingVariants<PaletteBackgroundSlot, PaletteReference>;

  /*
   * Border colors mapping.
   */
  border: PaletteMappingVariants<PaletteBorderSlot, PaletteReference>;
};

export type PaletteColorMapEntry = {
  size: number;
  colors: PaletteReference[];
};

export interface Palette {
  /**
   * Gray shades indexed by weight.
   */
  gray: PalettePigment;

  /**
   * Text shades indexed by weight.
   */
  text: PalettePigment;

  /**
   * Colored pigments indexed by name and by weight.
   */
  pigments: PalettePigments;

  /**
   * Colormap for charts, gauges, etc.
   */
  colormap: PaletteColorMapEntry[];

  /**
   * White color.
   */
  white: Color;

  /**
   * Black color.
   */
  black: Color;

  /**
   * Mapping from semantic colors to palette colors.
   */
  mapping: PaletteMapping;
}

/**
 * Resolves the palette reference to a color.
 */
export function resolvePaletteReference(palette: Palette, reference: PaletteReference): Color {
  let pigment: PalettePigment;
  switch (reference[0]) {
    case "gray":
      return palette.gray[reference[1]];
    case "text":
      return palette.text[reference[1]];
    case "white":
      return palette.white;
    case "black":
      return palette.black;
    case "accent":
      pigment = palette.pigments[palette.mapping.accent];
      break;
    default:
      pigment = palette.pigments[reference[0]];
      break;
  }

  // apply weight to dereference color
  const color = pigment[reference[1]];
  if (reference.length == 3) {
    const [h, , l] = hexToHsluv(color);
    return hsluvToHex([h, reference[2], l]);
  }

  return color;
}

/**
 * Resolves color in one of the following formats:
 * - #hex
 * - rgb[a](...)
 * - hsl[a](...)
 * - hue:weight[:saturation]
 * - white|black
 */
export function resolveColor(palette: Palette, color: string): Color {
  switch (color) {
    case "white":
      return palette.white;
    case "black":
      return palette.black;
    default:
      const tokens = color.split(":");
      if (tokens.length > 1) {
        const hue = tokens[0] as PaletteHue;
        const weight = parseInt(tokens[1]) as PaletteWeight;
        return tokens.length > 2
          ? resolvePaletteReference(palette, [hue, weight, parseInt(tokens[2])])
          : resolvePaletteReference(palette, [hue, weight]);
      }

      return color;
  }
}

/**
 * Resolves the background color.
 */
export function resolveBackgroundColor(palette: Palette, color: PaletteBackgroundSlot | string): Color {
  switch (color) {
    case "default":
      return resolvePaletteReference(palette, palette.mapping.back.default);
    case "accent":
      return resolvePaletteReference(palette, palette.mapping.back.accent);
    case "contrast":
      return resolvePaletteReference(palette, palette.mapping.back.contrast);
    case "readonly":
      return resolvePaletteReference(palette, palette.mapping.back.readonly);
    case "backdrop":
      return resolvePaletteReference(palette, palette.mapping.back.backdrop);
    case "highlight":
      return resolvePaletteReference(palette, palette.mapping.back.highlight);
    default:
      return resolveColor(palette, color);
  }
}

/**
 * Resolves the border color.
 */
export function resolveBorderColor(palette: Palette, color: PaletteBorderSlot | string): Color {
  switch (color) {
    case "default":
      return resolvePaletteReference(palette, palette.mapping.border.default);
    case "accent":
      return resolvePaletteReference(palette, palette.mapping.border.accent);
    case "contrast":
      return resolvePaletteReference(palette, palette.mapping.border.contrast);
    case "focused":
      return resolvePaletteReference(palette, palette.mapping.border.focused);
    case "error":
      return resolvePaletteReference(palette, palette.mapping.border.error);
    case "divider":
      return resolvePaletteReference(palette, palette.mapping.border.divider);
    default:
      return resolveColor(palette, color);
  }
}

/**
 * Resolves the text color.
 */
export function resolveTextColor(palette: Palette, color: PaletteTextSlot | string): Color {
  switch (color) {
    case "default":
      return resolvePaletteReference(palette, palette.mapping.text.default);
    case "accent":
      return resolvePaletteReference(palette, palette.mapping.text.accent);
    case "contrast":
      return resolvePaletteReference(palette, palette.mapping.text.contrast);
    case "muted":
      return resolvePaletteReference(palette, palette.mapping.text.muted);
    case "success":
      return resolvePaletteReference(palette, palette.mapping.text.success);
    case "warning":
      return resolvePaletteReference(palette, palette.mapping.text.warning);
    case "error":
      return resolvePaletteReference(palette, palette.mapping.text.error);
    default:
      return resolveColor(palette, color);
  }
}

/**
 * Retrieves colormap for the specified number of entries.
 */
export function getColorMap(palette: Palette, size?: number): PaletteReference[] {
  let map: PaletteColorMapEntry | undefined;
  if (size != null) {
    for (let i = 0; i < palette.colormap.length; ++i) {
      if (size <= palette.colormap[i].size) {
        map = palette.colormap[i];
        break;
      }
    }
  }

  map = map ?? palette.colormap[palette.colormap.length - 1];
  return map.colors;
}

/**
 * Resolves colormap to actual colors.
 */
export function resolveColorMap(palette: Palette, colormap: PaletteReference[]): Color[] {
  return colormap.map((c) => resolvePaletteReference(palette, c));
}

/**
 * Resolves color based on colormap.
 */
export function resolveMappedColor(palette: Palette, color: Color | PaletteHue): Color {
  switch (color) {
    case "red":
    case "blue":
    case "orange":
    case "teal":
    case "purple":
    case "indigo":
    case "gray":
      const colormap = getColorMap(palette);
      const r = colormap.find((c) => c[0] === color);
      return r != null ? resolvePaletteReference(palette, r) : resolveColor(palette, color);
    default:
      return resolveColor(palette, color);
  }
}

/**
 * Creates a reversed palette for the `dark` theme.
 */
export function reversePalette(palette: Palette): Palette {
  function reverse(pigment: PalettePigment) {
    return {
      [50]: pigment[900],
      [100]: pigment[800],
      [200]: pigment[700],
      [300]: pigment[600],
      [400]: pigment[500],
      [500]: pigment[400],
      [600]: pigment[300],
      [700]: pigment[200],
      [800]: pigment[100],
      [900]: pigment[50],
    };
  }

  const reversed = {
    gray: reverse(palette.gray),
    text: reverse(palette.text),
    white: palette.black,
    black: palette.white,
    colormap: cloneDeep(palette.colormap),
    mapping: cloneDeep(palette.mapping),
    pigments: {},
  } as Palette;

  for (const key in palette.pigments) {
    if (Object.prototype.hasOwnProperty.call(palette.pigments, key)) {
      const hue = key as PaletteHue;
      reversed.pigments[hue] = reverse(palette.pigments[hue]);
    }
  }

  return reversed;
}
