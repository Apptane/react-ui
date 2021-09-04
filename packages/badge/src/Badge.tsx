import { Bullet } from "@apptane/react-ui-bullet";
import { findVisualStyleBySize, getComponentSize, hasChildContent, StyleMargin } from "@apptane/react-ui-core";
import {
  BadgeVisualAppearance,
  BadgeVisualStyle,
  resolveFont,
  Theme,
  useVisualAppearance,
} from "@apptane/react-ui-theme";
import { StyleText } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { memo } from "react";
import { BadgeProps, BadgePropTypes } from "./Badge.types";

const StyleBase = (theme: Theme, height: number, appearance: BadgeVisualAppearance, style: BadgeVisualStyle) => css`
  display: flex;
  position: relative;

  // geometry
  box-sizing: border-box;
  border-radius: ${style.borderRadius}px;
  height: ${height}px;
  min-width: ${height}px;

  // behavior
  user-select: none;

  // content and appearance
  ${StyleText(resolveFont(theme.typography, style.font), appearance.text)};
  ${appearance.back && `background-color: ${appearance.back}`};

  justify-content: center;
  align-items: center;
  white-space: nowrap;
  flex-wrap: nowrap;
  flex: initial;
`;

const StyleWrapper = css`
  display: flex;
  flex: initial;
  width: max-content;
  position: relative;
`;

const StyleSuperscript = (offset: number) => css`
  position: absolute;
  top: -${offset}px;
  right: 0;
  transform-origin: 100%;
  transform: translateX(50%);
`;

/**
 * `Badge` component — a primitive that renders a colored badge based on
 * intent and appearance and can be used either as a standalone element
 * or as a decorator for a child element.
 */
function Badge({
  children,
  value,
  colorMode,
  appearance = "primary",
  intent = "none",
  size = "default",
  padding,
  bulletVisible,
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
}: BadgeProps) {
  const decorator = hasChildContent(children);
  const [visualAppearance, theme] = useVisualAppearance<BadgeVisualAppearance>(
    "badge",
    colorMode,
    appearance,
    intent,
    typeof size === "number" ? "default" : size
  );

  const actualSize = getComponentSize(theme.components.badge.sizes, size);
  const visualStyle = findVisualStyleBySize(theme.components.badge.styles, actualSize);

  const marginProps = { margin, marginTop, marginRight, marginBottom, marginLeft, m, mt, mr, mb, ml };
  const element =
    value != null ? (
      <div
        {...other}
        css={[
          StyleBase(theme, actualSize, visualAppearance, visualStyle),
          !decorator && StyleMargin(marginProps),
          decorator && StyleSuperscript(actualSize / 2),
          {
            paddingLeft: padding ?? visualStyle.padding.l,
            paddingRight: padding ?? visualStyle.padding.r ?? visualStyle.padding.l,
            width: decorator ? undefined : "max-content",
          },
        ]}>
        {(bulletVisible ?? visualAppearance.bulletVisible) && (
          <Bullet colorMode={colorMode} intent={intent} marginRight={visualStyle.spacing} />
        )}
        {value}
      </div>
    ) : null;

  if (decorator) {
    return (
      <div css={[StyleWrapper, StyleMargin(marginProps)]}>
        {children}
        {element}
      </div>
    );
  } else {
    return element;
  }
}

Badge.displayName = "Badge";
Badge.propTypes = BadgePropTypes;

/**
 * `Badge` component — a primitive that renders a colored badge based on
 * intent and appearance and can be used either as a standalone element
 * or as a decorator for a child element.
 */
export default memo(Badge);
