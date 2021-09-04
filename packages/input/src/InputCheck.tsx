import isBoolean from "lodash/isBoolean";
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
  InputCheckVisualAppearance,
  InputCheckVisualState,
  InputCheckVisualStateAppearance,
  useVisualAppearance,
} from "@apptane/react-ui-theme";
import { css } from "@emotion/react";
import { SyntheticEvent, useCallback } from "react";
import FieldLabel from "./FieldLabel";
import { InputCheckProps, InputCheckPropTypes } from "./InputCheck.types";
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

type InputCheckValueVisualAppearance = {
  [state in InputCheckVisualState]: InputCheckVisualStateAppearance;
};

const StyleInteractive = (appearance: InputCheckValueVisualAppearance) => css`
  > input:hover:not(:focus) + div > svg {
    > rect {
      fill: ${appearance.hover.back};
      stroke: ${appearance.hover.border};
      stroke-width: ${appearance.hover.borderWidth}px;
    }

    > path {
      fill: ${appearance.hover.glyph};
    }
  }

  > input:focus + div > svg {
    > rect {
      fill: ${appearance.focused.back};
      stroke: ${appearance.focused.border};
      stroke-width: ${appearance.focused.borderWidth}px;
    }

    > path {
      fill: ${appearance.focused.glyph};
    }
  }
`;

const StyleDefault = (appearance: InputCheckValueVisualAppearance, readonly?: boolean) => css`
  > input + div > svg {
    > rect {
      fill: ${appearance.default.back};
      stroke: ${appearance.default.border};
      stroke-width: ${appearance.default.borderWidth}px;
    }

    > path {
      fill: ${appearance.default.glyph};
    }
  }

  ${!readonly && StyleInteractive(appearance)};
`;

const StyleDisabled = (appearance: InputCheckValueVisualAppearance) => css`
  > div {
    pointer-events: none;

    > svg > rect {
      fill: ${appearance.disabled.back};
      stroke: ${appearance.disabled.border};
      stroke-width: ${appearance.disabled.borderWidth}px;
    }

    > svg > path {
      fill: ${appearance.disabled.glyph};
    }
  }
`;

const StyleGlyphBase = (animation: AnimationStyle, size: number, readonly?: boolean) => css`
  ${StyleButtonReset};

  display: block;
  position: relative;

  // geometry
  height: ${size}px;
  width: ${size}px;

  // behavior
  cursor: ${readonly ? "inherit" : "pointer"};

  svg {
    display: block;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill-rule: evenodd;
    position: absolute;
    top: 0;
    left: 0;

    > rect,
    > path {
      ${StyleTransition(animation)};
    }
  }
`;

const suppressClickPropagation = (event: SyntheticEvent) => {
  if (typeof event.stopPropagation === "function") {
    event.stopPropagation();
  }
};

/**
 * `InputCheck` component — checkbox.
 */
function InputCheck({
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
  indeterminateAllowed,
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
}: InputCheckProps) {
  const [visualAppearance, theme] = useVisualAppearance<InputCheckVisualAppearance>(
    "inputCheck",
    colorMode,
    appearance,
    "none",
    typeof size === "number" ? "default" : size
  );

  const actualSize = getComponentSize(theme.components.inputCheck.sizes, size);
  const visualStyle = findVisualStyleBySize(theme.components.inputCheck.styles, actualSize);

  // callback
  const interactive = typeof onChange === "function";
  const handleChange = useCallback(
    (event: React.SyntheticEvent) => {
      if (typeof event.stopPropagation === "function") {
        event.stopPropagation();
      }

      if (typeof onChange === "function") {
        const indeterminate = !isBoolean(value);
        if (indeterminateAllowed) {
          // indeterminate -> true -> false -> indeterminate
          if (indeterminate) {
            onChange(true, undefined);
          } else if (value) {
            onChange(false, true);
          } else {
            onChange(undefined, false); // NB: use 'undefined' as indeterminate state
          }
        } else {
          // non-boolean (treated as false) -> true
          // otherwise toggle the value
          const oldValue = indeterminate ? false : value;
          onChange(!oldValue);
        }
      }
    },
    [onChange, value, indeterminateAllowed]
  );

  let checked = value;
  let indeterminate = !isBoolean(checked);

  if (indeterminate) {
    checked = false; // default to false for checked state
    indeterminate = indeterminateAllowed == true;
  }

  const borderHeight = actualSize - visualStyle.padding * 2;
  const element = (
    <div
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked ? "true" : "false"}
      css={[
        StyleControl(actualSize, actualSize, readonly),
        StyleTransition(theme.components.inputCheck.animation),
        !checked && !disabled && StyleDefault(visualAppearance.unchecked, readonly),
        !checked && disabled && StyleDisabled(visualAppearance.unchecked),
        (checked || indeterminate) && !disabled && StyleDefault(visualAppearance.checked, readonly),
        (checked || indeterminate) && disabled && StyleDisabled(visualAppearance.checked),
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
      <div css={StyleGlyphBase(theme.components.inputCheck.animation, actualSize, readonly)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${actualSize} ${actualSize}`}
          width={actualSize}
          height={actualSize}>
          <rect
            x={visualStyle.padding}
            y={visualStyle.padding}
            width={borderHeight}
            height={borderHeight}
            rx={visualStyle.borderRadius}
            ry={visualStyle.borderRadius}
          />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={actualSize} height={actualSize}>
          {checked && <path d="M10.243 16.485l7.07-7.071L15.899 8l-5.656 5.657-2.829-2.829L6 12.242l4.243 4.243z" />}
          {indeterminate && <path d="M7 11h10v2H7z" />}
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

InputCheck.displayName = "InputCheck";
InputCheck.propTypes = InputCheckPropTypes;

export default InputCheck;
