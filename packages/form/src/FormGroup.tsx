import { useTheme } from "@apptane/react-ui-theme";
import { css } from "@emotion/react";
import { Fragment, useContext } from "react";
import { FormContext } from "./FormContext";
import { FormGroupProps, FormGroupPropTypes } from "./FormGroup.types";

const StyleGroup = (layout: string, spacing: number) => css`
  display: grid;
  grid-template-columns: ${layout};
  column-gap: ${spacing}px;
`;

/**
 * `FormGroup` component — provides grid layout for the fields.
 */
function FormGroup({ children, layout }: FormGroupProps) {
  const theme = useTheme();
  const visualStyle = theme.components.form.style;
  const form = useContext(FormContext);

  return layout ? (
    <div css={StyleGroup(layout, form?.spacing ?? visualStyle.fieldSpacing)}>{children}</div>
  ) : (
    <Fragment>{children}</Fragment>
  );
}

FormGroup.displayName = "FormGroup";
FormGroup.propTypes = FormGroupPropTypes;

export default FormGroup;
