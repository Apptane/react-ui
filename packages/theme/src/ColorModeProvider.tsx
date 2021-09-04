import { ColorMode } from "@apptane/react-ui-core";
import { createContext, useEffect, useState } from "react";

function subscribeToSystemColorSchemeChanges(update: (mode: ColorMode) => void) {
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const onChange = (e: MediaQueryListEvent) => update(e.matches ? "dark" : "light");

  // see also https://github.com/microsoft/TypeScript/issues/32210
  if (mql.addEventListener) {
    mql.addEventListener("change", onChange);
  } else {
    // deprecated 'MediaQueryList' API, <Safari 14, IE, <Edge 16
    mql.addListener(onChange);
  }

  // initial update
  update(mql.matches ? "dark" : "light");

  return () => {
    if (mql.removeEventListener) {
      mql.removeEventListener("change", onChange);
    } else {
      mql.removeListener(onChange);
    }
  };
}

/**
 * Color mode context.
 */
export const ColorModeContext = createContext("light" as ColorMode);

export interface ColorModeProviderProps {
  children?: React.ReactNode;

  /**
   * User-defined color mode. Defaults to `light`.
   */
  mode?: ColorMode;

  /**
   * Indicates that color mode should be based on the system settings.
   * User-defined color mode is ignored.
   */
  system?: boolean;
}

/**
 * Color mode provider.
 */
export function ColorModeProvider({ children, mode = "light", system }: ColorModeProviderProps) {
  const [systemMode, setSystemMode] = useState<ColorMode>(mode);

  useEffect(() => {
    let unsubscribe: () => void | undefined;
    if (system && "matchMedia" in window) {
      unsubscribe = subscribeToSystemColorSchemeChanges(setSystemMode);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [setSystemMode, system]);

  return <ColorModeContext.Provider value={system ? systemMode : mode}>{children}</ColorModeContext.Provider>;
}
