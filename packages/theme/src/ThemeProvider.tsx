import { createContext } from "react";
import DefaultTheme from "./DefaultTheme";
import { Theme } from "./Theme.types";

/**
 * Theme context that defines theme color palette, dimensions and
 * sizing guidelines.
 */
export const ThemeContext = createContext(DefaultTheme);

export interface ThemeProviderProps {
  children?: React.ReactNode;

  /**
   * Theme to use.
   */
  theme: Theme;
}

/**
 * Theme provider.
 */
export function ThemeProvider({ children, theme }: ThemeProviderProps) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
