import { AnimationStyle, getElementKey, isElementOfType, ItemValue, StyleButtonReset } from "@apptane/react-ui-core";
import { Cue } from "@apptane/react-ui-cue";
import { Icon } from "@apptane/react-ui-icon";
import { Pane } from "@apptane/react-ui-pane";
import {
  ProgressVisualAppearance,
  ProgressVisualStyle,
  resolveFont,
  useVisualAppearance,
} from "@apptane/react-ui-theme";
import { StyleTextBase } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { Children, Fragment, useCallback } from "react";
import { ProgressItemProps, ProgressItemPropTypes, ProgressProps, ProgressPropTypes } from "./Progress.types";

const StyleTransition = (animation: AnimationStyle) => css`
  transition-property: background-color, color, fill;
  transition-delay: ${animation.delay}ms;
  transition-duration: ${animation.duration}ms;
  transition-timing-function: ${animation.function};
`;

const StyleContainer = (spacing: number) => css`
  display: flex;
  flex-direction: row;

  > button + button {
    margin-left: ${spacing}px;
  }
`;

const StyleItemBase = (style: ProgressVisualStyle, animation: AnimationStyle) => css`
  ${StyleButtonReset};
  ${StyleTransition(animation)};

  display: flex;
  flex-direction: row;

  align-items: center;
  flex-wrap: nowrap;
  justify-content: flex-start;

  padding: ${style.itemPadding.t}px ${style.itemPadding.r ?? style.itemPadding.l}px
    ${style.itemPadding.b ?? style.itemPadding.t} ${style.itemPadding.l}px;
`;

const StyleItemDefault = (appearance: ProgressVisualAppearance) => css`
  cursor: pointer;
  color: ${appearance.default};

  &:hover,
  &:focus {
    color: ${appearance.focused};
  }
`;

const StyleItemFocused = (appearance: ProgressVisualAppearance) => css`
  color: ${appearance.focused};
`;

const StyleItemDisabled = (appearance: ProgressVisualAppearance) => css`
  color: ${appearance.disabled};
  pointer-events: none;
`;

/**
 * `ProgressItem` component — individual progress stage.
 */
export function ProgressItem<T extends ItemValue>({ children }: ProgressItemProps<T>) {
  return <Fragment>{children}</Fragment>;
}

ProgressItem.displayName = "ProgressItem";
ProgressItem.propTypes = ProgressItemPropTypes;

/**
 * `Progress` component — represents progress through a sequence of stages, e.g, in the multi-step form.
 */
function Progress<T extends ItemValue>({
  children,
  colorMode,
  appearance,
  offset,
  spacing,
  alignment = "center",
  disabled,
  onChange,
  onItemClick,
  value,
  ...other
}: ProgressProps<T>) {
  const [visualAppearance, theme] = useVisualAppearance<ProgressVisualAppearance>("progress", colorMode, appearance);
  const visualStyle = theme.components.progress.style;

  spacing = spacing ?? visualStyle.itemSpacing;

  const onClick = useCallback(
    (value: T, event: React.MouseEvent) => {
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

  const items: JSX.Element[] = [];
  Children.forEach(children, (child, index) => {
    if (child && isElementOfType(child, ProgressItem)) {
      const item = child as React.ReactElement<ProgressItemProps<T>>;
      const itemChecked = value === item.props.value;
      const itemDisabled = item.props.disabled || disabled;

      const iconColor = itemDisabled
        ? visualAppearance.disabled
        : item.props.error
        ? visualAppearance.error
        : itemChecked
        ? visualAppearance.focused
        : visualAppearance.default;

      const iconName = item.props.completed
        ? "i:check-circle"
        : item.props.error
        ? "i:warning-circle"
        : "i:empty-circle";

      items.push(
        <button
          aria-selected={itemChecked}
          key={getElementKey(item, index)}
          css={[
            StyleItemBase(visualStyle, theme.components.progress.animation),
            !itemDisabled && !itemChecked && StyleItemDefault(visualAppearance),
            itemChecked && StyleItemFocused(visualAppearance),
            itemDisabled && StyleItemDisabled(visualAppearance),
          ]}
          value={item.props.value}
          onClick={onClick.bind(null, item.props.value)}
          disabled={itemDisabled}>
          {item.props.error ? (
            <Cue
              placement="top"
              color={iconColor}
              name={iconName}
              size={visualStyle.iconSize}
              marginRight={visualStyle.iconSpacing}>
              {item.props.error}
            </Cue>
          ) : (
            <Icon name={iconName} size={visualStyle.iconSize} color={iconColor} marginRight={visualStyle.iconSpacing} />
          )}
          <div css={StyleTextBase(resolveFont(theme.typography, visualStyle.font))}>{item.props.children}</div>
        </button>
      );
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
      accessibilityRole="navigation"
      {...other}>
      <div css={StyleContainer(spacing)}>{items}</div>
    </Pane>
  );
}

Progress.displayName = "Progress";
Progress.propTypes = ProgressPropTypes;

/**
 * `ProgressItem` component — individual progress stage.
 */
Progress.Item = ProgressItem;

export default Progress;
