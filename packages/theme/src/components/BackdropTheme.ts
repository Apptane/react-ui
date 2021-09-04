import { Palette, resolveBackgroundColor } from "@apptane/react-ui-core";
import { BackdropTheme } from "./BackdropTheme.types";

export const DefaultBackdropTheme: BackdropTheme = {
  appearance: (palette: Palette) => ({
    opacity: 0.8,
    color: resolveBackgroundColor(palette, "backdrop"),
  }),
};

/**
 * Default theme: Backdrop
 */
export default DefaultBackdropTheme;
