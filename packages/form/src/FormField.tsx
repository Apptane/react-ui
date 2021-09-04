import { ItemValue, ValueBoundControlProps } from "@apptane/react-ui-core";
import { FieldLabel } from "@apptane/react-ui-input";
import { Pane } from "@apptane/react-ui-pane";
import { useColorMode, useTheme } from "@apptane/react-ui-theme";
import { Paragraph } from "@apptane/react-ui-typography";
import React, { Children, cloneElement, isValidElement, useContext } from "react";
import { FormContext } from "./FormContext";
import { FormFieldProps, FormFieldPropTypes } from "./FormField.types";

/**
 * `FormField` component — represents a field in the form layout with an optional label and hint text.
 */
function FormField<T extends ItemValue>({
  children,
  label,
  hint,
  name,
  disabled,
  value,
  onChange,
  ...other
}: FormFieldProps<T>) {
  const theme = useTheme();
  const colorMode = useColorMode();
  const visualStyle = theme.components.form.style;
  const visualAppearance = theme.components.form.appearance(theme.palette[colorMode], colorMode, undefined, "none");
  const form = useContext(FormContext);

  disabled = disabled || form?.disabled;

  if (Children.count(children) == 0) {
    return null;
  }

  let control: React.ReactElement<ValueBoundControlProps<T>> | null = null;
  const child = Children.only(children);
  if (isValidElement(child)) {
    control = child as React.ReactElement<ValueBoundControlProps<T>>;
    control = cloneElement(control, {
      disabled: disabled || control.props.disabled,
      value: value ?? control.props.value,
      onChange: onChange ?? control.props.onChange,
    });
  }

  return (
    <Pane {...other}>
      {label && (
        <FieldLabel colorMode={colorMode} block marginBottom={visualStyle.labelSpacing} disabled={disabled} name={name}>
          {label}
        </FieldLabel>
      )}
      {control}
      {hint && (
        <Paragraph marginTop={visualStyle.hintSpacing} color={visualAppearance.hint} {...visualStyle.font.hint}>
          {hint}
        </Paragraph>
      )}
    </Pane>
  );
}

FormField.displayName = "FormField";
FormField.propTypes = FormFieldPropTypes;

export default FormField;
