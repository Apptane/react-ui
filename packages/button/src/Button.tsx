import { Badge } from "@apptane/react-ui-badge";
import {
  AnimationStyle,
  ContentAlignment,
  findVisualStyleBySize,
  getComponentSize,
  ItemValue,
  StyleButtonReset,
  StyleMargin,
} from "@apptane/react-ui-core";
import { Icon } from "@apptane/react-ui-icon";
import { Spinner } from "@apptane/react-ui-spinner";
import { ButtonVisualAppearance, FontProperties, resolveFont, useVisualAppearance } from "@apptane/react-ui-theme";
import { createTooltip } from "@apptane/react-ui-tooltip";
import { StyleTextBase } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { useCallback } from "react";
import { ButtonProps, ButtonPropTypes } from "./Button.types";

const StyleTransition = (animation: AnimationStyle) => css`
  transition-property: border, background-color, color, fill;
  transition-delay: ${animation.delay}ms;
  transition-duration: ${animation.duration}ms;
  transition-timing-function: ${animation.function};
`;

const StyleBeforeContentPseudo = (width: number) => css`
  &::before {
    content: "";
    margin-right: auto;
    width: ${width}px;
  }
`;

const StyleAfterContentPseudo = (width: number) => css`
  &::after {
    content: "";
    margin-left: auto;
    width: ${width}px;
  }
`;

const StyleBeforeContentAlignment = css`
  > [data-slot="before-content"] {
    margin-right: auto;
  }
`;

const StyleAfterContentAlignment = css`
  > [data-slot="after-content"] {
    margin-left: auto;
  }
`;

const StyleBase = (
  animation: AnimationStyle,
  font: FontProperties,
  alignment: ContentAlignment,
  gap: number,
  padding: number,
  borderRadius: number,
  borderWidth?: number,
  inline?: boolean
) => css`
  ${StyleButtonReset};

  display: ${inline ? "inline-flex" : "flex"};
  position: relative;

  // geometry
  padding: 0 ${padding}px;
  border-radius: ${borderRadius}px;

  ${borderWidth && `border: solid ${borderWidth}px transparent`};

  // behavior
  cursor: pointer;

  // content and appearance
  ${StyleTextBase(font)};
  text-align: ${alignment};
  justify-content: ${alignment === "left" ? "flex-start" : alignment === "right" ? "flex-end" : "center"};

  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  flex-wrap: nowrap;
  flex: initial;
  gap: ${gap}px;

  ${StyleTransition(animation)};
  > svg {
    ${StyleTransition(animation)};
  }
`;

const StyleChecked = (appearance: ButtonVisualAppearance) => css`
  color: ${appearance.toggled.text};
  ${appearance.toggled.back && `background-color: ${appearance.toggled.back}`};
  ${appearance.toggled.border && `border-color: ${appearance.toggled.border}`};
`;

const StyleDisabled = (appearance: ButtonVisualAppearance) => css`
  pointer-events: none;
  color: ${appearance.disabled.text};
  ${appearance.disabled.back && `background-color: ${appearance.disabled.back}`};
  ${appearance.disabled.border && `border-color: ${appearance.disabled.border}`};
`;

/**
 * HACK: normally we should have set icon color via
 * corresponding property, but since maintaining both
 * hover and focused states for the button via events
 * is an overkill we override via CSS
 * NOTE: THIS DOESN'T WORK FOR STROKE-BASED SVGs :-\
 */
const StyleDefault = (appearance: ButtonVisualAppearance) => css`
  color: ${appearance.default.text};
  ${appearance.default.back && `background-color: ${appearance.default.back}`};
  ${appearance.default.border && `border-color: ${appearance.default.border}`};

  > svg {
    fill: ${appearance.default.icon};
  }

  &:hover:not(:active),
  &:focus:not(:active) {
    color: ${appearance.focused.text};
    ${appearance.focused.back && `background-color: ${appearance.focused.back}`};
    ${appearance.focused.border && `border-color: ${appearance.focused.border}`};

    > svg {
      fill: ${appearance.focused.icon};
    }
  }

  &:active {
    color: ${appearance.toggled.text};
    ${appearance.toggled.back && `background-color: ${appearance.toggled.back}`};
    ${appearance.toggled.border && `border-color: ${appearance.toggled.border}`};

    > svg {
      fill: ${appearance.toggled.icon};
    }

    ${appearance.default.active && `transform: ${appearance.default.active}`};
  }
`;

const StyleSpinner = (size: number) => css`
  display: grid;
  place-items: center;
  min-width: ${size}px;
  min-height: ${size}px;
`;

/**
 * `Button` component — generic button with support for multiple visual appearances.
 */
function Button<T extends ItemValue>({
  children,
  disabled,
  checked,
  onClick,
  preventDefault,
  value,
  inline,
  badge,
  size = "default",
  width,
  appearance = "primary",
  colorMode,
  intent = "none",
  alignment = "center",
  padding,
  spinner,
  iconAfterName,
  iconAfterData,
  iconBeforeName,
  iconBeforeData,
  iconName,
  iconData,
  iconSize = 24,
  round,
  autoFocus,
  accessibilityLabel,
  accessibilityRole,
  tooltip,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  m,
  mt,
  mr,
  mb,
  ml,
  ...other
}: ButtonProps<T>) {
  const [visualAppearance, theme] = useVisualAppearance<ButtonVisualAppearance>(
    "button",
    colorMode,
    appearance,
    intent,
    typeof size === "number" ? "default" : size
  );

  const actualHeight = getComponentSize(theme.components.button.sizes, size);
  const visualStyle = findVisualStyleBySize(theme.components.button.styles, actualHeight);

  const effectiveAppearance = typeof appearance !== "function" ? appearance : "primary";

  // button is disabled automatically when spinner is visible
  disabled = disabled || (spinner != null && spinner !== false);

  // NB: we are using somewhat hack-ish approach to control
  // embedded icon color (fill) to support focus/hover via
  // CSS selectors. The idea is to supply 'none' as the color
  // value to <Icon/> and then override it with CSS rule.
  const normal = !disabled && !checked;
  let iconColor;
  if (disabled) {
    iconColor = visualAppearance.disabled.icon;
  } else if (checked) {
    iconColor = visualAppearance.toggled.icon;
  }

  // border radius and width
  const borderRadius = round ? Math.ceil(actualHeight / 2) : visualStyle.borderRadius;
  const borderWidth =
    typeof visualStyle.borderWidth === "function"
      ? visualStyle.borderWidth(effectiveAppearance)
      : visualStyle.borderWidth;

  // icon only content
  const iconOnly = iconName || iconData;
  const roundOrSquare = iconOnly || round;

  // left/right padding adjusted for border
  const paddingLR =
    (roundOrSquare ? (actualHeight - iconSize) / 2 : padding ?? visualStyle.padding) - (borderWidth ?? 0);

  // support for icon-only content
  if (iconOnly) {
    children = spinner ? undefined : (
      <Icon color={normal ? "none" : iconColor} name={iconName} data={iconData} size={iconSize} />
    );
  }

  accessibilityRole = accessibilityRole ?? "button";

  const clickHandler = useCallback(
    (event: React.SyntheticEvent) => {
      if (preventDefault) {
        event.preventDefault();
        event.stopPropagation();
      }

      if (typeof onClick === "function") {
        onClick(event, value);
      }
    },
    [value, onClick, preventDefault]
  );

  const font = typeof visualStyle.font === "function" ? visualStyle.font(effectiveAppearance) : visualStyle.font;

  // NB: we should track hover/blur for the button to correctly
  // adjust badge appearance for focused state; current approach
  // leaves badge rendering somewhat lacking for minimal and tertiary
  const badgeAppearance = disabled
    ? visualAppearance.disabled.badge
    : checked
    ? visualAppearance.toggled.badge
    : visualAppearance.default.badge;

  const hasBeforeContent = iconBeforeName || iconBeforeData;
  const hasAfterContent = iconAfterName || iconAfterData;
  const withContentSpacing = !iconOnly && alignment !== "left" && alignment !== "right";
  const withBeforeContent = withContentSpacing && !hasBeforeContent && hasAfterContent && !spinner;
  const withAfterContent = withContentSpacing && !hasAfterContent && (hasBeforeContent || (spinner && width));
  const alignBeforeContent = !iconOnly && (alignment === "center" || alignment === "right");
  const alignAfterContent = !iconOnly && (alignment === "center" || alignment === "left");

  // NB: ...other here is required to spread native event handlers
  // that we may want to attach to our custom button, e.g. onMouseEnter
  const marginProps = { margin, marginTop, marginRight, marginBottom, marginLeft, m, mt, mr, mb, ml };
  const button = (
    <button
      {...other}
      role={accessibilityRole}
      data-autofocus={autoFocus ? "" : undefined}
      autoFocus={autoFocus}
      aria-checked={accessibilityRole === "radio" ? (checked ? true : false) : undefined}
      aria-pressed={accessibilityRole === "button" ? (checked ? true : false) : undefined}
      aria-busy={spinner ? true : undefined}
      aria-label={accessibilityLabel}
      css={[
        StyleBase(
          theme.components.button.animation,
          resolveFont(theme.typography, font),
          alignment,
          visualStyle.iconSpacing,
          paddingLR,
          borderRadius,
          borderWidth,
          inline
        ),
        StyleMargin(marginProps),
        withBeforeContent && StyleBeforeContentPseudo(iconSize),
        withAfterContent && StyleAfterContentPseudo(iconSize),
        alignBeforeContent && StyleBeforeContentAlignment,
        alignAfterContent && StyleAfterContentAlignment,
        disabled && StyleDisabled(visualAppearance),
        checked && StyleChecked(visualAppearance),
        normal && StyleDefault(visualAppearance),
        {
          height: actualHeight,
          width: roundOrSquare ? actualHeight : width || "max-content",
        },
      ]}
      disabled={disabled}
      value={value}
      onClick={disabled ? undefined : clickHandler}>
      {spinner && (
        <div data-slot="before-content" css={StyleSpinner(iconSize)}>
          <Spinner
            size={visualStyle.spinnerSize}
            appearance={typeof spinner === "boolean" ? visualStyle.spinner : spinner}
            colorMode={colorMode}
            color={iconColor}
          />
        </div>
      )}
      {!spinner && (iconBeforeName || iconBeforeData) && (
        <Icon
          data-slot="before-content"
          colorMode={colorMode}
          color={normal ? "none" : iconColor}
          name={iconBeforeName}
          data={iconBeforeData}
          size={iconSize}
        />
      )}
      {children}
      {badge && !iconOnly && badgeAppearance && (
        <Badge colorMode={colorMode} size="small" bulletVisible={false} value={badge} appearance={badgeAppearance} />
      )}
      {(iconAfterName || iconAfterData) && (
        <Icon
          data-slot="after-content"
          colorMode={colorMode}
          color={normal ? "none" : iconColor}
          name={iconAfterName}
          data={iconAfterData}
          size={iconSize}
        />
      )}
    </button>
  );

  return tooltip
    ? createTooltip({
        children: button,
        content: tooltip,
        inline: inline,
        colorMode: colorMode,
      })
    : button;
}

Button.displayName = "Button";
Button.propTypes = ButtonPropTypes;

export default Button;
