import { Badge } from "@apptane/react-ui-badge";
import { Bullet } from "@apptane/react-ui-bullet";
import { AnimationStyle, ColorMode, StyleButtonReset } from "@apptane/react-ui-core";
import { Icon } from "@apptane/react-ui-icon";
import {
  FontProperties,
  resolveFont,
  SideBarVisualAppearance,
  SideBarVisualStyle,
  Theme,
} from "@apptane/react-ui-theme";
import { createTooltip } from "@apptane/react-ui-tooltip";
import { StyleTextBase } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { SideBarItemProps } from "./SideBarItem.types";

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

const StyleChecked = (appearance: SideBarVisualAppearance) => css`
  color: ${appearance.toggled.text};
  ${appearance.toggled.back && `background-color: ${appearance.toggled.back}`};
`;

const StyleDisabled = (appearance: SideBarVisualAppearance) => css`
  pointer-events: none;
  color: ${appearance.disabled.text};
  ${appearance.disabled.back && `background-color: ${appearance.disabled.back}`};
`;

const StyleDefault = (appearance: SideBarVisualAppearance, iconColorOverride?: boolean) => css`
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

const StyleContent = css`
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

type SideBarItemContentProps = SideBarItemProps & {
  theme: Theme;
  colorMode?: ColorMode;
  visualAppearance: SideBarVisualAppearance;
  visualStyle: SideBarVisualStyle;
  height: number;
  padding: number;
  onItemBlur?: React.FocusEventHandler;
  onItemFocus?: React.FocusEventHandler;
  expanded: boolean;
  hasSubMenu?: boolean;
  expandedSubMenu?: boolean;
};

function SideBarItemContent({
  theme,
  colorMode,
  visualAppearance,
  visualStyle,
  height,
  padding,
  onItemBlur,
  onItemFocus,
  expanded,
  hasSubMenu,
  expandedSubMenu,
  content,
  collapsedContent,
  tooltipContent,
  intent,
  badge,
  disabled,
  checked,
  onClick,
  iconName,
  iconData,
  iconSize,
  iconColor,
}: SideBarItemContentProps) {
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

  const iconVisible = !!(iconName || iconData);
  const badgeVisible = !!(badge && badgeAppearance);

  const icon = (
    <Icon
      colorMode={colorMode}
      color={iconColor ?? (normal ? "none" : stateIconColor)}
      name={iconName}
      data={iconData}
      size={iconSize ?? visualStyle.iconSize}
      marginRight={expanded ? visualStyle.iconSpacing : undefined}
    />
  );

  const element = (
    <button
      css={[
        StyleBase(
          theme.components.sideBar.animation,
          resolveFont(theme.typography, visualStyle.font.item),
          height,
          padding,
          visualStyle.borderRadius
        ),
        disabled && StyleDisabled(visualAppearance),
        checked && StyleChecked(visualAppearance),
        normal && StyleDefault(visualAppearance, iconColor != null),
      ]}
      role="menuitem"
      aria-label={typeof content === "string" ? content : undefined}
      aria-haspopup={hasSubMenu}
      aria-expanded={hasSubMenu && expandedSubMenu}
      onClick={disabled ? undefined : onClick}
      onBlur={onItemBlur}
      onFocus={onItemFocus}
      disabled={disabled}>
      {!expanded &&
        (badgeVisible && intent ? (
          <Bullet colorMode={colorMode} intent={intent}>
            {collapsedContent ?? icon}
          </Bullet>
        ) : (
          collapsedContent ?? icon
        ))}
      {expanded && iconVisible && icon}
      {expanded && <div css={StyleContent}>{content}</div>}
      {expanded && badgeVisible && (
        <Badge
          colorMode={colorMode}
          size="small"
          intent={intent}
          bulletVisible={false}
          value={badge}
          marginLeft={visualStyle.iconSpacing}
          appearance={badgeAppearance}
        />
      )}
      {expanded && hasSubMenu && (
        <Icon
          colorMode={colorMode}
          color={iconColor ?? (normal ? "none" : stateIconColor)}
          name="i:arrow-left"
          size={iconSize ?? visualStyle.iconSize}
          marginLeft={visualStyle.iconSpacing}
        />
      )}
    </button>
  );

  return !expanded
    ? createTooltip({
        children: element,
        content: tooltipContent ?? content,
        placement: "right",
        arrowVisible: true,
        colorMode: colorMode,
      })
    : element;
}

SideBarItemContent.displayName = "SideBarItemContent";

export default SideBarItemContent;
