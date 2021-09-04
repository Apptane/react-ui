import { ItemValue } from "@apptane/react-ui-core";
import Button from "./Button";
import { ButtonProps, ButtonPropTypes } from "./Button.types";

/**
 * `IconButton` component — shortcut component for rendering button with icon content only.
 */
function IconButton<T extends ItemValue>(
  props: Omit<ButtonProps<T>, "children" | "iconBeforeName" | "iconAfterName" | "iconBeforeData" | "iconAfterData">
) {
  // cast is necessary past 16.7.18: is this related?
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/32588
  return <Button<T> {...(props as ButtonProps<T>)} />;
}

IconButton.displayName = "IconButton";
IconButton.propTypes = ButtonPropTypes;

export default IconButton;
