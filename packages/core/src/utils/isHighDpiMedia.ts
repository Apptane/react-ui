/**
 * Determines if the code is running on high DPI screen.
 */
export function isHighDpiMedia() {
  if (typeof window !== "undefined" && window !== null) {
    if (window.devicePixelRatio > 1.25) {
      return true;
    }

    const mediaQuery =
      "(-webkit-min-device-pixel-ratio: 1.25), (min--moz-device-pixel-ratio: 1.25), (-o-min-device-pixel-ratio: 5/4), (min-resolution: 1.25dppx)";

    if (window.matchMedia && window.matchMedia(mediaQuery).matches) {
      return true;
    }
  }

  return false;
}
