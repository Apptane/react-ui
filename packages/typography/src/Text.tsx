import { resolveTextColor, StyleMargin } from "@apptane/react-ui-core";
import { resolveFont, useColorMode, useTheme } from "@apptane/react-ui-theme";
import { memo, useMemo } from "react";
import { StyleText, StyleTextEllipsis, StyleTextNowrap } from "./Styles";
import { TextProps, TextPropTypes } from "./Text.types";

/**
 * Single-line text element.
 */
function Text({
  children,
  category = "content",
  size = "medium",
  weight = "regular",
  lineHeight,
  spacing,
  color = "default",
  alignment = "left",
  nowrap,
  ellipsis,
  mono,
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
}: TextProps) {
  const theme = useTheme();
  const colorMode = useColorMode();
  const font = useMemo(
    () =>
      resolveFont(theme.typography, {
        category: category,
        size: size,
        weight: weight,
        lineHeight: lineHeight,
        spacing: spacing,
        mono: mono,
      }),
    [theme.typography, category, size, weight, lineHeight, spacing, mono]
  );

  const marginProps = { margin, marginTop, marginRight, marginBottom, marginLeft, m, mt, mr, mb, ml };
  return (
    <span
      css={[
        { display: "inline-block" },
        StyleText(font, resolveTextColor(theme.palette[colorMode], color), alignment),
        StyleMargin(marginProps),
        nowrap && StyleTextNowrap,
        ellipsis && StyleTextEllipsis,
      ]}>
      {children}
    </span>
  );
}

Text.displayName = "Text";
Text.propTypes = TextPropTypes;

/**
 * Single-line text element.
 */
export default memo(Text);
