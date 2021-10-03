import { Color, Palette, PaletteHue } from "@apptane/react-ui-core";
import {
  interpolateBlues,
  interpolateBrBG,
  interpolateBuGn,
  interpolateBuPu,
  interpolateCividis,
  interpolateCool,
  interpolateCubehelixDefault,
  interpolateGnBu,
  interpolateGreens,
  interpolateGreys,
  interpolateInferno,
  interpolateMagma,
  interpolateOranges,
  interpolateOrRd,
  interpolatePiYG,
  interpolatePlasma,
  interpolatePRGn,
  interpolatePuBu,
  interpolatePuBuGn,
  interpolatePuOr,
  interpolatePuRd,
  interpolatePurples,
  interpolateRainbow,
  interpolateRdBu,
  interpolateRdGy,
  interpolateRdPu,
  interpolateRdYlBu,
  interpolateRdYlGn,
  interpolateReds,
  interpolateSinebow,
  interpolateSpectral,
  interpolateTurbo,
  interpolateViridis,
  interpolateWarm,
  interpolateYlGn,
  interpolateYlGnBu,
  interpolateYlOrBr,
  interpolateYlOrRd,
} from "d3-scale-chromatic";
import { hexToHsluv, hsluvToHex } from "hsluv";
import { ChromaticScheme } from "./Types";

export type ColorInterpolator = (t: number) => Color;

export function getColorInterpolator(palette: Palette, scheme?: ChromaticScheme | PaletteHue): ColorInterpolator {
  /* eslint-disable prettier/prettier */
  /* prettier-ignore */
  switch (scheme) {
    // d3 chromatic schemes
    case "BrBG": return interpolateBrBG;
    case "PRGn": return interpolatePRGn
    case "PiYG": return interpolatePiYG;
    case "PuOr": return interpolatePuOr;
    case "RdBu": return interpolateRdBu;
    case "RdGy": return interpolateRdGy;
    case "RdYlBu": return interpolateRdYlBu;
    case "RdYlGn": return interpolateRdYlGn;
    case "BuGn": return interpolateBuGn;
    case "BuPu": return interpolateBuPu;
    case "GnBu": return interpolateGnBu;
    case "OrRd": return interpolateOrRd;
    case "PuBuGn": return interpolatePuBuGn;
    case "PuBu": return interpolatePuBu;
    case "PuRd": return interpolatePuRd;
    case "RdPu": return interpolateRdPu;
    case "YlGnBu": return interpolateYlGnBu;
    case "YlGn": return interpolateYlGn;
    case "YlOrBr": return interpolateYlOrBr;
    case "YlOrRd": return interpolateYlOrRd;
    case "spectral": return interpolateSpectral;
    case "blues": return interpolateBlues;
    case "greens": return interpolateGreens;
    case "greys": return interpolateGreys;
    case "oranges": return interpolateOranges;
    case "purples": return interpolatePurples;
    case "reds": return interpolateReds;
    case "turbo": return interpolateTurbo;
    case "viridis": return interpolateViridis;
    case "inferno": return interpolateInferno;
    case "magma": return interpolateMagma;
    case "plasma": return interpolatePlasma;
    case "cividis": return interpolateCividis;
    case "warm": return interpolateWarm;
    case "cool": return interpolateCool;
    case "cubehelix": return interpolateCubehelixDefault;
    case "rainbow": return interpolateRainbow;
    case "sinebow": return interpolateSinebow;
    default:
      // palette
      const pigment = scheme == null ? palette.gray : palette.pigments[scheme];
      const [h0, s0, l0] = hexToHsluv(pigment[100]);
      const [h1, s1, l1] = hexToHsluv(pigment[800]);

      // use average hue and saturation, since these should
      // be very similar within pigment
      const h = (h0 + h1) * 0.5;
      const s = (s0 + s1) * 0.5;
      return (t: number) => hsluvToHex([h, s, l0 + (l1 - l0) * t]);
  }
  /* eslint-enable prettier/prettier */
}

/**
 * Converts a hex representation of a color into rgba() format.
 * @param {string} hex - hexadecimal color in '#rrggbb' format
 * @param {number} opacity - opacity value
 */
export function hex2rgba(hex: string, opacity = 1): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5), 16);
  return `rgba(${r},${g},${b},${opacity})`;
}

/**
 * Converts an rgba() color to rgb() format (strips alpha).
 * @param {string} rgba - color in 'rgba(rr,gg,bb,a.aa)' format
 */
export function rgba2rgb(rgba: string): string {
  const m = /rgba\(([^)]+)\)/.exec(rgba);
  if (m != null) {
    const [r, g, b] = m[1].split(",");
    return `rgb(${r},${g},${b})`;
  } else {
    throw new Error(`Invalid rgba color format: ${rgba}`);
  }
}

const Gamma = 1.5;
const GammaInv = 1 / Gamma;

/**
 * Mixes a hex representation of a color with white per opacity
 * and returns it in rgb() format.
 * @param {string} hex - hexadecimal color in '#rrggbb' format
 * @param {number} opacity - opacity value
 */
export function mutedColor(hex: string, opacity = 0.5, back = 255) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5), 16);

  const color = {
    r: Math.round(Math.pow(Math.pow(back, Gamma) * (1 - opacity) + Math.pow(r, Gamma) * opacity, GammaInv)),
    g: Math.round(Math.pow(Math.pow(back, Gamma) * (1 - opacity) + Math.pow(g, Gamma) * opacity, GammaInv)),
    b: Math.round(Math.pow(Math.pow(back, Gamma) * (1 - opacity) + Math.pow(b, Gamma) * opacity, GammaInv)),
  };

  return `rgb(${color.r},${color.g},${color.b})`;
}
