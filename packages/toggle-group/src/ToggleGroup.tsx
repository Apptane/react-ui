import { getElementKey, ItemValue, ToggleButtonProps } from "@apptane/react-ui-core";
import { Pane } from "@apptane/react-ui-pane";
import { Children, cloneElement, isValidElement, useCallback } from "react";
import { ToggleGroupProps, ToggleGroupPropTypes } from "./ToggleGroup.types";

/**
 * `ToggleGroup` component — container for `Button` or `RadioButton` components
 * to create a group of mutually exclusive options.
 */
function ToggleGroup<T extends ItemValue>({
  children,
  appearance = "default",
  colorMode,
  size,
  width,
  spacing = 8,
  disabled,
  onChange,
  onItemClick,
  value,
  orientation = "horizontal",
  ...other
}: ToggleGroupProps<T>) {
  const onClick = useCallback(
    (event: React.SyntheticEvent, value?: T) => {
      if (typeof event.preventDefault === "function") {
        event.preventDefault();
      }

      if (typeof event.stopPropagation === "function") {
        event.stopPropagation();
      }

      if (typeof onItemClick === "function") {
        onItemClick(value);
      }

      if (typeof onChange === "function") {
        onChange(value);
      }
    },
    [onChange, onItemClick]
  );

  const items: JSX.Element[] = [];
  Children.forEach(children, (child, index) => {
    if (child && isValidElement(child)) {
      const item = child as React.ReactElement<ToggleButtonProps<T, unknown, string>>;
      const checked = value === item.props.value;
      items.push(
        cloneElement<ToggleButtonProps<T, unknown, string>>(item, {
          key: getElementKey(item, index),
          value: item.props.value,
          accessibilityRole: "radio",
          appearance: appearance === "inverted" ? "inverted" : "minimal",
          colorMode: colorMode,
          disabled: disabled || item.props.disabled,
          checked: checked,
          size: size ?? item.props.size,
          width: width ?? item.props.width,
          onClick: onClick,
          marginLeft: orientation === "horizontal" && items.length > 0 ? spacing : item.props.marginLeft,
          marginTop: orientation === "vertical" && items.length > 0 ? spacing : item.props.marginTop,
        })
      );
    }
  });

  return (
    <Pane {...other} accessibilityRole="radiogroup" orientation={orientation}>
      {items}
    </Pane>
  );
}

ToggleGroup.displayName = "ToggleGroup";
ToggleGroup.propTypes = ToggleGroupPropTypes;

export default ToggleGroup;
