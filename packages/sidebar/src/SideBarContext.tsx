import { ColorMode, Palette } from "@apptane/react-ui-core";
import { SideBarAppearance, SideBarVisualAppearance } from "@apptane/react-ui-theme";
import { createContext } from "react";

export interface SideBarContext {
  colorMode?: ColorMode;
  appearance?: SideBarAppearance | ((palette: Palette, mode: ColorMode) => SideBarVisualAppearance);
  expanded: boolean;
  width: number;
}

export const SideBarContext = createContext<SideBarContext>({
  expanded: false,
  width: 0,
});
