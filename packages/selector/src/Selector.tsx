import { findVisualStyleBySize, ItemValue } from "@apptane/react-ui-core";
import { InputBox } from "@apptane/react-ui-input";
import { resolveFont, useTheme } from "@apptane/react-ui-theme";
import { StyleTextBase } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { Children, isValidElement, useCallback } from "react";
import { SelectorItemProps, SelectorItemPropTypes, SelectorProps, SelectorPropTypes } from "./Selector.types";

const StyleControl = css`
  box-sizing: content-box;
  cursor: pointer;
  opacity: 0;
  border: none;
  background: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StyleContent = css`
  display: flex;
  align-items: center;
  border: none;
  flex: 1 1 100%;
  max-width: 100%;
  min-width: 0;
`;

/**
 * `Selector` component — dropdown selector input control.
 */
function Selector<T extends ItemValue>({
  children,
  autoFocus,
  formatValue,
  value,
  onChange,
  numeric,
  ...other
}: SelectorProps<T>) {
  const theme = useTheme();

  // this style is used to extract font for for the <option> items
  const visualStyle = findVisualStyleBySize(theme.components.inputBox.styles, 1000);

  // manually format display value or extract it from
  // the corresponding selector item
  let displayValue: React.ReactNode = value;
  if (formatValue) {
    displayValue = formatValue(value);
  } else {
    Children.forEach(children, (child) => {
      if (child && isValidElement(child)) {
        const item = child as React.ReactElement<SelectorItemProps<T>>;
        if (item.props.value === value) {
          displayValue = child.props.children;
        }
      }
    });
  }

  const disabled = other.disabled || other.readonly;
  const interactive = !disabled && typeof onChange === "function";
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (typeof onChange === "function") {
        const itemValue = event.currentTarget.value;
        if (numeric) {
          onChange(parseFloat(itemValue) as T);
        } else {
          onChange(itemValue as T);
        }
      }
    },
    [onChange, numeric]
  );

  return (
    <InputBox
      {...other}
      empty={!value}
      glyph="i:arrow-down"
      control={
        !disabled ? (
          <select
            css={[
              StyleControl,
              StyleTextBase(resolveFont(theme.typography, visualStyle.font.value)), // for <option> items
            ]}
            data-autofocus={autoFocus ? "" : undefined}
            autoFocus={autoFocus}
            value={value}
            onChange={interactive ? handleChange : undefined}
            disabled={!interactive}>
            {children}
          </select>
        ) : undefined
      }>
      <div css={StyleContent}>{displayValue}</div>
    </InputBox>
  );
}

/**
 * `SelectorItem` component — item with value and content.
 */
export function SelectorItem<T extends ItemValue>({ children, value, ...other }: SelectorItemProps<T>) {
  return (
    <option {...other} value={value}>
      {children}
    </option>
  );
}

SelectorItem.propTypes = SelectorItemPropTypes;

Selector.displayName = "Selector";
Selector.propTypes = SelectorPropTypes;

/**
 * `SelectorItem` component — item with value and content.
 */
Selector.Item = SelectorItem;

export default Selector;
