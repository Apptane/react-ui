import { Badge } from "@apptane/react-ui-badge";
import { AnimationStyle, StyleButtonReset } from "@apptane/react-ui-core";
import { Icon } from "@apptane/react-ui-icon";
import { FontProperties, MenuVisualAppearance, resolveFont, useVisualAppearance } from "@apptane/react-ui-theme";
import { StyleTextBase } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { useContext } from "react";
import { MenuContext } from "./Menu";
import { MenuItemProps, MenuItemPropTypes } from "./MenuItem.types";

const StyleTransition = (animation: AnimationStyle) => css`
  transition-property: border, background-color, color, fill;
  transition-delay: ${animation.delay}ms;
  transition-duration: ${animation.duration}ms;
  transition-timing-function: ${animation.function};
`;

const StyleBase = (
  animation: AnimationStyle,
  font: FontProperties,
  height: number,
  padding: number,
  borderRadius: number
) => css`
  ${StyleButtonReset};

  display: flex;

  // dimensions
  height: ${height}px;
  padding: 0 ${padding}px;
  border-radius: ${borderRadius}px;

  // behavior
  cursor: pointer;

  // content
  ${StyleTextBase(font)};
  text-align: left;

  flex-orientation: row;
  align-items: center;
  white-space: nowrap;
  flex-wrap: nowrap;
  flex: initial;

  ${StyleTransition(animation)};
  svg {
    ${StyleTransition(animation)};
  }
`;

const StyleChecked = (appearance: MenuVisualAppearance) => css`
  color: ${appearance.toggled.text};
  ${appearance.toggled.back && `background-color: ${appearance.toggled.back}`};
`;

const StyleDisabled = (appearance: MenuVisualAppearance) => css`
  pointer-events: none;
  color: ${appearance.disabled.text};
  ${appearance.disabled.back && `background-color: ${appearance.disabled.back}`};
`;

const StyleDefault = (appearance: MenuVisualAppearance, iconColorOverride?: boolean) => css`
  color: ${appearance.default.text};
  ${appearance.default.back && `background-color: ${appearance.default.back}`};

  svg {
    ${!iconColorOverride && `fill: ${appearance.default.icon}`};
  }

  &:hover:not(:active),
  &:focus:not(:active) {
    color: ${appearance.focused.text};
    ${appearance.focused.back && `background-color: ${appearance.focused.back}`};

    svg {
      ${!iconColorOverride && `fill: ${appearance.focused.icon}`};
    }
  }

  &:active {
    color: ${appearance.toggled.text};
    ${appearance.toggled.back && `background-color: ${appearance.toggled.back}`};

    svg {
      ${!iconColorOverride && `fill: ${appearance.toggled.icon}`};
    }
  }
`;

const StyleContent = (offset: number) => css`
  flex: 1 1 auto;
  margin-left: ${offset}px;
`;

function MenuItem({
  children,
  colorMode,
  appearance,
  intent = "none",
  badge,
  height,
  disabled,
  checked,
  onClick,
  iconName,
  iconData,
  iconSize = 24,
  iconColor,
}: MenuItemProps) {
  const menu = useContext(MenuContext);
  const [visualAppearance, theme] = useVisualAppearance<MenuVisualAppearance>(
    "menu",
    colorMode ?? menu.colorMode,
    appearance ?? menu.appearance ?? "default",
    intent
  );

  const visualStyle = theme.components.menu.style;

  const normal = !disabled && !checked;
  let stateIconColor;
  if (disabled) {
    stateIconColor = visualAppearance.disabled.icon;
  } else if (checked) {
    stateIconColor = visualAppearance.toggled.icon;
  }

  const badgeAppearance = disabled
    ? visualAppearance.disabled.badge
    : checked
    ? visualAppearance.toggled.badge
    : visualAppearance.default.badge;

  const hasIcon = iconName || iconData;

  return (
    <button
      css={[
        StyleBase(
          theme.components.menu.animation,
          resolveFont(theme.typography, visualStyle.font),
          height ?? menu.itemHeight ?? 36,
          visualStyle.itemPadding,
          visualStyle.borderRadius
        ),
        disabled && StyleDisabled(visualAppearance),
        checked && StyleChecked(visualAppearance),
        normal && StyleDefault(visualAppearance, iconColor != null),
      ]}
      role="menuitem"
      disabled={disabled}
      onClick={disabled ? undefined : onClick}>
      {menu.hasIcons && hasIcon && (
        <Icon
          color={iconColor ?? (normal ? "none" : stateIconColor)}
          name={iconName}
          data={iconData}
          size={iconSize}
          marginRight={visualStyle.iconSpacing}
        />
      )}
      <div css={StyleContent(menu.hasIcons && !hasIcon ? iconSize + visualStyle.iconSpacing : 0)}>{children}</div>
      {badge && badgeAppearance && (
        <Badge
          size="small"
          intent={intent}
          bulletVisible={false}
          value={badge}
          marginLeft={visualStyle.iconSpacing}
          appearance={badgeAppearance}
        />
      )}
    </button>
  );
}

MenuItem.displayName = "MenuItem";
MenuItem.propTypes = MenuItemPropTypes;

export default MenuItem;
