import { jsx } from "@emotion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import raf from "raf";
import { InputNumericProps, InputNumericPropTypes } from "./InputNumeric.types";
import InputTextBase, { InputTextRefObject } from "./InputTextBase";
import { TextSelection } from "./InputTextBase.types";
import NumericVirtualInput from "./NumericVirtualInput";

/**
 * Sets virtual editor cursor selection to be in sync with the selection
 * of the physical editor.
 */
function setVirtualSelection(element: InputTextRefObject | null, virtual: NumericVirtualInput) {
  if (element) {
    const selection = element.getSelection();
    if (selection) {
      virtual.setSelection(selection.start, selection.end);
    }
  }
}

/**
 * Sets physical editor cursor selection to the specified value.
 */
function setPhysicalSelection(element: InputTextRefObject | null, selection: TextSelection) {
  if (element) {
    element.setSelection(selection);
  }
}

/**
 * `InputNumeric` component — customizable numeric input control.
 */
function InputNumeric({
  value,
  onChange,
  onKeyDown,
  prefix,
  suffix,
  thousands = true,
  precision,
  digits = -1,
  negative,
  delimiters,
  autoFocus,
  ...other
}: InputNumericProps) {
  const inputRef = useRef<InputTextRefObject>(null);
  const frame = useRef<ReturnType<typeof raf>>(0);

  const [virtual] = useState(
    () =>
      new NumericVirtualInput({
        prefix,
        suffix,
        thousands,
        precision,
        digits,
        negative,
        delimiters,
      })
  );

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [autoFocus, inputRef]);

  // sync external value with virtual input: this operation is nop
  // if value is the same and very cheap otherwise
  virtual.setValue(value);

  const disposeAnimationFrame = () => {
    if (frame.current) raf.cancel(frame.current);
  };

  // runs once on unmount
  useEffect(() => disposeAnimationFrame, []);

  // invoked when virtual editor changes: synchronizes physical editor
  // cursor selection with the virtual one and propagates changes externally
  //
  // NB: this technique has been borrowed from
  // https://github.com/sanniassin/react-input-mask/blob/master/build/InputElement.js
  //
  // this approach seems to work in Chrome, FF, IE browsers;
  // I am not entirely sure why different ways to set selection randomly
  // fail in different browsers, so will stick to this one until a better
  // mechanism becomes available
  const syncVirtualState = useCallback(() => {
    setPhysicalSelection(inputRef.current, virtual.selection); // immediately
    frame.current = raf(() => setPhysicalSelection(inputRef.current, virtual.selection)); // delayed

    // if the change is not accepted reset to the captured property value
    if (onChange == null || onChange(virtual.value) === false) {
      virtual.setValue(value);
    }
  }, [onChange, inputRef, virtual, value, frame]);

  // handles keyboard input for virtual inputs
  const _onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.metaKey || event.altKey || event.ctrlKey) {
        return;
      }

      if (event.key === "Backspace") {
        event.preventDefault();
        setVirtualSelection(inputRef.current, virtual);

        if (virtual.backspace()) {
          syncVirtualState();
        }
      } else {
        setVirtualSelection(inputRef.current, virtual);

        if (virtual.input(event.key)) {
          event.preventDefault();
          syncVirtualState();
        }
      }

      if (onKeyDown) {
        onKeyDown(event);
      }
    },
    [onKeyDown, virtual, syncVirtualState]
  );

  // handles clipboard paste for virtual inputs
  const onPaste = useCallback(
    (event: React.ClipboardEvent) => {
      let text;
      if (event.clipboardData && event.clipboardData.getData) {
        text = event.clipboardData.getData("text/plain");
      }

      event.preventDefault();
      setVirtualSelection(inputRef.current, virtual);
      if (text && virtual.paste(text)) {
        syncVirtualState();
      }
    },
    [syncVirtualState, inputRef, virtual]
  );

  // handles onChange event for virtual inputs
  // NB: virtual code parts borrowed from:
  // https://github.com/insin/react-maskedinput/blob/master/src/index.jsx
  const onVirtualChange = useCallback(
    (newValue: string) => {
      const virtualContent = virtual.content;
      const physicalContent = newValue;

      if (physicalContent !== virtualContent) {
        // cut or delete operations will have shortened the value
        if (physicalContent.length < virtualContent.length) {
          const delta = virtualContent.length - physicalContent.length;
          setVirtualSelection(inputRef.current, virtual);
          virtual.selection.end = virtual.selection.start + delta;
          if (virtual.backspace()) {
            syncVirtualState();
          }
        }
      }
    },
    [syncVirtualState, inputRef, virtual]
  );

  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {};
  const inputName = other.disabled ? "div" : "input";

  if (!other.disabled) {
    inputProps.type = "text";
    inputProps.value = virtual.content;
  }

  return (
    <InputTextBase
      {...other}
      autoFocus={autoFocus}
      ref={inputRef}
      onInputChange={onVirtualChange}
      onInputKeyDown={_onKeyDown}
      onInputPaste={onPaste}
      inputProps={inputProps}
      empty={value == null || !virtual.content}
      renderInput={(childProps) => jsx(inputName, childProps, other.disabled ? virtual.content : undefined)}
    />
  );
}

InputNumeric.displayName = "InputNumeric";
InputNumeric.propTypes = InputNumericPropTypes;

export default InputNumeric;
