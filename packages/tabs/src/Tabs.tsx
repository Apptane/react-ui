import {
  AnimationStyle,
  convertToPixels,
  findVisualStyleBySize,
  getComponentSize,
  getElementKey,
  isElementOfType,
  ItemValue,
  StyleButtonReset,
} from "@apptane/react-ui-core";
import { Pane } from "@apptane/react-ui-pane";
import { resolveFont, TabsVisualAppearance, TabsVisualStyle, useVisualAppearance } from "@apptane/react-ui-theme";
import { StyleTextBase } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { Children, Fragment, isValidElement, useCallback } from "react";
import { TabItemProps, TabItemPropTypes, TabsProps, TabsPropTypes } from "./Tabs.types";

const StyleTransition = (animation: AnimationStyle) => css`
  transition-property: border, background-color, color;
  transition-delay: ${animation.delay}ms;
  transition-duration: ${animation.duration}ms;
  transition-timing-function: ${animation.function};
`;

const StyleItemBase = (style: TabsVisualStyle, animation: AnimationStyle) => css`
  ${StyleButtonReset};

  display: flex;
  position: relative;

  align-items: center;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: flex-start;

  padding: ${style.itemPadding.t}px ${style.itemPadding.r ?? style.itemPadding.l}px 0 ${style.itemPadding.l}px;
  ${StyleTransition(animation)};

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: ${convertToPixels(style.accentWidth)};
    height: ${style.accentHeight}px;
    border-radius: ${style.accentBorderRadius}px;
    ${StyleTransition(animation)};
  }
`;

const StyleItemDefault = (appearance: TabsVisualAppearance) => css`
  cursor: pointer;
  color: ${appearance.default.text};
  &::after {
    ${appearance.default.accent && `background: ${appearance.default.accent}`};
  }

  &:hover,
  &:focus {
    color: ${appearance.focused.text};
    &::after {
      ${appearance.focused.accent && `background: ${appearance.focused.accent}`};
    }
  }
`;

const StyleItemToggled = (appearance: TabsVisualAppearance) => css`
  color: ${appearance.toggled.text};
  &::after {
    ${appearance.toggled.accent && `background: ${appearance.toggled.accent}`};
  }
`;

const StyleItemDisabled = (appearance: TabsVisualAppearance) => css`
  color: ${appearance.disabled.text};
  pointer-events: none;
`;

/**
 * `TabItem` component — individual tab item.
 */
export function TabItem<T extends ItemValue>({ children }: TabItemProps<T>) {
  return <Fragment>{children}</Fragment>;
}

TabItem.displayName = "TabItem";
TabItem.propTypes = TabItemPropTypes;

/**
 * `Tab` component — container of tab items.
 */
function Tabs<T extends ItemValue>({
  children,
  colorMode,
  appearance,
  size = "default",
  offset,
  spacing,
  alignment = "center",
  border,
  disabled,
  onChange,
  onItemClick,
  value,
  ...other
}: TabsProps<T>) {
  const [visualAppearance, theme] = useVisualAppearance<TabsVisualAppearance>(
    "tabs",
    colorMode,
    appearance,
    "none",
    typeof size === "number" ? "default" : size
  );

  const actualSize = getComponentSize(theme.components.tabs.sizes, size);
  const visualStyle = findVisualStyleBySize(theme.components.tabs.styles, actualSize);

  spacing = spacing ?? visualStyle.itemSpacing;

  const onClick = useCallback(
    (value: T, event: React.SyntheticEvent) => {
      if (typeof event.preventDefault === "function") {
        event.preventDefault();
      }

      if (typeof event.stopPropagation === "function") {
        event.stopPropagation();
      }

      if (typeof onItemClick === "function") {
        onItemClick(value);
      }

      if (typeof onChange === "function") {
        onChange(value);
      }
    },
    [onChange, onItemClick]
  );

  const tabs: JSX.Element[] = [];
  const tail: JSX.Element[] = [];

  Children.forEach(children, (child, index) => {
    if (child) {
      if (isElementOfType(child, TabItem)) {
        const item = child as React.ReactElement<TabItemProps<T>>;
        const itemChecked = value === item.props.value;
        const itemDisabled = item.props.disabled || disabled;

        tabs.push(
          <button
            role="tab"
            aria-selected={itemChecked}
            key={getElementKey(item, index)}
            css={[
              StyleItemBase(visualStyle, theme.components.tabs.animation),
              !itemDisabled && !itemChecked && StyleItemDefault(visualAppearance),
              itemChecked && StyleItemToggled(visualAppearance),
              itemDisabled && StyleItemDisabled(visualAppearance),
              {
                marginLeft: tabs.length > 0 ? spacing : 0,
              },
            ]}
            value={item.props.value}
            onClick={onClick.bind(null, item.props.value)}
            disabled={itemDisabled}>
            <div css={StyleTextBase(resolveFont(theme.typography, visualStyle.font))}>{item.props.children}</div>
          </button>
        );
      } else if (isValidElement(child)) {
        tail.push(child);
      }
    }
  });

  return (
    <Pane
      colorMode={colorMode}
      orientation="horizontal"
      horizontalAlignment={alignment}
      verticalAlignment="stretch"
      grow={0}
      shrink={0}
      paddingLeft={alignment === "left" ? offset : undefined}
      paddingRight={alignment === "right" ? offset : undefined}
      height={actualSize}
      accessibilityRole="tablist"
      borderBottom={border ? visualAppearance.border : undefined}
      {...other}>
      {tabs}
      {tail}
    </Pane>
  );
}

Tabs.displayName = "Tabs";
Tabs.propTypes = TabsPropTypes;

/**
 * `TabItem` component — individual tab item.
 */
Tabs.Item = TabItem;

export default Tabs;
