export enum ZI {
  SideBar = "sidebar",
  Overlay = "overlay",
  Tooltip = "tooltip",
  Toast = "toast",
}

export type ZIndex = {
  [name in ZI]: number;
};
