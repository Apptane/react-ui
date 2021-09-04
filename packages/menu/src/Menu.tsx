import { ColorMode } from "@apptane/react-ui-core";
import { Pane } from "@apptane/react-ui-pane";
import { Scroller } from "@apptane/react-ui-scroller";
import { MenuAppearance, useTheme } from "@apptane/react-ui-theme";
import { css } from "@emotion/react";
import { Children, createContext, isValidElement, useLayoutEffect, useRef } from "react";
import { MenuProps, MenuPropTypes } from "./Menu.types";
import MenuDivider from "./MenuDivider";
import MenuItem from "./MenuItem";
import { MenuItemProps } from "./MenuItem.types";

const StyleWrapper = (width?: number | string, minWidth?: number) => css`
  width: ${width ? (typeof width === "string" ? width : `${width}px`) : "max-content"};
  ${minWidth && `min-width: ${minWidth}px`};
`;

const StyleContainer = (spacing: number) => css`
  display: flex;
  width: 100%;
  position: relative;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: hidden;
  pointer-events: all;
  outline: none;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 1;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  > * + * {
    margin-top: ${spacing}px !important;
  }
`;

export type MenuContext = {
  colorMode?: ColorMode;
  appearance?: MenuAppearance;
  itemHeight?: number;
  hasIcons: boolean;
};

export const MenuContext = createContext<MenuContext>({
  hasIcons: false,
});

/**
 * `Menu` component — a container for menu items.
 */
function Menu({
  children,
  colorMode,
  appearance,
  background,
  width,
  minWidth,
  itemHeight,
  maxHeight,
  popup,
  onEsc,
  ...other
}: MenuProps) {
  const theme = useTheme();
  const visualStyle = theme.components.menu.style;

  let hasIcons = false;
  Children.forEach(children, (child) => {
    if (child && isValidElement(child)) {
      const item = child as React.ReactElement<MenuItemProps>;
      hasIcons = hasIcons || item.props.iconData != null || item.props.iconName != null;
    }
  });

  const menuRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (menuRef.current) {
      let items: HTMLButtonElement[] = Array.from(
        menuRef.current.querySelectorAll('[role="menuitemradio"], [role="menuitem"]')
      );

      // remove disabled items
      items = items.filter((item) => item.tabIndex >= 0 && !item.disabled);

      const firstItem = items[0];
      const lastItem = items[items.length - 1];

      function focusNext(item: HTMLButtonElement) {
        const index = items.indexOf(item);
        if (index < items.length - 1) {
          items[index + 1].focus();
        } else {
          firstItem.focus();
        }
      }

      function focusPrev(item: HTMLButtonElement) {
        const index = items.indexOf(item);
        if (index > 0) {
          items[index - 1].focus();
        } else {
          lastItem.focus();
        }
      }

      function onKeyDown(event: KeyboardEvent) {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          focusNext(event.target as HTMLButtonElement);
        }

        if (event.key === "ArrowUp") {
          event.preventDefault();
          focusPrev(event.target as HTMLButtonElement);
        }

        if (event.key === "Home") {
          event.preventDefault();
          firstItem.focus();
        }

        if (event.key === "End") {
          event.preventDefault();
          lastItem.focus();
        }

        if (event.key === "Escape" && typeof onEsc === "function") {
          event.preventDefault();
          onEsc();
        }
      }

      items.forEach((item) => item.addEventListener("keydown", onKeyDown));
      return () => {
        items.forEach((item) => item.removeEventListener("keydown", onKeyDown));
      };
    }
  }, [menuRef, onEsc]);

  const menu = (
    <div ref={menuRef} role="menu" css={popup ? StyleWrapper("100%") : StyleWrapper(width, minWidth)}>
      <Scroller colorMode={colorMode} maxHeight={maxHeight}>
        <div css={StyleContainer(visualStyle.itemSpacing)}>
          <MenuContext.Provider
            value={{
              colorMode,
              appearance,
              hasIcons,
              itemHeight,
            }}>
            {children}
          </MenuContext.Provider>
        </div>
      </Scroller>
    </div>
  );

  const padding = visualStyle.padding;
  return popup ? (
    <Pane
      colorMode={colorMode}
      grow={1}
      shrink={1}
      width={width ?? "max-content"}
      minWidth={minWidth}
      paddingTop={padding.t}
      paddingRight={padding.r ?? padding.l}
      paddingBottom={padding.b ?? padding.t}
      paddingLeft={padding.l}
      cornerRadius={visualStyle.borderRadius}
      background={background ?? (appearance === "inverted" ? "black" : "white")}
      elevation={visualStyle.elevation}
      {...other}>
      {menu}
    </Pane>
  ) : (
    menu
  );
}

Menu.displayName = "Menu";
Menu.propTypes = MenuPropTypes;

/**
 * `Regular` menu item.
 */
Menu.Item = MenuItem;

/**
 * `Divider` menu item.
 */
Menu.Divider = MenuDivider;

export default Menu;
