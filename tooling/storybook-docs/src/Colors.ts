/**
 * Converts HEX color string to [r,g,b] tuple.
 */
export function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : undefined;
}

/**
 * Computes relative luminance of the color.
 */
export function luminance(r: number, g: number, b: number) {
  function l(v: number) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  }

  // https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
  return 0.2126 * l(r) + 0.7152 * l(g) + 0.0722 * l(b);
}

/**
 * Returns WCAG contrast ratio between two colors.
 */
export function contrast(c1: string, c2: string) {
  const rgb1 = hexToRgb(c1);
  const rgb2 = hexToRgb(c2);

  if (rgb1 && rgb2) {
    // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
    const l1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
    const l2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
    return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
  } else {
    return undefined;
  }
}
