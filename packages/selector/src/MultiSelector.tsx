import { Dropdown } from "@apptane/react-ui-behaviors";
import { ColorMode, getElementKey, ItemValue, StyleButtonReset, StyleOutlineReset } from "@apptane/react-ui-core";
import { useComponentVisualSize } from "@apptane/react-ui-hooks";
import { InputBox, InputCheck } from "@apptane/react-ui-input";
import { Menu } from "@apptane/react-ui-menu";
import { css } from "@emotion/react";
import { Children, isValidElement, useCallback, useMemo, useRef } from "react";
import {
  MultiSelectorItemProps,
  MultiSelectorItemPropTypes,
  MultiSelectorProps,
  MultiSelectorPropTypes,
} from "./MultiSelector.types";

const StyleControl = css`
  ${StyleButtonReset};
  cursor: pointer;
`;

type ItemProps<T extends ItemValue> = MultiSelectorItemProps<T> & {
  checked: boolean;
  onClick: (value: T) => void;
  colorMode?: ColorMode;
};

function Item<T extends ItemValue>({ children, value, checked, onClick, colorMode }: ItemProps<T>) {
  const handleClick = useCallback(() => {
    onClick(value);
  }, [onClick, value]);

  return (
    <Menu.Item onClick={handleClick}>
      <InputCheck value={checked} label={children} readonly colorMode={colorMode} />
    </Menu.Item>
  );
}

/**
 * `MultiSelector` component — dropdown selector input control with multiple selectable values.
 */
function MultiSelector<T extends ItemValue>({
  children,
  formatValue,
  value,
  onChange,
  width,
  ...other
}: MultiSelectorProps<T>) {
  const ref = useRef<HTMLDivElement>(null);

  const disabled = other.disabled || other.readonly;
  const handleClick = useCallback(
    (v: T) => {
      const newValue = value ? [...value] : [];
      const index = newValue.indexOf(v);
      if (index >= 0) {
        newValue.splice(index, 1);
      } else {
        newValue.push(v);
      }
      if (typeof onChange === "function") {
        onChange(newValue);
      }
    },
    [onChange, value]
  );

  const selectionAll: T[] = useMemo(() => {
    const v: T[] = [];
    Children.forEach(children, (child) => {
      if (child && isValidElement(child)) {
        const item = child as React.ReactElement<MultiSelectorItemProps<T>>;
        v.push(item.props.value);
      }
    });
    return v;
  }, [children]);

  let selectionCount = 0;
  const items: React.ReactElement[] = [];
  Children.forEach(children, (child, index) => {
    if (child && isValidElement(child)) {
      const item = child as React.ReactElement<MultiSelectorItemProps<T>>;

      const checked = value != null && value.includes(item.props.value);
      if (checked) {
        selectionCount++;
      }

      items.push(
        <Item
          key={getElementKey(item, index)}
          colorMode={other.colorMode}
          value={item.props.value}
          checked={checked}
          onClick={handleClick}
          disabled={item.props.disabled || disabled}>
          {item.props.children}
        </Item>
      );
    }
  });

  const selectionState =
    value == null || value.length === 0 ? false : items.length === selectionCount ? true : undefined;

  const onClickAll = useCallback(() => {
    if (typeof onChange === "function") {
      onChange(selectionState ? [] : selectionAll);
    }
  }, [selectionState, selectionAll, onChange]);

  items.unshift(<Menu.Divider key="divider" />);
  items.unshift(
    <Menu.Item key="all" onClick={onClickAll}>
      <InputCheck colorMode={other.colorMode} value={selectionState} indeterminateAllowed readonly>
        {selectionState === true ? "Deselect all" : "Select all"}
      </InputCheck>
    </Menu.Item>
  );

  let displayValue: React.ReactNode = value;
  if (formatValue) {
    displayValue = formatValue(value);
  } else {
    displayValue = `${selectionCount} selected`;
  }

  const inputSize = useComponentVisualSize(ref);

  return disabled ? (
    <InputBox {...other} width={width} disabled glyph="i:arrow-down">
      <div css={StyleOutlineReset}>{displayValue}</div>
    </InputBox>
  ) : (
    <Dropdown
      width={width}
      component={({ close }) => (
        <Menu popup colorMode={other.colorMode} onEsc={close} border elevation={0} minWidth={inputSize.width}>
          {items}
        </Menu>
      )}>
      {({ visible }: { visible?: boolean }) => (
        <InputBox ref={ref} {...other} focused={visible} cursor="pointer" glyph="i:arrow-down">
          <button css={StyleControl}>{displayValue}</button>
        </InputBox>
      )}
    </Dropdown>
  );
}

/**
 * `MultiSelectorItem` component — item with value and content.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MultiSelectorItem<T extends ItemValue>(props: MultiSelectorItemProps<T>) {
  return null;
}

MultiSelectorItem.propTypes = MultiSelectorItemPropTypes;

MultiSelector.displayName = "MultiSelector";
MultiSelector.propTypes = MultiSelectorPropTypes;

/**
 * `MultiSelectorItem` component — item with value and content.
 */
MultiSelector.Item = MultiSelectorItem;

export default MultiSelector;
