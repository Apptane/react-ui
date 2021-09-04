import { ColorMode, Intent, Palette } from "@apptane/react-ui-core";
import memoize from "memoizee";
import { BulletTheme } from "./BulletTheme.types";

function getBackColor(palette: Palette, intent: Intent, mode: ColorMode) {
  switch (intent) {
    case "success":
      return palette.pigments.green[mode === "dark" ? 400 : 300];
    case "warning":
      return palette.pigments.orange[mode === "dark" ? 400 : 300];
    case "danger":
    case "error":
      return palette.pigments.red[400];
    case "neutral":
      return "transparent";
    default:
      return palette.pigments[palette.mapping.accent][400];
  }
}

const DefaultBulletTheme: BulletTheme = {
  style: {
    size: 9,
  },
  appearance: memoize((palette, mode, _, intent) => ({
    back: getBackColor(palette, intent, mode),
    border: intent === "neutral" ? palette.text[400] : palette.white,
    borderWidth: intent === "neutral" ? 2 : 1,
  })),
};

/**
 * Default theme: Bullet
 */
export default DefaultBulletTheme;
