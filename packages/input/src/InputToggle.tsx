import {
  AnimationStyle,
  convertToPixels,
  findVisualStyleBySize,
  getComponentSize,
  hasChildContent,
  StyleButtonReset,
  StyleMargin,
} from "@apptane/react-ui-core";
import { MediaObject } from "@apptane/react-ui-layout";
import {
  InputToggleVisualAppearance,
  InputToggleVisualState,
  InputToggleVisualStateAppearance,
  useVisualAppearance,
} from "@apptane/react-ui-theme";
import { css } from "@emotion/react";
import { SyntheticEvent, useCallback } from "react";
import FieldLabel from "./FieldLabel";
import { InputToggleProps, InputTogglePropTypes } from "./InputToggle.types";
import { StyleControl } from "./Styles";

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

type InputToggleValueVisualAppearance = {
  [state in InputToggleVisualState]: InputToggleVisualStateAppearance;
};

const StyleInteractive = (appearance: InputToggleValueVisualAppearance) => css`
  > input:hover:not(:focus) + div > svg {
    > rect {
      fill: ${appearance.hover.back};
      stroke: ${appearance.hover.border};
      stroke-width: ${appearance.hover.borderWidth}px;
    }

    > circle {
      fill: ${appearance.hover.glyph};
    }
  }

  > input:focus + div > svg {
    > rect {
      fill: ${appearance.focused.back};
      stroke: ${appearance.focused.border};
      stroke-width: ${appearance.focused.borderWidth}px;
    }

    > circle {
      fill: ${appearance.focused.glyph};
    }
  }
`;

const StyleDefault = (appearance: InputToggleValueVisualAppearance, readonly?: boolean) => css`
  > input + div > svg {
    > rect {
      fill: ${appearance.default.back};
      stroke: ${appearance.default.border};
      stroke-width: ${appearance.default.borderWidth}px;
    }

    > circle {
      fill: ${appearance.default.glyph};
    }
  }

  ${!readonly && StyleInteractive(appearance)};
`;

const StyleDisabled = (appearance: InputToggleValueVisualAppearance) => css`
  > div {
    pointer-events: none;

    > svg > rect {
      fill: ${appearance.disabled.back};
      stroke: ${appearance.disabled.border};
      stroke-width: ${appearance.disabled.borderWidth}px;
    }

    > svg > circle {
      fill: ${appearance.disabled.glyph};
    }
  }
`;

const StyleGlyphBase = (animation: AnimationStyle, width: number, height: number, readonly?: boolean) => css`
  ${StyleButtonReset};

  display: block;

  // geometry
  height: ${height}px;
  width: ${width}px;

  // behavior
  cursor: ${readonly ? "inherit" : "pointer"};

  svg {
    display: block;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill-rule: evenodd;

    > rect {
      ${StyleTransition(animation)};
    }

    > circle {
      transition: cx 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86), fill ${animation.duration}ms linear ${animation.delay}ms;
    }
  }
`;

const suppressClickPropagation = (event: SyntheticEvent) => {
  if (typeof event.stopPropagation === "function") {
    event.stopPropagation();
  }
};

/**
 * `InputToggle` component — on/off selector.
 */
function InputToggle({
  children,
  label,
  disabled,
  readonly,
  value,
  onChange,
  colorMode,
  appearance,
  size = "default",
  width,
  labelWidth,
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
}: InputToggleProps) {
  const [visualAppearance, theme] = useVisualAppearance<InputToggleVisualAppearance>(
    "inputToggle",
    colorMode,
    appearance,
    "none",
    typeof size === "number" ? "default" : size
  );
  const actualSize = getComponentSize(theme.components.inputToggle.sizes, size);
  const visualStyle = findVisualStyleBySize(theme.components.inputToggle.styles, actualSize);

  // callback
  const interactive = typeof onChange === "function";
  const handleChange = useCallback(() => typeof onChange === "function" && onChange(!value), [onChange, value]);
  const checked = value;

  const borderHeight = actualSize - visualStyle.padding * 2;
  const borderWidth = borderHeight * visualStyle.aspectRatio;
  const actualWidth = borderWidth + visualStyle.padding * 2;
  const bulletRadius = Math.ceil(borderHeight / 2 - visualStyle.glyphMargin);

  const element = (
    <div
      role="checkbox"
      aria-checked={checked}
      css={[
        StyleControl(actualWidth, actualSize, readonly),
        StyleTransition(theme.components.inputToggle.animation),
        !checked && !disabled && StyleDefault(visualAppearance.unchecked, readonly),
        !checked && disabled && StyleDisabled(visualAppearance.unchecked),
        checked && !disabled && StyleDefault(visualAppearance.checked, readonly),
        checked && disabled && StyleDisabled(visualAppearance.checked),
      ]}>
      {!disabled && (
        <input
          type="checkbox"
          tabIndex={readonly ? -1 : 0}
          onClick={readonly ? undefined : suppressClickPropagation}
          onChange={readonly || !interactive ? undefined : handleChange}
          readOnly={readonly || !interactive}
          checked={checked}
        />
      )}
      <div css={StyleGlyphBase(theme.components.inputToggle.animation, actualWidth, actualSize, readonly)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${actualWidth} ${actualSize}`}
          width={actualWidth}
          height={actualSize}>
          <rect
            x={visualStyle.padding}
            y={visualStyle.padding}
            width={borderWidth}
            height={borderHeight}
            rx={borderHeight / 2}
            ry={borderHeight}
          />
          <circle
            cx={
              visualStyle.padding +
              (checked
                ? borderWidth - bulletRadius - visualStyle.glyphMargin - 1
                : bulletRadius + visualStyle.glyphMargin + 1)
            }
            cy={actualSize / 2}
            r={bulletRadius}
          />
        </svg>
      </div>
    </div>
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
                onClick={disabled || readonly ? undefined : handleChange}>
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

InputToggle.displayName = "InputToggle";
InputToggle.propTypes = InputTogglePropTypes;

export default InputToggle;
