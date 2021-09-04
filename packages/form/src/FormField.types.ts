import {
  BoxDimensionsProps,
  BoxDimensionsPropTypes,
  BoxLayoutProps,
  BoxLayoutPropTypes,
  ItemValue,
  MarginProps,
  MarginPropTypes,
  ValueBoundControlProps,
  ValueBoundControlPropTypes,
} from "@apptane/react-ui-core";
import PropTypes from "prop-types";

export interface FormFieldProps<T extends ItemValue>
  extends BoxDimensionsProps,
    BoxLayoutProps,
    MarginProps,
    ValueBoundControlProps<T> {
  /**
   * Content.
   */
  children?: React.ReactNode;

  /**
   * Label content to display above the content.
   */
  label?: React.ReactNode;

  /**
   * Hint content to display below the content.
   */
  hint?: React.ReactNode;

  /**
   * Field name to pass to `htmlFor` attribute.
   */
  name?: string;
}

export const FormFieldPropTypes = {
  ...ValueBoundControlPropTypes,
  ...BoxDimensionsPropTypes,
  ...BoxLayoutPropTypes,
  ...MarginPropTypes,
  label: PropTypes.node,
  hint: PropTypes.node,
  name: PropTypes.string,
};
