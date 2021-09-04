import { AnimationStyle, Color, ElevationStyle, getElementKey } from "@apptane/react-ui-core";
import { SideBarVisualAppearance, useVisualAppearance } from "@apptane/react-ui-theme";
import { css } from "@emotion/react";
import { Children, isValidElement, useCallback, useContext, useRef, useState } from "react";
import { SideBarContext } from "./SideBarContext";
import SideBarGroup from "./SideBarGroup";
import { SideBarItemProps, SideBarItemPropTypes } from "./SideBarItem.types";
import SideBarItemContent from "./SideBarItemContent";

const StyleTransition = (animation: AnimationStyle) => css`
  transition-property: left, width;
  transition-delay: ${animation.delay}ms;
  transition-duration: ${animation.duration}ms;
  transition-timing-function: ${animation.function};
`;

const StyleWrapper = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
`;

const StyleSubMenu = (
  animation: AnimationStyle,
  borderRadius: number,
  background: Color,
  elevation?: ElevationStyle
) => css`
  position: absolute;
  overflow: hidden;
  top: 0;
  background: ${background};
  border-top-right-radius: ${borderRadius}px;
  border-bottom-right-radius: ${borderRadius}px;

  ${elevation};
  ${StyleTransition(animation)};
`;

function SideBarItem({ children, colorMode, appearance, onClick, checked, ...other }: SideBarItemProps) {
  const context = useContext(SideBarContext);
  const [visualAppearance, theme] = useVisualAppearance<SideBarVisualAppearance>(
    "sideBar",
    colorMode ?? context.colorMode,
    appearance ?? context.appearance
  );

  const visualStyle = theme.components.sideBar.style;

  const subMenuRef = useRef<HTMLDivElement>(null);

  const [expandedSubMenu, setExpandedSubMenu] = useState(false);
  const hideSubMenu = useCallback(() => setExpandedSubMenu(false), [setExpandedSubMenu]);
  const toggleSubMenu = useCallback(() => setExpandedSubMenu((prevState) => !prevState), [setExpandedSubMenu]);

  const onItemBlur = useCallback(
    (e: React.FocusEvent) => {
      // do not hide when focus is moved to one of our immediate children
      if (
        subMenuRef.current &&
        !(e.relatedTarget && e.relatedTarget instanceof Node && subMenuRef.current.contains(e.relatedTarget))
      ) {
        hideSubMenu();
      }
    },
    [subMenuRef, hideSubMenu]
  );

  // effective checked state depends on nested items
  let effectiveChecked = checked;

  const subMenuItems: JSX.Element[] = [];
  Children.forEach(children, (child, index) => {
    if (child && isValidElement(child)) {
      const item = child as React.ReactElement<SideBarItemProps>;
      effectiveChecked = effectiveChecked || (!item.props.disabled && item.props.checked);
      subMenuItems.push(
        <SideBarItemContent
          key={getElementKey(item, index)}
          {...item.props}
          theme={theme}
          colorMode={colorMode ?? context.colorMode}
          visualAppearance={visualAppearance}
          visualStyle={visualStyle}
          height={visualStyle.itemHeight}
          padding={visualStyle.itemPadding}
          disabled={item.props.disabled || other.disabled}
          expanded
          onItemBlur={onItemBlur}
        />
      );
    }
  });

  const hasSubMenu = subMenuItems.length > 0;
  const subMenu = hasSubMenu && (
    <div
      ref={subMenuRef}
      css={[
        StyleSubMenu(
          theme.components.sideBar.animation,
          visualStyle.borderRadius,
          visualAppearance.back,
          theme.elevation(visualStyle.elevation)
        ),
        {
          display: expandedSubMenu ? "block" : "none",
          left: context.width - visualStyle.padding.l,
        },
      ]}>
      <SideBarGroup>{subMenuItems}</SideBarGroup>
    </div>
  );

  return (
    <div css={StyleWrapper}>
      <SideBarItemContent
        {...other}
        theme={theme}
        colorMode={colorMode ?? context.colorMode}
        visualAppearance={visualAppearance}
        visualStyle={visualStyle}
        height={visualStyle.itemHeight}
        padding={visualStyle.itemPadding}
        checked={effectiveChecked}
        onClick={hasSubMenu ? toggleSubMenu : onClick}
        onItemBlur={onItemBlur}
        hasSubMenu={hasSubMenu}
        expandedSubMenu={expandedSubMenu}
        expanded={context.expanded}
      />
      {subMenu}
    </div>
  );
}

SideBarItem.displayName = "SideBarItem";
SideBarItem.propTypes = SideBarItemPropTypes;

export default SideBarItem;
