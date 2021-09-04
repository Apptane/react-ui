import { Color, resolveBorderColor } from "@apptane/react-ui-core";
import { useColorMode, useTheme } from "@apptane/react-ui-theme";
import { css } from "@emotion/react";
import { useContext } from "react";
import { MenuContext } from "./Menu";

const StyleBase = (size: number, color: Color) => css`
  box-sizing: border-box;
  height: ${size}px;
  border-bottom: solid 1px ${color};
`;

function MenuDivider() {
  const menu = useContext(MenuContext);
  const theme = useTheme();
  const colorMode = useColorMode(menu.colorMode);
  return (
    <div
      css={StyleBase(theme.components.menu.style.dividerSize, resolveBorderColor(theme.palette[colorMode], "divider"))}
    />
  );
}

MenuDivider.displayName = "MenuDivider";

export default MenuDivider;
