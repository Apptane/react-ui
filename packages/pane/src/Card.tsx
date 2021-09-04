import { useTheme } from "@apptane/react-ui-theme";
import Pane from "./Pane";
import { PaneProps, PanePropTypes } from "./Pane.types";

/**
 * `Card` component — pane with default background and border.
 */
function Card({ background = "default", border = "default", ...other }: PaneProps) {
  const theme = useTheme();
  return (
    <Pane cornerRadius={theme.components.pane.style.borderRadius} border={border} background={background} {...other} />
  );
}

Card.displayName = "Card";
Card.propTypes = PanePropTypes;

export default Card;
