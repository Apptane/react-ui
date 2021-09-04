import { AnimationStyle, StyleOutlineReset, StylePadding } from "@apptane/react-ui-core";
import { CapturedLocation, useMouseCapture } from "@apptane/react-ui-hooks";
import {
  InputSliderVisualStateAppearance,
  InputSliderVisualStyle,
  useColorMode,
  useTheme,
} from "@apptane/react-ui-theme";
import { Tooltip } from "@apptane/react-ui-tooltip";
import { css } from "@emotion/react";
import { useCallback, useRef, useState } from "react";
import FieldLabel from "./FieldLabel";
import InputNumeric from "./InputNumeric";
import { InputSliderProps, InputSliderPropTypes } from "./InputSlider.types";

const StyleTransition = (animation: AnimationStyle) => css`
  transition-property: border-color, background-color;
  transition-delay: ${animation.delay}ms;
  transition-duration: ${animation.duration}ms;
  transition-timing-function: ${animation.function};
`;

const StyleContainer = css`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  align-items: flex-start;
`;

const StyleControl = css`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

const StyleLabels = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1 1 auto;
`;

const StyleSlider = css`
  flex: 1 1 auto;
`;

const StyleSliderBoundingBox = (style: InputSliderVisualStyle, disabled?: boolean) => css`
  position: relative;
  height: ${style.thumbBox}px;
  ${!disabled && "cursor: pointer"};
`;

const StyleRail = (animation: AnimationStyle, style: InputSliderVisualStyle) => css`
  position: absolute;
  top: ${Math.ceil((style.thumbBox - style.railSize) / 2)}px;
  left: 0;
  width: 100%;
  height: ${style.railSize}px;
  border-radius: ${style.railSize}px;
  user-select: none;

  ${StyleTransition(animation)};
`;

const StyleRailAppearance = (appearance: InputSliderVisualStateAppearance) => css`
  background-color: ${appearance.rail};
`;

const StyleGauge = (animation: AnimationStyle, style: InputSliderVisualStyle) => css`
  position: absolute;
  top: ${Math.ceil((style.thumbBox - style.gaugeSize) / 2)}px;
  left: 0;
  height: ${style.gaugeSize}px;
  border-radius: ${style.gaugeSize}px;
  user-select: none;

  ${StyleTransition(animation)};
`;

const StyleGaugeAppearance = (appearance: InputSliderVisualStateAppearance) => css`
  background-color: ${appearance.gauge};
`;

const StyleHandle = (animation: AnimationStyle, style: InputSliderVisualStyle) => css`
  ${StyleOutlineReset};

  position: absolute;
  border-radius: 50%;
  border-style: solid;
  border-width: ${style.thumbBorderWidth}px;

  top: ${Math.ceil((style.thumbBox - style.thumbSize) / 2)}px;
  width: ${style.thumbSize}px;
  height: ${style.thumbSize}px;

  // behavior
  touch-action: manipulation;
  user-select: none;

  // geometry
  box-sizing: border-box;

  ${StyleTransition(animation)};
`;

const StyleHandleAppearance = (appearance: InputSliderVisualStateAppearance, disabled?: boolean) => css`
  background-color: ${appearance.thumbBack};
  border-color: ${appearance.thumbBorder};
  ${disabled ? "pointer-events: none" : "cursor: pointer"};
`;

const StyleTooltip = (style: InputSliderVisualStyle) => css`
  position: absolute;
  bottom: ${style.thumbSize + 1}px;
  > div {
    left: -50%;
  }
`;

/**
 * `InputSlider` component — numeric input slider control.
 */
function InputSlider({
  colorMode,
  min = 0,
  max,
  inputVisible,
  inputWidth = 80,
  alignment = "right",
  width,
  disabled,
  value,
  onChange,
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
}: InputSliderProps) {
  const theme = useTheme();
  const actualColorMode = useColorMode(colorMode);
  const visualAppearance = theme.components.inputSlider.appearance(
    theme.palette[actualColorMode],
    actualColorMode,
    undefined,
    "none"
  );

  const visualStyle = theme.components.inputSlider.style;
  const animation = theme.components.inputSlider.animation;

  // ensure min <= max
  if (max == null || max < min) {
    max = min;
  }

  const precision = other.precision || 0;

  const interactive = !disabled && typeof onChange === "function";
  const onMouseCallback = useCallback(
    (location: CapturedLocation) => {
      if (typeof onChange === "function") {
        let newValue = min + ((max - min) * location.elementX) / location.elementWidth;
        if (newValue < min) {
          newValue = min;
        } else if (newValue > max) {
          newValue = max;
        }
        onChange(parseInt(newValue.toFixed(precision)));
      }
    },
    [onChange, min, max, precision]
  );

  const sliderRef = useRef<HTMLDivElement>(null);
  const [hover] = useMouseCapture(sliderRef, interactive ? onMouseCallback : undefined);

  // undefined value is treated as min
  const v = value == null ? min : value < min ? min : value > max ? max : value;

  // offset and absolute position for tooltip placement
  const offset = max !== min ? (v - min) / (max - min) : 0;
  const offsetPercent = `${100 * offset}%`;

  // handles keyboard navigation
  const smallStep = 1;
  const largeStep = Math.max(1, Math.round((max - min) / 10));
  const onKeyboardNavigation = useCallback(
    (event: React.KeyboardEvent) => {
      if (typeof onChange === "function") {
        switch (event.key) {
          case "ArrowLeft":
          case "ArrowDown":
            event.preventDefault();
            onChange(Math.max(min, v - (event.ctrlKey ? largeStep : smallStep)));
            break;
          case "ArrowRight":
          case "ArrowUp":
            event.preventDefault();
            onChange(Math.min(max, v + (event.ctrlKey ? largeStep : smallStep)));
            break;
          case "Home":
            event.preventDefault();
            onChange(min);
            break;
          case "End":
            event.preventDefault();
            onChange(max);
            break;
        }
      }
    },
    [onChange, v, min, max, smallStep, largeStep]
  );

  const [focused, setFocused] = useState(false);

  const onFocus = useCallback(() => setFocused(true), [setFocused]);
  const onBlur = useCallback(() => setFocused(false), [setFocused]);

  const onInputChange = useCallback(
    (inputValue?: number | null) => {
      if (typeof onChange === "function") {
        // treat NaN and undefined as minimum value
        if (inputValue == null || isNaN(inputValue)) {
          onChange(min);
          return true;
        } else if (inputValue >= min && inputValue <= max) {
          onChange(inputValue);
          return true;
        }
      }

      // value is not accepted
      return false;
    },
    [onChange, min, max]
  );

  const visualState = disabled
    ? visualAppearance.disabled
    : focused
    ? visualAppearance.focused
    : hover
    ? visualAppearance.hover
    : visualAppearance.default;

  const paddingProps = {
    padding: margin,
    paddingTop: marginTop,
    paddingRight: marginRight,
    paddingBottom: marginBottom,
    paddingLeft: marginLeft,
    p: m,
    pt: mt,
    pr: mr,
    pb: mb,
    pl: ml,
  };

  return (
    <div
      css={[
        StyleContainer,
        StylePadding(paddingProps),
        {
          width: width ?? "100%",
        },
      ]}>
      <div css={StyleControl}>
        <div css={StyleSlider} onFocus={onFocus} onBlur={onBlur}>
          <div css={StyleSliderBoundingBox(visualStyle, disabled)} ref={sliderRef}>
            <div css={[StyleRail(animation, visualStyle), StyleRailAppearance(visualState)]} />
            <div
              css={[StyleGauge(animation, visualStyle), StyleGaugeAppearance(visualState)]}
              style={{ width: offsetPercent }}
            />
            <div
              tabIndex={0}
              role="slider"
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={v}
              css={[StyleHandle(animation, visualStyle), StyleHandleAppearance(visualState, disabled)]}
              onKeyDown={interactive ? onKeyboardNavigation : undefined}
              style={{ left: `calc(${offset} * calc(100% - ${visualStyle.thumbSize}px))` }}
            />
            {hover && (
              <div
                css={StyleTooltip(visualStyle)}
                style={{
                  left: `calc(${offset} * calc(100% - ${visualStyle.thumbSize}px) + ${visualStyle.thumbSize / 2}px)`,
                }}>
                <Tooltip colorMode={colorMode} placement="top" arrowVisible>
                  {v.toFixed(precision)}
                </Tooltip>
              </div>
            )}
          </div>
        </div>
        <div css={StyleLabels}>
          <FieldLabel block colorMode={colorMode} width={width} disabled={disabled}>
            {min}
          </FieldLabel>
          <FieldLabel block colorMode={colorMode} width={width} disabled={disabled}>
            {max}
          </FieldLabel>
        </div>
      </div>
      {inputVisible && inputWidth != null && inputWidth > 0 && (
        <InputNumeric
          {...other}
          colorMode={colorMode}
          disabled={disabled}
          alignment={alignment}
          width={inputWidth}
          marginLeft={visualStyle.spacing}
          value={v}
          onChange={onInputChange}
        />
      )}
    </div>
  );
}

InputSlider.displayName = "InputSlider";
InputSlider.propTypes = InputSliderPropTypes;

export default InputSlider;
