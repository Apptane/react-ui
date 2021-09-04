import { ColorMode, ComponentSize, Intent, Palette } from "@apptane/react-ui-core";
import { useContext } from "react";
import { ColorModeContext } from "./ColorModeProvider";
import { Theme } from "./Theme.types";
import { ThemeContext } from "./ThemeProvider";

/**
 * Hook that returns the effective color mode.
 */
export function useColorMode(override?: ColorMode) {
  const mode = useContext(ColorModeContext);
  if (mode == null && !override) {
    throw new Error("useColorMode must be used within ColorModeProvider");
  }
  return override ?? mode;
}

/**
 * Hook that returns current theme.
 */
export function useTheme() {
  const theme = useContext(ThemeContext);
  if (theme == null) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return theme;
}

type ThemeComponents = Theme["components"][keyof Theme["components"]];
type ThemeComponentsVisualAppearances = ReturnType<ThemeComponents["appearance"]>;

/**
 * Hook that returns visual appearance for the component based on theme and color mode.
 */
export function useVisualAppearance<VisualAppearance extends ThemeComponentsVisualAppearances>(
  component: keyof Theme["components"],
  colorMode?: ColorMode,
  appearance?: void | string | ((palette: Palette, mode: ColorMode) => VisualAppearance),
  intent?: Intent,
  size?: ComponentSize
): [VisualAppearance, Theme, ColorMode] {
  const theme = useTheme();
  const mode = useColorMode(colorMode);
  const visualAppearance =
    appearance && typeof appearance === "function"
      ? appearance(theme.palette[mode], mode)
      : theme.components[component].appearance(
          theme.palette[mode],
          mode,
          appearance as never, // hack
          intent ?? "none",
          size ?? "default"
        );

  return [visualAppearance as VisualAppearance, theme, mode];
}
