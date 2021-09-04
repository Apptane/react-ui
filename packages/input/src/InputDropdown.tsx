import { Dropdown } from "@apptane/react-ui-behaviors";
import { StyleButtonReset, StyleOutlineReset } from "@apptane/react-ui-core";
import { Pane } from "@apptane/react-ui-pane";
import { useTheme } from "@apptane/react-ui-theme";
import { css } from "@emotion/react";
import { useRef } from "react";
import InputBox from "./InputBox";
import { InputDropdownProps, InputDropdownPropTypes } from "./InputDropdown.types";

const StyleControl = css`
  ${StyleButtonReset};
  cursor: pointer;
`;

/**
 * `InputDropdown` component — base component for a dropdown with custom control.
 * This component is meant to be used as a building block for custom input controls.
 */
function InputDropdown<T>({ formatValue, value, onChange, control, width, ...other }: InputDropdownProps<T>) {
  const theme = useTheme();
  const visualStyle = theme.components.dropdown.style;

  const ref = useRef<HTMLDivElement>(null);
  const disabled = other.disabled || other.readonly;

  let displayValue: React.ReactNode = value;
  if (formatValue) {
    displayValue = formatValue(value);
  } else {
    displayValue = value == null ? "" : value;
  }

  const padding = visualStyle.padding;
  return disabled ? (
    <InputBox {...other} width={width} disabled glyph="i:arrow-down">
      <div css={StyleOutlineReset}>{displayValue}</div>
    </InputBox>
  ) : (
    <Dropdown
      width={width}
      component={({ close }) => (
        <Pane
          colorMode={other.colorMode}
          grow={1}
          shrink={1}
          width="max-content"
          paddingTop={padding.t}
          paddingRight={padding.r ?? padding.l}
          paddingBottom={padding.b ?? padding.t}
          paddingLeft={padding.l}
          cornerRadius={visualStyle.borderRadius}
          background="white"
          border
          elevation={0}>
          {control(value, onChange, close)}
        </Pane>
      )}>
      {({ visible }: { visible?: boolean }) => (
        <InputBox ref={ref} {...other} focused={visible} cursor="pointer" glyph="i:arrow-down">
          <button css={StyleControl}>{displayValue}</button>
        </InputBox>
      )}
    </Dropdown>
  );
}

InputDropdown.displayName = "InputDropdown";
InputDropdown.propTypes = InputDropdownPropTypes;

export default InputDropdown;
