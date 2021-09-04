import { resolveTextColor, StyleMargin } from "@apptane/react-ui-core";
import { resolveFont, useColorMode, useTheme } from "@apptane/react-ui-theme";
import { memo, useMemo } from "react";
import { StyleText, StyleTextEllipsis } from "./Styles";
import { TextProps, TextPropTypes } from "./Text.types";

/**
 * Multi-line text element.
 */
function Paragraph({
  children,
  category = "content",
  size = "medium",
  weight = "regular",
  lineHeight,
  spacing,
  color = "default",
  alignment = "left",
  ellipsis,
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
      }),
    [theme.typography, category, size, weight, lineHeight, spacing]
  );

  // NB: we use <div> since <p> cannot contain nested <div> and
  // we cannot control what inline-like elements we may need to
  // render within the paragraph that may be based on <div>
  const marginProps = { margin, marginTop, marginRight, marginBottom, marginLeft, m, mt, mr, mb, ml };
  return (
    <div
      css={[
        StyleText(font, resolveTextColor(theme.palette[colorMode], color), alignment),
        StyleMargin(marginProps),
        ellipsis && StyleTextEllipsis,
      ]}>
      {children}
    </div>
  );
}

Paragraph.displayName = "Paragraph";
Paragraph.propTypes = TextPropTypes;

/**
 * Multi-line text element.
 */
export default memo(Paragraph);
