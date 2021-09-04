import { hasChildContent, StyleButtonReset, StyleMargin } from "@apptane/react-ui-core";
import {
  DividerVisualAppearance,
  DividerVisualStyle,
  FontProperties,
  resolveFont,
  useVisualAppearance,
} from "@apptane/react-ui-theme";
import { StyleText } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { memo, useCallback } from "react";
import { DividerProps, DividerPropTypes } from "./Divider.types";

const StyleWrapper = css`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StyleInteractive = (appearance: DividerVisualAppearance) => css`
  ${StyleButtonReset};

  > svg {
    fill: ${appearance.default.text};
  }

  &:hover,
  &:focus {
    > svg {
      fill: ${appearance.focused.text};
    }

    > div::after {
      border-color: ${appearance.focused.border};
    }
  }
`;

const StyleBase = (font: FontProperties, appearance: DividerVisualAppearance) => css`
  ${StyleWrapper};
  ${StyleText(font, appearance.default.text)};
`;

const StyleLine = (appearance: DividerVisualAppearance) => css`
  box-sizing: border-box;
  border-top: solid 1px ${appearance.default.border};
  height: 1px;
  content: "";
`;

const StyleNoContent = (appearance: DividerVisualAppearance) => css`
  &::after {
    flex: 0 0 100%;
    ${StyleLine(appearance)};
  }
`;

const StyleLeft = (style: DividerVisualStyle, appearance: DividerVisualAppearance) => css`
  &::after {
    flex: 1;
    margin-left: ${style.spacing}px;
    ${StyleLine(appearance)};
  }
`;

const StyleRight = (style: DividerVisualStyle, appearance: DividerVisualAppearance) => css`
  &::before {
    flex: 1;
    margin-right: ${style.spacing}px;
    ${StyleLine(appearance)};
  }
`;

const ToggleUp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={12} viewBox="0 0 14 12">
    <path d="M7 4.828l-4.95 4.95L.636 8.364 7 2l6.364 6.364-1.414 1.414L7 4.828z" />
  </svg>
);

const ToggleDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={12} viewBox="0 0 14 12">
    <path d="M7 7.172l4.95-4.95 1.414 1.414L7 10 .636 3.636 2.05 2.222 7 7.172z" />
  </svg>
);

/**
 * `Divider` component — visual divider with optional content and toggle.
 */
function Divider({
  children,
  colorMode,
  appearance,
  width,
  alignment = "center",
  value,
  onChange,
  disabled,
  readonly,
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
}: DividerProps) {
  const [visualAppearance, theme] = useVisualAppearance<DividerVisualAppearance>("divider", colorMode, appearance);
  const visualStyle = theme.components.divider.style;
  const interactive = !disabled && !readonly && typeof onChange === "function";
  const hasContent = hasChildContent(children);

  const marginProps = { margin, marginTop, marginRight, marginBottom, marginLeft, m, mt, mr, mb, ml };
  const divider = (
    <div
      css={[
        StyleBase(resolveFont(theme.typography, visualStyle.font), visualAppearance),
        !interactive && StyleMargin(marginProps),
        interactive && StyleMargin({ marginRight: visualStyle.spacing }),
        !hasContent && StyleNoContent(visualAppearance),
        hasContent && (alignment === "left" || alignment === "center") && StyleLeft(visualStyle, visualAppearance),
        hasContent && (alignment === "right" || alignment === "center") && StyleRight(visualStyle, visualAppearance),
        {
          width: width ?? "100%",
        },
      ]}>
      {children}
    </div>
  );

  const toggle = useCallback(() => typeof onChange === "function" && onChange(!value), [onChange, value]);
  const onKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" || event.key == " ") {
        event.preventDefault();
        toggle();
      }
    },
    [toggle]
  );

  return interactive ? (
    <div
      aria-expanded={!!value}
      tabIndex={0}
      css={[StyleWrapper, StyleInteractive(visualAppearance), StyleMargin(marginProps)]}
      onClick={toggle}
      onKeyDown={onKeyDown}>
      {divider}
      {value ? <ToggleUp /> : <ToggleDown />}
    </div>
  ) : (
    divider
  );
}

Divider.displayName = "Divider";
Divider.propTypes = DividerPropTypes;

/**
 * `Divider` component — visual divider with optional content and toggle.
 */
export default memo(Divider);
