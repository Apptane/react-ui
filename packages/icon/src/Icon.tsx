import { Color, resolveTextColor, StyleMargin } from "@apptane/react-ui-core";
import { useBuiltinGlyphs } from "@apptane/react-ui-glyphs";
import { useColorMode, useTheme } from "@apptane/react-ui-theme";
import { css } from "@emotion/react";
import { memo } from "react";
import { IconProps, IconPropTypes } from "./Icon.types";

const StyleBase = (color: Color, width: number, height: number, inline?: boolean) => css`
  display: ${inline ? "inline-flex" : "flex"};
  box-sizing: border-box;
  flex: none;
  vertical-align: middle;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill-rule: evenodd;
  fill: ${color};
  width: ${width}px;
  height: ${height}px;
`;

/**
 * `Icon` component — supports named SVG icons injected as symbols or as path data.
 */
function Icon({
  colorMode,
  name,
  size = 24,
  width,
  height,
  color = "default",
  data,
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
}: IconProps) {
  const theme = useTheme();
  const actualColorMode = useColorMode(colorMode);
  color = resolveTextColor(theme.palette[actualColorMode], color);

  useBuiltinGlyphs();

  const marginProps = { margin, marginTop, marginRight, marginBottom, marginLeft, m, mt, mr, mb, ml };
  return name != null || data != null ? (
    <svg
      {...other}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={data?.viewBox ? data.viewBox : undefined}
      css={[StyleBase(color, width ?? size, height ?? size, inline), StyleMargin(marginProps)]}>
      {data ? data.svg : <use href={`#${name}`} />}
    </svg>
  ) : null;
}

Icon.displayName = "Icon";
Icon.propTypes = IconPropTypes;

/**
 * `Icon` component — supports named SVG icons injected as symbols or as path data.
 */
export default memo(Icon);
