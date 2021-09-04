import { HoverOrClickTriggerOptions, Trigger } from "@apptane/react-ui-behaviors";
import { getIntentIconAndColor, hasChildContent, StyleMargin } from "@apptane/react-ui-core";
import { Icon } from "@apptane/react-ui-icon";
import { Tooltip } from "@apptane/react-ui-tooltip";
import { css } from "@emotion/react";
import { memo } from "react";
import { CueProps, CuePropTypes } from "./Cue.types";

const StyleBase = (size: number, inline?: boolean) => css`
  display: ${inline ? "inline-flex" : "flex"};
  vertical-align: middle;
  width: ${size}px;
  height: ${size}px;
`;

/**
 * `Cue` component — icon with a tooltip displayed on click or hover.
 */
function Cue({
  children,
  header,
  appearance = "default",
  placement = "top-left",
  maxWidth,
  intent = "none",
  trigger = HoverOrClickTriggerOptions,
  color,
  name: iconName,
  data: iconData,
  size: iconSize = 16,
  zIndex,
  inline,
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
  ...other
}: CueProps) {
  const [intentIconName, intentIconColor] = getIntentIconAndColor(intent);

  const marginProps = { margin, marginTop, marginRight, marginBottom, marginLeft, m, mt, mr, mb, ml };
  const element = (
    <div {...other} css={[StyleBase(iconSize), StyleMargin(marginProps)]}>
      <Icon color={color ?? intentIconColor} name={iconName ?? intentIconName} data={iconData} size={iconSize} />
    </div>
  );

  if (!hasChildContent(children)) {
    return element;
  }

  return (
    <Trigger
      trigger={trigger}
      placement={placement}
      inline={inline}
      zIndex={zIndex}
      preventDefault
      component={
        <Tooltip appearance={appearance} header={header} maxWidth={maxWidth}>
          {children}
        </Tooltip>
      }>
      {element}
    </Trigger>
  );
}

Cue.displayName = "Cue";
Cue.propTypes = CuePropTypes;

/**
 * `Cue` component — icon with a tooltip displayed on click or hover.
 */
export default memo(Cue);
