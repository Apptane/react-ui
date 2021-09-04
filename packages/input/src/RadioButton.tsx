import {
  AnimationStyle,
  convertToPixels,
  findVisualStyleBySize,
  getComponentSize,
  hasChildContent,
  ItemValue,
  StyleButtonReset,
  StyleMargin,
} from "@apptane/react-ui-core";
import { MediaObject } from "@apptane/react-ui-layout";
import { RadioButtonVisualAppearance, useVisualAppearance } from "@apptane/react-ui-theme";
import { css } from "@emotion/react";
import { useCallback } from "react";
import FieldLabel from "./FieldLabel";
import { RadioButtonProps, RadioButtonPropTypes } from "./RadioButton.types";

const StyleContainer = (width: string, inline?: boolean) => css`
  display: ${inline ? "inline-flex" : "flex"};
  width: ${width};
`;

const StyleTransition = (animation: AnimationStyle) => css`
  transition-property: stroke, fill;
  transition-delay: ${animation.delay}ms;
  transition-duration: ${animation.duration}ms;
  transition-timing-function: ${animation.function};
`;

const StyleBase = (animation: AnimationStyle, size: number, readonly?: boolean) => css`
  ${StyleButtonReset};

  display: block;

  // geometry
  width: ${size}px;
  height: ${size}px;

  // behavior
  cursor: ${readonly ? "inherit" : "pointer"};

  > svg {
    display: block;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill-rule: evenodd;

    > circle {
      ${StyleTransition(animation)};
    }
  }
`;

const StyleUncheckedInteractive = (appearance: RadioButtonVisualAppearance) => css`
  &:hover:not(:focus) {
    > svg > circle:first-of-type {
      fill: ${appearance.unchecked.hover.back};
      stroke: ${appearance.unchecked.hover.border};
      stroke-width: ${appearance.unchecked.hover.borderWidth}px;
    }
  }

  &:focus {
    > svg > circle:first-of-type {
      fill: ${appearance.unchecked.focused.back};
      stroke: ${appearance.unchecked.focused.border};
      stroke-width: ${appearance.unchecked.focused.borderWidth}px;
    }
  }
`;

const StyleUncheckedDefault = (appearance: RadioButtonVisualAppearance, readonly?: boolean) => css`
  > svg > circle:first-of-type {
    fill: ${appearance.unchecked.default.back};
    stroke: ${appearance.unchecked.default.border};
    stroke-width: ${appearance.unchecked.default.borderWidth}px;
  }

  ${!readonly && StyleUncheckedInteractive(appearance)};
`;

const StyleUncheckedDisabled = (appearance: RadioButtonVisualAppearance) => css`
  pointer-events: none;
  > svg > circle:first-of-type {
    fill: ${appearance.unchecked.disabled.back};
    stroke: ${appearance.unchecked.disabled.border};
    stroke-width: ${appearance.unchecked.disabled.borderWidth}px;
  }
`;

const StyleCheckedInteractive = (appearance: RadioButtonVisualAppearance) => css`
  &:hover:not(:focus) {
    > svg > circle:first-of-type {
      fill: ${appearance.checked.hover.back};
      stroke: ${appearance.checked.hover.border};
      stroke-width: ${appearance.checked.hover.borderWidth}px;
    }

    > svg > circle:last-of-type {
      fill: ${appearance.checked.hover.glyph};
    }
  }

  &:focus {
    > svg > circle:first-of-type {
      fill: ${appearance.checked.focused.back};
      stroke: ${appearance.checked.focused.border};
      stroke-width: ${appearance.checked.focused.borderWidth}px;
    }

    > svg > circle:last-of-type {
      fill: ${appearance.checked.focused.glyph};
    }
  }
`;

const StyleCheckedDefault = (appearance: RadioButtonVisualAppearance, readonly?: boolean) => css`
  > svg > circle:first-of-type {
    fill: ${appearance.checked.default.back};
    stroke: ${appearance.checked.default.border};
    stroke-width: ${appearance.checked.default.borderWidth}px;
  }

  > svg > circle:last-of-type {
    fill: ${appearance.checked.default.glyph};
  }

  ${!readonly && StyleCheckedInteractive(appearance)};
`;

const StyleCheckedDisabled = (appearance: RadioButtonVisualAppearance) => css`
  pointer-events: none;
  > svg > circle:first-of-type {
    fill: ${appearance.checked.disabled.back};
    stroke: ${appearance.checked.disabled.border};
    stroke-width: ${appearance.checked.disabled.borderWidth}px;
  }

  > svg > circle:last-of-type {
    fill: ${appearance.checked.disabled.glyph};
  }
`;

/**
 * `RadioButton` component — used within `ToggleGroup`.
 */
function RadioButton<T extends ItemValue>({
  children,
  label,
  disabled,
  readonly,
  checked,
  onClick,
  value,
  inline,
  colorMode,
  appearance,
  size = "default",
  width,
  labelWidth,
  accessibilityLabel,
  accessibilityRole,
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
}: RadioButtonProps<T>) {
  const [visualAppearance, theme] = useVisualAppearance<RadioButtonVisualAppearance>(
    "radioButton",
    colorMode,
    appearance,
    "none",
    typeof size === "number" ? "default" : size
  );

  const actualSize = getComponentSize(theme.components.radioButton.sizes, size);
  const visualStyle = findVisualStyleBySize(theme.components.radioButton.styles, actualSize);

  const borderRadius = Math.ceil(actualSize / 2 - visualStyle.padding);
  const bulletRadius = Math.ceil(borderRadius * visualStyle.glyphSize);

  const clickHandler = useCallback(
    (event: React.SyntheticEvent) => {
      if (typeof onClick === "function") {
        onClick(event, value);
      }
    },
    [value, onClick]
  );

  // NOTE: we use <svg> graphics to draw both the border and the bullet
  // to ensure consistent rendering at different DPIs, mixing HTML borders
  // and SVG doesn't yield satisfactory results
  const element = (
    <button
      css={[
        StyleBase(theme.components.radioButton.animation, actualSize, readonly),
        !checked && !disabled && StyleUncheckedDefault(visualAppearance, readonly),
        !checked && disabled && StyleUncheckedDisabled(visualAppearance),
        checked && !disabled && StyleCheckedDefault(visualAppearance, readonly),
        checked && disabled && StyleCheckedDisabled(visualAppearance),
      ]}
      onClick={disabled || readonly ? undefined : clickHandler}
      tabIndex={readonly ? -1 : 0}
      role={accessibilityRole ?? "radio"}
      aria-checked={checked ? true : false}
      aria-label={accessibilityLabel}
      disabled={disabled || readonly}
      value={value}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${actualSize} ${actualSize}`}
        width={actualSize}
        height={actualSize}>
        <circle cx={actualSize / 2} cy={actualSize / 2} r={borderRadius} />
        {checked && <circle cx={actualSize / 2} cy={actualSize / 2} r={bulletRadius} />}
      </svg>
    </button>
  );

  const marginProps = { margin, marginTop, marginRight, marginBottom, marginLeft, m, mt, mr, mb, ml };
  return (
    <div css={[StyleContainer(convertToPixels(width) ?? "max-content", inline), StyleMargin(marginProps)]}>
      {hasChildContent(children) || label ? (
        <MediaObject
          media={element}
          spacing={visualStyle.spacing}
          header={
            label && (
              <FieldLabel
                block
                colorMode={colorMode}
                width={labelWidth}
                disabled={disabled}
                readonly={readonly}
                onClick={disabled || readonly ? undefined : clickHandler}>
                {label}
              </FieldLabel>
            )
          }>
          {children}
        </MediaObject>
      ) : (
        element
      )}
    </div>
  );
}

RadioButton.displayName = "RadioButton";
RadioButton.propTypes = RadioButtonPropTypes;

export default RadioButton;
