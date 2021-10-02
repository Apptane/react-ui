import { Button } from "@apptane/react-ui-button";
import { AnimationStyle, Color } from "@apptane/react-ui-core";
import { Pane } from "@apptane/react-ui-pane";
import { SideBarVisualAppearance, useVisualAppearance } from "@apptane/react-ui-theme";
import { css } from "@emotion/react";
import { useCallback, useLayoutEffect, useRef } from "react";
import { SideBarProps, SideBarPropTypes } from "./SideBar.types";
import SideBarAvatar from "./SideBarAvatar";
import SideBarContent from "./SideBarContent";
import { SideBarContext } from "./SideBarContext";
import SideBarGroup from "./SideBarGroup";
import SideBarItem from "./SideBarItem";

const StyleTransition = (animation: AnimationStyle, duration?: number) => css`
  transition-property: width, padding;
  transition-delay: ${animation.delay}ms;
  transition-duration: ${duration ?? animation.duration}ms;
  transition-timing-function: ${animation.function};
`;

const StyleSideBar = (
  animation: AnimationStyle,
  zindex: number,
  background: Color,
  width: number,
  duration?: number
) => css`
  z-index: ${zindex};
  display: flex;
  flex: none;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
  box-sizing: border-box;

  width: ${width}px;
  background: ${background};
  ${StyleTransition(animation, duration)};
`;

/**
 * `SideBar` component — sidebar navigation.
 */
function SideBar({
  children,
  colorMode,
  appearance = "default",
  collapsed,
  onStateChange,
  expandedWidth,
  collapsedWidth,
  expandedLogo,
  collapsedLogo,
  transitionDuration,
}: SideBarProps) {
  const [visualAppearance, theme] = useVisualAppearance<SideBarVisualAppearance>("sideBar", colorMode, appearance);
  const visualStyle = theme.components.sideBar.style;

  const sidebarRef = useRef<HTMLElement>(null);

  const width = (collapsed ? collapsedWidth : expandedWidth) ?? 0;

  const onToggleClick = useCallback(() => {
    if (typeof onStateChange === "function") {
      onStateChange(!collapsed);
    }
  }, [onStateChange, collapsed]);

  useLayoutEffect(() => {
    if (sidebarRef.current) {
      let items: HTMLButtonElement[] = Array.from(sidebarRef.current.querySelectorAll('[role="menuitem"]'));

      // remove disabled items
      items = items.filter((item) => !item.disabled);

      const firstItem = items[0];
      const lastItem = items[items.length - 1];

      // item.offsetParent === null
      // indicates hidden item or inside submenu

      function focusNext(item: HTMLButtonElement) {
        let index = items.indexOf(item);
        if (index >= items.length - 1) {
          item = firstItem;
        } else {
          do {
            index++;
            item = items[index];
          } while (item.offsetParent === null && index < items.length - 1);

          if (item.offsetParent === null) {
            item = firstItem;
          }
        }

        item.focus();
      }

      function focusPrev(item: HTMLButtonElement) {
        let index = items.indexOf(item);
        if (index > 0) {
          index--;
          item = items[index];
        } else {
          index = items.length - 1;
          item = lastItem;
        }

        while (item.offsetParent === null && index > 0) {
          index--;
          item = items[index];
        }

        item.focus();
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
      }

      items.forEach((item) => item.addEventListener("keydown", onKeyDown));
      return () => {
        items.forEach((item) => item.removeEventListener("keydown", onKeyDown));
      };
    }
  }, [sidebarRef, collapsed]);

  const toggleButton = typeof onStateChange === "function" && (
    <Button
      colorMode={colorMode}
      intent="neutral"
      appearance={appearance === "default" ? "minimal" : "inverted"}
      iconName="i:sidebar"
      size="default"
      onClick={onToggleClick}
      marginTop={collapsed && collapsedLogo ? visualStyle.padding.t * 2 : undefined}
      marginLeft={!collapsed && expandedLogo ? visualStyle.padding.l : undefined}
    />
  );

  return (
    <SideBarContext.Provider
      value={{
        expanded: !collapsed,
        width: width,
        appearance,
        colorMode,
      }}>
      <aside
        role="menubar"
        ref={sidebarRef}
        css={StyleSideBar(
          theme.components.sideBar.animation,
          theme.zindex.sidebar,
          visualAppearance.back,
          width,
          transitionDuration
        )}>
        <Pane
          orientation={collapsed ? "vertical" : "horizontal"}
          verticalAlignment={collapsed ? "top" : "center"}
          horizontalAlignment={collapsed ? "center" : "left"}
          paddingTop={visualStyle.padding.t}
          paddingRight={visualStyle.padding.r ?? visualStyle.padding.l}
          paddingBottom={visualStyle.padding.b ?? visualStyle.padding.t}
          paddingLeft={visualStyle.padding.l}>
          <Pane horizontalAlignment={collapsed ? "center" : "left"} grow={1}>
            {collapsed ? collapsedLogo : expandedLogo}
          </Pane>
          {toggleButton}
        </Pane>
        {children}
      </aside>
    </SideBarContext.Provider>
  );
}

SideBar.displayName = "SideBar";
SideBar.propTypes = SideBarPropTypes;

SideBar.Context = SideBarContext;

/**
 * Group of `SideBar` items.
 */
SideBar.Group = SideBarGroup;

/**
 * Static `SideBar` content.
 */
SideBar.Content = SideBarContent;

/**
 * Regular `SideBar` item.
 */
SideBar.Item = SideBarItem;

/**
 * Avatar `SideBar` item.
 */
SideBar.Avatar = SideBarAvatar;

export default SideBar;
