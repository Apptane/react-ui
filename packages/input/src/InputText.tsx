import { jsx } from "@emotion/react";
import { forwardRef } from "react";
import { InputTextProps, InputTextPropTypes } from "./InputText.types";
import InputTextBase, { InputTextRefObject } from "./InputTextBase";

/**
 * `InputText` component — customizable text input control.
 */
const InputText = forwardRef((props: InputTextProps, ref: React.Ref<InputTextRefObject>) => {
  const { type = "text", value, onChange, onKeyDown, lines = 1, ...other } = props;

  const disabled = other.disabled;
  const readonly = other.readonly;

  // assemble control element
  // NB: keep the native component for text areas even in disabled state
  const inputName = lines >= 2 ? "textarea" : disabled ? "div" : "input";

  if (inputName === "textarea") {
    const inputProps: React.TextareaHTMLAttributes<HTMLTextAreaElement> = {
      rows: lines,
      value: value,
    };

    if (disabled) {
      inputProps.disabled = disabled;
    }

    // make uncontrolled input read-only if value is not specified
    if (!onChange) {
      inputProps.readOnly = readonly || value != null;
    }

    return (
      <InputTextBase
        {...other}
        ref={ref}
        size="auto"
        kind="area"
        onInputChange={onChange}
        onInputKeyDown={onKeyDown}
        inputProps={inputProps}
        renderInput={(childProps) => jsx(inputName, childProps)}
      />
    );
  } else {
    const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {};

    let content: React.ReactNode;
    if (!disabled) {
      inputProps.type = type;
      inputProps.value = value;

      // make uncontrolled input read-only if value is not specified
      if (!onChange) {
        inputProps.readOnly = readonly || value != null;
      }
    } else {
      // since the input is not a native input when disabled,
      // mimic the native behavior
      if (type === "password" && typeof value === "string") {
        content = "•".repeat(value.length);
      } else {
        content = value || "";
      }
    }

    return (
      <InputTextBase
        {...other}
        ref={ref}
        onInputChange={onChange}
        onInputKeyDown={onKeyDown}
        inputProps={inputProps}
        empty={!value && !content?.toString()}
        renderInput={(childProps) => jsx(inputName, childProps, content)}
      />
    );
  }
});

InputText.displayName = "InputText";
InputText.propTypes = InputTextPropTypes;

export default InputText;
