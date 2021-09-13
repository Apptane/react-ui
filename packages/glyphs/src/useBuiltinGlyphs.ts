import { useEffect } from "react";
import Glyphs, { BuiltinGlyphs, BuiltinGlyphsNamespace } from "./Glyphs";

/**
 * Global variable referencing the root DOM node hosting glyphs.
 */
let glyphsRoot: HTMLElement | null;

function initGlyphsRoot(): HTMLElement {
  if (!glyphsRoot) {
    // check if the root already exists in DOM and create new one if not
    glyphsRoot = document.getElementById("--apptane-glyphs-root");
    if (!glyphsRoot) {
      glyphsRoot = document.createElement("div");
      glyphsRoot.setAttribute("id", "--apptane-glyphs-root");
      glyphsRoot.setAttribute("apptane-glyphs-root", "");
      glyphsRoot.style.display = "none";
      document.body.appendChild(glyphsRoot);

      const svgRoot = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svgRoot.style.display = "none";

      // initialize SVGs
      for (const key in Glyphs) {
        if (Object.prototype.hasOwnProperty.call(Glyphs, key)) {
          const p = Glyphs[key as BuiltinGlyphs];
          const symbol = document.createElementNS("http://www.w3.org/2000/svg", "symbol");
          symbol.setAttribute("id", BuiltinGlyphsNamespace + key);
          symbol.setAttributeNS(null, "viewBox", "0 0 24 24");
          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.setAttributeNS(null, "d", p);
          symbol.appendChild(path);
          svgRoot.appendChild(symbol);
        }
      }

      glyphsRoot.appendChild(svgRoot);
    }
  }

  return glyphsRoot;
}

/**
 * Hook that registers builtin glyphs.
 */
export function useBuiltinGlyphs() {
  useEffect(() => {
    initGlyphsRoot();
  }, []);
}
