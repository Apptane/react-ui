import {
  AnimationStyle,
  Color,
  ContentAlignment,
  findVisualStyleBySize,
  getComponentSize,
  getElementKey,
  Padding,
  resolveBorderColor,
  resolveTextColor,
  StyleMargin,
  StyleOutlineReset,
} from "@apptane/react-ui-core";
import { Cue } from "@apptane/react-ui-cue";
import { Icon } from "@apptane/react-ui-icon";
import {
  FontProperties,
  InputBoxVisualAppearance,
  InputBoxVisualState,
  InputBoxVisualStateAppearance,
  resolveFont,
  useVisualAppearance,
} from "@apptane/react-ui-theme";
import { Paragraph, StyleTextBase } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { Children, cloneElement, forwardRef, Fragment, isValidElement, useCallback, useState } from "react";
import { InputBoxProps, InputBoxPropTypes } from "./InputBox.types";

const StyleTransition = (animation: AnimationStyle) => css`
  transition-property: border-color, background-color, color, fill;
  transition-delay: ${animation.delay}ms;
  transition-duration: ${animation.duration}ms;
  transition-timing-function: ${animation.function};
`;

const StyleBase = (
  animation: AnimationStyle,
  radius: number,
  placeholder: Color,
  inline?: boolean,
  cursor?: string
) => css`
  ${StyleOutlineReset};

  display: ${inline ? "inline-grid" : "grid"};
  box-sizing: border-box;
  flex: initial;

  // required for proper sizing of <select>, etc.
  position: relative;
  z-index: 0;

  // geometry
  border-radius: ${radius}px;

  // content and appearance
  grid-template-columns: auto auto minmax(0, 1fr) auto auto auto auto;
  grid-template-areas: "iconl embedl content embedr cue iconr glyph";

  align-items: center;
  white-space: nowrap;

  overflow: hidden;
  background-image: none;

  // cursor override
  ${cursor && `cursor: ${cursor}`};

  > b {
    grid-area: glyph;
    display: block;
  }

  ${StyleTransition(animation)};

  > div > svg,
  > b > svg {
    ${StyleTransition(animation)};
  }

  > .__content {
    grid-area: content;
    input,
    textarea {
      &:-ms-input-placeholder {
        color: ${placeholder};
      } // IE10+
      &::-webkit-input-placeholder {
        color: ${placeholder};
      }
      &::placeholder {
        color: ${placeholder};
      }
    }
  }
`;

const StyleBorderAndPadding = (appearance: InputBoxVisualStateAppearance, padding: Padding, borderError?: Color) => css`
  ${appearance.border && `border: solid ${appearance.borderWidth}px ${borderError ?? appearance.border}`};

  padding: ${padding.t - appearance.borderWidth}px ${(padding.r ?? padding.l) - appearance.borderWidth}px
    ${(padding.b ?? padding.t) - appearance.borderWidth}px ${padding.l - appearance.borderWidth}px;
`;

const StyleDefault = (
  appearance: InputBoxVisualAppearance,
  padding: Padding,
  borderError?: Color,
  labelError?: Color
) => css`
  ${appearance.default.back && `background-color: ${appearance.default.back}`};
  ${StyleBorderAndPadding(appearance.default, padding, borderError)};

  > div > svg {
    fill: ${appearance.default.icon};
  }

  > b > svg {
    fill: ${appearance.default.glyph};
  }

  &:hover {
    ${appearance.hover.back && `background-color: ${appearance.hover.back}`};
    ${StyleBorderAndPadding(appearance.hover, padding, borderError)};

    > div > svg {
      fill: ${appearance.hover.icon};
    }

    > b > svg {
      fill: ${appearance.hover.glyph};
    }

    > .__content {
      &,
      input,
      textarea,
      button,
      > div {
        color: ${appearance.hover.text};
      }
      > label:first-of-type {
        color: ${labelError ?? appearance.hover.label};
      }
    }
  }
`;

const StyleFocused = (appearance: InputBoxVisualAppearance, padding: Padding, borderError?: Color) => css`
  ${appearance.focused.back && `background-color: ${appearance.focused.back}`};
  ${StyleBorderAndPadding(appearance.focused, padding, borderError)};

  > div > svg {
    fill: ${appearance.focused.icon};
  }

  > b > svg {
    fill: ${appearance.focused.glyph};
  }
`;

const StyleDisabled = (appearance: InputBoxVisualAppearance, padding: Padding) => css`
  pointer-events: none;
  color: ${appearance.disabled.text};
  ${appearance.disabled.back && `background-color: ${appearance.disabled.back}`};
  ${StyleBorderAndPadding(appearance.disabled, padding)};
`;

const StyleIcon = (placement: string, spacing: number) => css`
  grid-area: ${placement === "left" ? "iconl" : "iconr"};
  display: flex;
  align-items: center;
  white-space: nowrap;
  margin-right: ${placement === "left" ? spacing : 0}px;
  margin-left: ${placement === "right" ? spacing : 0}px;
`;

const StyleEmbed = (placement: string, spacing: number) => css`
  grid-area: ${placement === "left" ? "embedl" : "embedr"};
  display: flex;
  align-items: center;
  white-space: nowrap;
  margin-right: ${placement === "left" ? spacing : 0}px;
  margin-left: ${placement === "right" ? spacing : 0}px;
`;

const StyleCue = (spacing: number) => css`
  grid-area: cue;
  margin-left: ${spacing}px;
`;

const StyleContent = (animation: AnimationStyle, font: FontProperties, alignment: ContentAlignment) => css`
  display: flex;
  position: relative;
  box-sizing: border-box;
  align-self: stretch;
  justify-content: center;
  flex-direction: column;

  background: transparent;
  white-space: nowrap;
  width: 100%;
  flex: 1 1 auto;

  input,
  textarea,
  button,
  > div {
    ${StyleTextBase(font)};
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: ${alignment};
    justify-content: ${flexAlignment(alignment)};
  }

  > label:first-of-type {
    transition-property: top, transform, margin;
    transition-delay: ${animation.delay}ms;
    transition-duration: ${animation.duration}ms;
    transition-timing-function: ${animation.function};

    ${StyleOutlineReset};
    user-select: none;
    pointer-events: none;
    width: 100%;
    flex: none;
    min-width: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: ${alignment};
  }
`;

const StyleLabelDefault = css`
  position: relative;
  top: 0;
  transform: none;
  margin-top: 2px;
`;

const StyleLabelEmpty = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const StyleContentDefault = (appearance: InputBoxVisualAppearance, labelError?: Color) => css`
  &,
  input,
  textarea,
  button,
  > div {
    color: ${appearance.default.text};
  }
  > label:first-of-type {
    color: ${labelError ?? appearance.default.label};
  }

  &:hover {
    &,
    input,
    textarea,
    button,
    > div {
      color: ${appearance.hover.text};
    }
    > label:first-of-type {
      color: ${labelError ?? appearance.hover.label};
    }
  }
`;

const StyleContentFocused = (appearance: InputBoxVisualAppearance, labelError?: Color) => css`
  &,
  input,
  textarea,
  button,
  > div {
    color: ${appearance.focused.text};
  }
  > label:first-of-type {
    color: ${labelError ?? appearance.focused.label};
  }
`;

const StyleContentDisabled = (appearance: InputBoxVisualAppearance) => css`
  pointer-events: none;

  &,
  input,
  textarea,
  button,
  > div {
    color: ${appearance.disabled.text};
  }
  > label:first-of-type {
    color: ${appearance.disabled.label};
  }
`;

function flexAlignment(value: ContentAlignment) {
  switch (value) {
    case "left":
      return "flex-start";
    case "right":
      return "flex-end";
    case "center":
      return "center";
    default:
      return "stretch";
  }
}

/**
 * `InputBox` component — base wrapper manages presentation of box-like input controls.
 *
 * Supports focus management, error state, left / right placement of embedded components
 * and icons.
 */
const InputBox = forwardRef((props: InputBoxProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    children,
    control,
    kind = "default",
    colorMode,
    appearance = "default",
    size = "default",
    width,
    alignment = "left",
    cursor,
    disabled,
    readonly,
    focused,
    empty,
    error,
    errorAppearance = "glyph",
    label,
    glyph,
    embedLeft,
    embedRight,
    iconBeforeData,
    iconBeforeName,
    iconAfterData,
    iconAfterName,
    inline,
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
  } = props;

  const [visualAppearance, theme, actualColorMode] = useVisualAppearance<InputBoxVisualAppearance>(
    "inputBox",
    colorMode,
    appearance,
    "none",
    typeof size === "number" || size === "auto" ? "large" : size
  );

  const [selfFocused, setSelfFocused] = useState(false);
  const onFocus = useCallback(() => setSelfFocused(true), [setSelfFocused]);
  const onBlur = useCallback(() => setSelfFocused(false), [setSelfFocused]);
  const actualFocused = focused || selfFocused;

  const actualHeight = getComponentSize(theme.components.inputBox.sizes, size === "auto" ? "large" : size);
  const visualStyle = findVisualStyleBySize(theme.components.inputBox.styles, actualHeight);

  // hook up focus state management
  let controls: React.ReactNode[] | undefined;
  let actualControl: React.ReactNode;

  if (!disabled) {
    if (control) {
      if (isValidElement(control)) {
        actualControl = cloneElement(control, {
          onFocus: onFocus,
          onBlur: onBlur,
        });
      }
    } else {
      controls = [];
      let focusEventsAttached = false;
      Children.forEach(children, (child, index) => {
        if (!focusEventsAttached && child && isValidElement(child)) {
          focusEventsAttached = true;
          controls?.push(
            cloneElement(child, {
              key: getElementKey(child, index),
              onFocus: onFocus,
              onBlur: onBlur,
            })
          );
        } else {
          controls?.push(child);
        }
      });
    }
  }

  const normal = !disabled && !readonly;
  const hasError = !!error;
  const borderError = hasError ? resolveBorderColor(theme.palette[actualColorMode], "error") : undefined;
  const labelError = hasError ? resolveTextColor(theme.palette[actualColorMode], "error") : undefined;
  const emptyLabel = !actualFocused && !!empty && kind === "default";
  const padding = appearance === "embedded" ? { ...visualStyle.padding, l: 0, r: 0 } : visualStyle.padding;
  const visualState = disabled
    ? InputBoxVisualState.Disabled
    : actualFocused
    ? InputBoxVisualState.Focused
    : InputBoxVisualState.Default;

  const marginProps = { margin, marginTop, marginRight, marginBottom, marginLeft, m, mt, mr, mb, ml };
  const box = (
    <div
      {...other}
      ref={ref}
      css={[
        StyleBase(
          theme.components.inputBox.animation,
          appearance === "embedded" ? 0 : visualStyle.borderRadius,
          visualAppearance.placeholder,
          inline,
          cursor
        ),
        StyleMargin(marginProps),
        !normal && StyleDisabled(visualAppearance, padding),
        normal && !actualFocused && StyleDefault(visualAppearance, padding, borderError, labelError),
        normal && actualFocused && StyleFocused(visualAppearance, padding, borderError),
        {
          height: size === "auto" ? "auto" : actualHeight,
          width: width,
        },
      ]}>
      {(iconBeforeData || iconBeforeName) && (
        <div css={StyleIcon("left", visualStyle.iconSpacing)}>
          <Icon
            colorMode={colorMode}
            color={normal ? "none" : visualAppearance.disabled.icon}
            data={iconBeforeData}
            name={iconBeforeName}
            size={visualStyle.iconSize}
          />
        </div>
      )}
      {embedLeft && <div css={StyleEmbed("left", visualStyle.iconSpacing)}>{embedLeft}</div>}
      <div
        className="__content"
        css={[
          StyleContent(
            theme.components.inputBox.labelAnimation,
            resolveFont(theme.typography, visualStyle.font.value),
            alignment
          ),
          !normal && StyleContentDisabled(visualAppearance),
          normal && !actualFocused && StyleContentDefault(visualAppearance, labelError),
          normal && actualFocused && StyleContentFocused(visualAppearance, labelError),
        ]}>
        {visualStyle.labelVisible && label && (
          <label
            css={[
              !emptyLabel && StyleLabelDefault,
              emptyLabel && StyleLabelEmpty,
              StyleTextBase(resolveFont(theme.typography, visualStyle.font.label(kind, visualState, emptyLabel))),
            ]}>
            {label}
          </label>
        )}
        {controls ?? children}
      </div>
      {actualControl}
      {embedRight && <div css={StyleEmbed("right", visualStyle.iconSpacing)}>{embedRight}</div>}
      {hasError && (errorAppearance === "glyph" || errorAppearance === "both") && !disabled && (
        <div css={StyleCue(visualStyle.iconSpacing)}>
          <Cue intent="error" size={visualStyle.iconSize} zIndex={10}>
            {typeof error === "string" && error}
          </Cue>
        </div>
      )}
      {(iconAfterData || iconAfterName) && (
        <div css={StyleIcon("right", visualStyle.iconSpacing)}>
          <Icon
            colorMode={colorMode}
            color={normal ? "none" : visualAppearance.disabled.icon}
            data={iconAfterData}
            name={iconAfterName}
            size={visualStyle.iconSize}
          />
        </div>
      )}
      {glyph && (
        <b>
          <Icon
            colorMode={colorMode}
            color={normal ? "none" : visualAppearance.disabled.glyph}
            name={glyph}
            size={visualStyle.iconSize}
            marginLeft={visualStyle.iconSpacing}
          />
        </b>
      )}
    </div>
  );

  return hasError &&
    typeof error === "string" &&
    error.length > 0 &&
    (errorAppearance === "hint" || errorAppearance === "both") &&
    !disabled ? (
    <Fragment>
      {box}
      <Paragraph {...visualStyle.font.error} color="error" marginTop={visualStyle.errorSpacing}>
        {error}
      </Paragraph>
    </Fragment>
  ) : (
    box
  );
});

InputBox.displayName = "InputBox";
InputBox.propTypes = InputBoxPropTypes;

export default InputBox;
