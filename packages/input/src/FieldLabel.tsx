import { convertToPixels, StyleMargin, StyleOutlineReset } from "@apptane/react-ui-core";
import { FieldLabelVisualAppearance, resolveFont, useVisualAppearance } from "@apptane/react-ui-theme";
import { StyleText } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { FieldLabelProps, FieldLabelPropTypes } from "./FieldLabel.types";

const StyleBase = (width?: string, block?: boolean, interactive?: boolean) => css`
  ${StyleOutlineReset};
  user-select: none;

  display: ${block ? "flex" : "inline-flex"};
  cursor: ${interactive ? "pointer" : "inherit"};

  ${width && `width: ${width}`};
`;

const StyleBox = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

/**
 * `FieldLabel` component — standalone label for a form field or an input control.
 */
function FieldLabel({
  children,
  colorMode,
  appearance,
  width,
  disabled,
  readonly,
  error,
  block,
  name,
  onClick,
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
}: FieldLabelProps) {
  const [visualAppearance, theme] = useVisualAppearance<FieldLabelVisualAppearance>(
    "fieldLabel",
    colorMode,
    appearance
  );

  const color = disabled ? visualAppearance.disabled : error ? visualAppearance.error : visualAppearance.default;
  const interactive = !disabled && !readonly && onClick != null;
  const marginProps = { margin, marginTop, marginRight, marginBottom, marginLeft, m, mt, mr, mb, ml };
  return (
    <label
      onClick={interactive ? onClick : undefined}
      css={[
        StyleBase(convertToPixels(width), block, interactive),
        StyleMargin(marginProps),
        StyleText(resolveFont(theme.typography, theme.components.fieldLabel.style.font), color, "left"),
      ]}
      tabIndex={-1}
      htmlFor={name}>
      <div css={StyleBox}>{children}</div>
    </label>
  );
}

FieldLabel.displayName = "FieldLabel";
FieldLabel.propTypes = FieldLabelPropTypes;

/**
 * `FieldLabel` component — standalone label for a form field or an input control.
 */
export default FieldLabel;
