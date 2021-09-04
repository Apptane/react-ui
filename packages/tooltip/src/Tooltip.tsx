import { Trigger, TriggerOption } from "@apptane/react-ui-behaviors";
import { Color, Placement } from "@apptane/react-ui-core";
import { Theme, TooltipVisualAppearance, TooltipVisualStyle, useVisualAppearance } from "@apptane/react-ui-theme";
import { Paragraph, Text } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { TooltipProps, TooltipPropTypes } from "./Tooltip.types";

const StyleWrapper = (theme: Theme) => css`
  display: block;
  width: max-content;
  position: relative;
  user-select: none;
  z-index: ${theme.zindex.tooltip};
  opacity: ${theme.components.tooltip.style.opacity};

  &,
  * {
    pointer-events: none;
  }

  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
  }
`;

const StyleTop = (size: number, color: Color) => css`
  padding: 0 0 ${size}px 0;
  &::before {
    bottom: 0;
    left: 50%;
    margin-left: -${size}px;
    border-width: ${size}px ${size}px 0;
    border-top-color: ${color};
  }
`;

const StyleTopLeft = (size: number, color: Color) => css`
  padding: 0 0 ${size}px 0;
  &::before {
    bottom: 0;
    left: ${3 * size}px;
    border-width: ${size}px ${size}px 0;
    border-top-color: ${color};
  }
`;

const StyleTopRight = (size: number, color: Color) => css`
  padding: 0 0 ${size}px 0;
  &::before {
    bottom: 0;
    right: ${3 * size}px;
    border-width: ${size}px ${size}px 0;
    border-top-color: ${color};
  }
`;

const StyleRight = (size: number, color: Color) => css`
  padding: 0 0 0 ${size}px;
  &::before {
    left: 0;
    top: 50%;
    margin-top: -${size}px;
    border-width: ${size}px ${size}px ${size}px 0;
    border-right-color: ${color};
  }
`;

const StyleLeft = (size: number, color: Color) => css`
  padding: 0 ${size}px 0 0;
  &::before {
    right: 0;
    top: 50%;
    margin-top: -${size}px;
    border-width: ${size}px 0 ${size}px ${size}px;
    border-left-color: ${color};
  }
`;

const StyleBottom = (size: number, color: Color) => css`
  padding: ${size}px 0 0 0;
  &::before {
    top: 0;
    left: 50%;
    margin-left: -${size}px;
    border-width: 0 ${size}px ${size}px;
    border-bottom-color: ${color};
  }
`;

const StyleBottomLeft = (size: number, color: Color) => css`
  padding: ${size}px 0 0 0;
  &::before {
    top: 0;
    left: ${3 * size}px;
    border-width: 0 ${size}px ${size}px;
    border-bottom-color: ${color};
  }
`;

const StyleBottomRight = (size: number, color: Color) => css`
  padding: ${size}px 0 0 0;
  &::before {
    top: 0;
    right: ${3 * size}px;
    border-width: 0 ${size}px ${size}px;
    border-bottom-color: ${color};
  }
`;

const StyleContent = (style: TooltipVisualStyle, appearance: TooltipVisualAppearance, maxWidth?: number) => css`
  max-width: ${maxWidth ?? style.maxWidth}px;
  padding: ${style.padding.t}px ${style.padding.r ?? style.padding.l}px ${style.padding.b ?? style.padding.t}px
    ${style.padding.l}px;
  background-color: ${appearance.back};
  ${appearance.border && `border: solid 1px ${appearance.border}`};
  border-radius: ${style.borderRadius}px;
`;

function StyleArrow(style: TooltipVisualStyle, appearance: TooltipVisualAppearance, placement: Placement) {
  switch (placement) {
    case "top":
    case "top-center":
      return StyleTop(style.arrowSize, appearance.back);
    case "top-left":
      return StyleTopLeft(style.arrowSize, appearance.back);
    case "top-right":
      return StyleTopRight(style.arrowSize, appearance.back);
    case "bottom":
    case "bottom-center":
      return StyleBottom(style.arrowSize, appearance.back);
    case "bottom-left":
      return StyleBottomLeft(style.arrowSize, appearance.back);
    case "bottom-right":
      return StyleBottomRight(style.arrowSize, appearance.back);
    case "left":
    case "left-middle":
    case "left-top":
    case "left-bottom":
      return StyleLeft(style.arrowSize, appearance.back);
    case "right":
    case "right-middle":
    case "right-top":
    case "right-bottom":
      return StyleRight(style.arrowSize, appearance.back);
  }
}

/**
 * Tooltip component.
 */
function Tooltip({
  children,
  header,
  colorMode,
  appearance = "default",
  placement = "top",
  arrowVisible,
  maxWidth,
}: TooltipProps) {
  const [visualAppearance, theme] = useVisualAppearance<TooltipVisualAppearance>("tooltip", colorMode, appearance);
  const visualStyle = theme.components.tooltip.style;

  return (
    <div
      role="tooltip"
      css={[
        StyleWrapper(theme),
        visualAppearance.elevation && theme.elevation(visualAppearance.elevation),
        arrowVisible && StyleArrow(visualStyle, visualAppearance, placement),
        !arrowVisible && {
          margin: 4,
        },
      ]}>
      <div css={StyleContent(visualStyle, visualAppearance, maxWidth)}>
        {header && (
          <Text
            {...visualStyle.font.header}
            color={visualAppearance.text}
            alignment="left"
            marginBottom={visualStyle.contentSpacing}>
            {header}
          </Text>
        )}
        <Paragraph {...visualStyle.font.body} color={visualAppearance.text} alignment="left">
          {children}
        </Paragraph>
      </div>
    </div>
  );
}

Tooltip.displayName = "Tooltip";
Tooltip.propTypes = TooltipPropTypes;

export default Tooltip;

type TooltipTriggerProps = TooltipProps & {
  content: React.ReactNode;
  trigger?: TriggerOption;
  inline?: boolean;
};

/**
 * Creates triggered tooltip with the specified properties.
 */
export function createTooltip({
  children,
  content,
  trigger = "hover",
  inline,
  placement = "top",
  ...other
}: TooltipTriggerProps) {
  return (
    <Trigger
      trigger={trigger}
      inline={inline}
      preventDefault
      placement={placement}
      component={
        <Tooltip {...other} placement={placement}>
          {content}
        </Tooltip>
      }>
      {children}
    </Trigger>
  );
}
