import { StyleMargin } from "@apptane/react-ui-core";
import { FieldLabel } from "@apptane/react-ui-input";
import { useTheme } from "@apptane/react-ui-theme";
import { css, jsx } from "@emotion/react";
import { FormProps, FormPropTypes } from "./Form.types";
import { FormContext } from "./FormContext";
import FormField from "./FormField";
import FormGroup from "./FormGroup";

const StyleForm = (spacing: number) => css`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  > * + * {
    margin-top: ${spacing}px;
  }
`;

/**
 * `Form` layout.
 */
function Form({
  children,
  width,
  spacing,
  disabled,
  submit,
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
}: FormProps) {
  const theme = useTheme();
  spacing = spacing ?? theme.components.form.style.fieldSpacing;

  const marginProps = { margin, marginTop, marginRight, marginBottom, marginLeft, m, mt, mr, mb, ml };
  const element = jsx(
    typeof submit === "function" ? "form" : "div",
    {
      css: [
        StyleForm(spacing),
        StyleMargin(marginProps),
        {
          width: width || "100%",
        },
      ],
      role: "form",
      onSubmit: submit,
    },
    children
  );

  return (
    <FormContext.Provider
      value={{
        spacing,
        disabled,
      }}>
      {element}
    </FormContext.Provider>
  );
}

Form.displayName = "Form";
Form.propTypes = FormPropTypes;

/**
 * Label in the form layout.
 */
Form.Label = FieldLabel;

/**
 * `FormField` component — represents a field in the form layout with an optional label and hint text.
 */
Form.Field = FormField;

/**
 * `FormGroup` component — provides grid layout for the fields.
 */
Form.Group = FormGroup;

export default Form;
