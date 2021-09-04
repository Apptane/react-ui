import {
  AnimationStyle,
  Color,
  ContentHorizontalAlignment,
  ContentVerticalAlignment,
  ElevationStyle,
  Palette,
  resolveBackgroundColor,
  resolveBorderColor,
  StyleMargin,
  StylePadding,
} from "@apptane/react-ui-core";
import { PaneVisualAppearance, useVisualAppearance } from "@apptane/react-ui-theme";
import { css } from "@emotion/react";
import { PaneProps, PanePropTypes } from "./Pane.types";

const StyleTransition = (animation: AnimationStyle, duration?: number) => css`
  transition-property: width, padding;
  transition-delay: ${animation.delay}ms;
  transition-duration: ${duration ?? animation.duration}ms;
  transition-timing-function: ${animation.function};
`;

const StyleContainer = (overflow: string, inline?: boolean, scrollOnOverflow?: boolean) => css`
  position: relative;
  display: ${inline ? "inline-flex" : "flex"};
  box-sizing: border-box;
  overflow-x: ${overflow};
  overflow-y: ${scrollOnOverflow ? "scroll" : overflow};
  outline: none;
`;

const StyleInteractive = (elevation?: ElevationStyle) => css`
  &:focus,
  &:hover {
    cursor: pointer;
    ${elevation};
  }
`;

/**
 * Regular background style.
 */
const StyleRegularBackground = (background: Color) => css`
  background: ${background};
`;

/**
 * Special style for striped background.
 */
const StyleStripedBackground = (color: Color) => css`
  background-image: linear-gradient(
    -45deg,
    ${color} 25%,
    transparent 25%,
    transparent 50%,
    ${color} 50%,
    ${color} 75%,
    transparent 75%,
    transparent
  );
  background-size: 4px 4px;
`;

/**
 * Special style for 'checkered' background.
 */
const StyleTransparentBackground = css`
  background-color: #fff;
  background-image: linear-gradient(45deg, #efefef 25%, transparent 25%, transparent 75%, #efefef 75%, #efefef),
    linear-gradient(45deg, #efefef 25%, transparent 25%, transparent 75%, #efefef 75%, #efefef);
  background-position: 0 0, 10px 10px;
  background-size: 20px 20px;
`;

/**
 * Determines border CSS value.
 */
function borderValue(color: Color, palette: Palette, width: number, style: string, value?: boolean | string) {
  if (value == null || value === false) {
    return undefined;
  }

  color = typeof value === "boolean" ? color : resolveBorderColor(palette, value);
  return `${style} ${width}px ${color}`;
}

/**
 * Determines border-radius CSS value.
 */
function borderRadiusValue(value?: number) {
  return value != null && value > 0 ? `${value}px` : 0;
}

/**
 * Determines flex alignment CSS value.
 */
function flexAlignment(value: ContentVerticalAlignment | ContentHorizontalAlignment) {
  switch (value) {
    case "top":
    case "left":
      return "flex-start";
    case "bottom":
    case "right":
      return "flex-end";
    case "middle":
    case "center":
      return "center";
    case "space-between":
      return "space-between";
    default:
      return "stretch";
  }
}

/**
 * Determines flex value for grow/shrink.
 */
function flexValue(value: number | boolean | undefined) {
  return typeof value === "boolean" ? (value ? 1 : 0) : value != null ? value : 0;
}

/**
 * `Pane` component — supports flex layout, margin and padding for content positioning,
 * borders and background for appearance.
 */
function Pane({
  children,
  colorMode,
  appearance,
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
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  p,
  pt,
  pr,
  pb,
  pl,
  height,
  width,
  minHeight,
  maxHeight,
  minWidth,
  maxWidth,
  h,
  w,
  minH,
  maxH,
  minW,
  maxW,
  basis = "auto",
  grow = 0,
  shrink = 1,
  verticalAlignment = "top",
  horizontalAlignment = "stretch",
  orientation = "vertical",
  background,
  striped,
  border,
  borderWidth = 1,
  borderStyle = "solid",
  borderTop,
  borderTopWidth,
  borderRight,
  borderRightWidth,
  borderBottom,
  borderBottomWidth,
  borderLeft,
  borderLeftWidth,
  cornerRadius,
  cornerTopLeftRadius,
  cornerTopRightRadius,
  cornerBottomLeftRadius,
  cornerBottomRightRadius,
  elevation,
  wrap,
  inline,
  zIndex,
  animated,
  interactive,
  transitionDuration,
  scrollOnOverflow,
  overflow = "visible",
  accessibilityRole,
  ...other
}: PaneProps) {
  const [visualAppearance, theme, actualColorMode] = useVisualAppearance<PaneVisualAppearance>(
    "pane",
    colorMode,
    appearance
  );

  const palette = theme.palette[actualColorMode];

  let styleBackground;
  if (background != null) {
    if (background === "transparent") {
      styleBackground = StyleTransparentBackground;
    } else {
      const backColor = resolveBackgroundColor(palette, background);
      styleBackground = striped ? StyleStripedBackground(backColor) : StyleRegularBackground(backColor);
    }
  }

  const styleBorder = {
    borderTop: borderValue(
      visualAppearance.border,
      palette,
      borderTopWidth ?? borderWidth,
      borderStyle,
      borderTop ?? border
    ),
    borderRight: borderValue(
      visualAppearance.border,
      palette,
      borderRightWidth ?? borderWidth,
      borderStyle,
      borderRight ?? border
    ),
    borderBottom: borderValue(
      visualAppearance.border,
      palette,
      borderBottomWidth ?? borderWidth,
      borderStyle,
      borderBottom ?? border
    ),
    borderLeft: borderValue(
      visualAppearance.border,
      palette,
      borderLeftWidth ?? borderWidth,
      borderStyle,
      borderLeft ?? border
    ),
  };

  const styleBorderRadius = {
    borderTopLeftRadius: borderRadiusValue(cornerTopLeftRadius ?? cornerRadius),
    borderTopRightRadius: borderRadiusValue(cornerTopRightRadius ?? cornerRadius),
    borderBottomLeftRadius: borderRadiusValue(cornerBottomLeftRadius ?? cornerRadius),
    borderBottomRightRadius: borderRadiusValue(cornerBottomRightRadius ?? cornerRadius),
  };

  const marginProps = { margin, marginTop, marginRight, marginBottom, marginLeft, m, mt, mr, mb, ml };
  const paddingProps = { padding, paddingTop, paddingRight, paddingBottom, paddingLeft, p, pt, pr, pb, pl };
  const landscape = orientation === "horizontal";
  return (
    <div
      {...other}
      role={accessibilityRole}
      css={[
        StyleContainer(overflow, inline, scrollOnOverflow),
        StyleMargin(marginProps),
        StylePadding(paddingProps),
        animated && StyleTransition(theme.components.pane.animation, transitionDuration),
        interactive && StyleInteractive(theme.elevation(visualAppearance.elevation)),
        styleBackground,
        styleBorder,
        styleBorderRadius,
        theme.elevation(elevation),
        {
          height: height ?? h,
          width: width ?? w,
          minHeight: minHeight ?? minH,
          maxHeight: maxHeight ?? maxH,
          minWidth: minWidth ?? minW,
          maxWidth: maxWidth ?? maxW,
          flexBasis: basis ?? "auto",
          flexGrow: flexValue(grow),
          flexShrink: flexValue(shrink),
          flexWrap: wrap ? "wrap" : "nowrap",
          flexDirection: landscape ? "row" : "column",
          justifyContent: landscape ? flexAlignment(horizontalAlignment) : flexAlignment(verticalAlignment),
          alignItems: landscape ? flexAlignment(verticalAlignment) : flexAlignment(horizontalAlignment),
          zIndex: zIndex,
        },
      ]}>
      {children}
    </div>
  );
}

Pane.displayName = "Pane";
Pane.propTypes = PanePropTypes;

export default Pane;
