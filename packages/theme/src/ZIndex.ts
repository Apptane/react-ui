import { ZI, ZIndex } from "./ZIndex.types";

const DefaultZIndex: ZIndex = {
  [ZI.SideBar]: 1000,
  [ZI.Overlay]: 1010,
  [ZI.Tooltip]: 1020,
  [ZI.Toast]: 1030,
};

/**
 * Default theme: z-index
 */
export default DefaultZIndex;
