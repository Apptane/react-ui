import { getSelection, setSelection, StyleOutlineReset } from "@apptane/react-ui-core";
import { css, Interpolation, Theme as EmotionTheme } from "@emotion/react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import InputBox from "./InputBox";
import { InputTextBaseProps, InputTextBasePropTypes, TextSelection } from "./InputTextBase.types";

const StyleInput = css`
  box-sizing: border-box;

  input&,
  textarea&,
  div& {
    display: block;
    margin: 0;
    padding: 0;
    border: none;
    flex: 1 1 100%;
    max-width: 100%;
    min-width: 0;
    background-color: transparent;

    // suppress outline
    &:focus {
      ${StyleOutlineReset};
    }
  }

  input& {
    padding: 0;
    width: 100%;
  }

  textarea& {
    resize: none;
  }
`;

export interface InputTextRefObject {
  focus(): void;
  select(): void;
  getSelection(): TextSelection | undefined;
  setSelection(selection: TextSelection): void;
}

type SupportedInputType = HTMLInputElement | HTMLTextAreaElement;
type SupportedAttrsType<T extends SupportedInputType> = (
  | React.InputHTMLAttributes<T>
  | React.TextareaHTMLAttributes<T>
) &
  React.RefAttributes<T> & {
    "css"?: Interpolation<EmotionTheme>;
    "data-autofocus"?: string;
  };

export type InputTextCoreProps<
  TElement extends SupportedInputType,
  TAttributes extends SupportedAttrsType<TElement> & React.HTMLAttributes<TElement>
> = InputTextBaseProps & {
  onInputKeyDown?: (event: React.KeyboardEvent) => void;
  onInputPaste?: (event: React.ClipboardEvent) => void;
  onInputChange?: (value: string, selection: TextSelection) => void;
  onInputBlur?: (event: React.FocusEvent) => void;
  renderInput: (props: TAttributes) => React.ReactNode;
  inputProps: TAttributes;
};

/**
 * `InputTextBase` component — base wrapper that manages text-based input controls.
 */
const InputTextBase = forwardRef(
  <TElement extends SupportedInputType, TAttributes extends SupportedAttrsType<TElement>>(
    props: InputTextCoreProps<TElement, TAttributes>,
    ref: React.Ref<InputTextRefObject>
  ) => {
    const {
      autoFocus,
      placeholder,
      onInputKeyDown,
      onInputPaste,
      onInputChange,
      onInputBlur,
      renderInput,
      inputProps,
      ...other
    } = props;

    const disabled = props.disabled;
    const readonly = props.readonly;

    // assemble control element
    // NB: keep the native component for text areas even in disabled state
    const inputRef = useRef<TElement>(null);

    inputProps.role = "textbox";
    inputProps.css = StyleInput;

    inputProps.onKeyDown = onInputKeyDown;
    inputProps.onPaste = onInputPaste;
    inputProps.onBlur = onInputBlur;

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      },
      select: () => {
        if (inputRef.current) {
          inputRef.current.select();
        }
      },
      getSelection: () => (inputRef.current ? getSelection(inputRef.current) : undefined),
      setSelection: (selection) => {
        if (inputRef.current) {
          setSelection(inputRef.current, selection);
        }
      },
    }));

    const handleChange = useCallback(
      (event: React.ChangeEvent<TElement>) => {
        if (onInputChange) {
          onInputChange(event.currentTarget.value, getSelection(inputRef.current));
        }
      },
      [onInputChange]
    );

    if (!disabled) {
      inputProps.ref = inputRef;
      inputProps.autoFocus = autoFocus;
      inputProps.placeholder = placeholder;

      // support for useFocusCapture hooks
      if (autoFocus) {
        inputProps["data-autofocus"] = "";
      }

      if (readonly) {
        inputProps.readOnly = true;
      } else {
        inputProps.onChange = handleChange;
        inputProps.value = inputProps.value || ""; // force empty value for controlled component
      }
    }

    return <InputBox {...other}>{renderInput(inputProps)}</InputBox>;
  }
);

InputTextBase.displayName = "InputTextBase";
InputTextBase.propTypes = InputTextBasePropTypes;

export default InputTextBase;
