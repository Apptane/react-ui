import {
  Color,
  findVisualStyleBySize,
  getComponentSize,
  isHighDpiMedia,
  PaletteHue,
  resolveTextColor,
  StyleButtonReset,
  StyleMargin,
} from "@apptane/react-ui-core";
import {
  AvatarAppearance,
  AvatarVisualAppearance,
  AvatarVisualStyle,
  resolveFont,
  useColorMode,
  useTheme,
} from "@apptane/react-ui-theme";
import { createTooltip } from "@apptane/react-ui-tooltip";
import { StyleText } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { useCallback } from "react";
import md5 from "md5";
import { stringify } from "query-string";
import { AvatarProps, AvatarPropTypes } from "./Avatar.types";

const StyleBase = (
  style: AvatarVisualStyle,
  size: number,
  background: Color,
  borderWidth: number,
  border?: Color,
  square?: boolean,
  inline?: boolean
) => css`
  ${StyleButtonReset};

  display: ${inline ? "inline-flex" : "flex"};
  position: relative;
  box-sizing: border-box;
  flex: none;
  overflow: hidden;
  width: ${size}px;
  height: ${size}px;
  justify-content: center;
  align-items: center;

  border-radius: ${square ? style.borderRadius : size}px;
  background: ${background};
  border-width: ${borderWidth}px;
  ${border && `border-style: solid`};
  ${border && `border-color: ${border}`};
`;

const StyleOverflow = (style: AvatarVisualStyle, size: number, color: Color, square?: boolean) => css`
  display: flex;
  box-sizing: border-box;
  flex: none;
  overflow: hidden;
  width: ${size}px;
  height: ${size}px;
  justify-content: center;
  align-items: center;
  border: solid 1px ${color};
  border-radius: ${square ? style.borderRadius : size}px;
`;

const StyleInteractive = (appearance: AvatarVisualAppearance) => css`
  cursor: pointer;
  &:hover,
  &:focus {
    border-style: solid;
    border-color: ${appearance.outline};
  }
`;

function getInitials(name?: string, fallback = "?") {
  if (!name || typeof name !== "string") return fallback;
  return name
    .replace(/\s+/, " ")
    .split(" ")
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join("");
}

type GravatarImageProps = {
  email?: string;
  size: number;
  rating?: string;
  defaultType?: string;
};

const GRAVATAR_BASE_URL = "//www.gravatar.com/avatar/";
const GravatarImage = ({ email, size, rating = "g", defaultType = "retro", ...other }: GravatarImageProps) => {
  // trip and lowercase before computing MD5 hash
  email = ("" + email).trim().toLowerCase();
  const hash = md5(email);

  const regularQuery = stringify({
    s: size,
    r: rating,
    d: defaultType,
  });

  const highDpiQuery = stringify({
    s: size * 2,
    r: rating,
    d: defaultType,
  });

  const regularSrc = `${GRAVATAR_BASE_URL}${hash}?${regularQuery}`;
  const highDpiSrc = `${GRAVATAR_BASE_URL}${hash}?${highDpiQuery}`;

  // supports srcSet tag
  const supportsSrcSet = typeof window !== "undefined" && "srcset" in document.createElement("img");

  if (!supportsSrcSet && isHighDpiMedia()) {
    return <img {...other} alt={`Gravatar for ${email}`} src={highDpiSrc} height={size} width={size} />;
  } else {
    return (
      <img
        {...other}
        alt={`Gravatar for ${email}`}
        src={regularSrc}
        srcSet={`${highDpiSrc} 2x`}
        height={size}
        width={size}
      />
    );
  }
};

/**
 * `Avatar` component — supports initials-based or Gravatar-based avatars.
 * Optionally can display an `overflow` number, useful when showing multiple avatars in a block.
 */
function Avatar({
  type = "default",
  size = "default",
  colorMode,
  color,
  textColor,
  border,
  name,
  image,
  email,
  tooltip,
  square = false,
  onClick,
  overflow,
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
}: AvatarProps) {
  const theme = useTheme();
  const actualColorMode = useColorMode(colorMode);
  const palette = theme.palette[actualColorMode];

  const actualSize = getComponentSize(theme.components.avatar.sizes, size);
  const visualStyle = findVisualStyleBySize(theme.components.avatar.styles, actualSize);

  let content;
  let appearance: AvatarAppearance;
  let visualAppearance: AvatarVisualAppearance | undefined = undefined;

  if (overflow != null) {
    appearance = "overflow";
    visualAppearance = theme.components.avatar.appearance(
      palette,
      actualColorMode,
      appearance,
      "none",
      typeof size === "number" ? "default" : size
    );
    content = (
      <div
        css={[visualAppearance.border && StyleOverflow(visualStyle, actualSize - 2, visualAppearance.border, square)]}>
        +{overflow}
      </div>
    );
  } else if (type === "gravatar") {
    appearance = "default";
    content = <GravatarImage size={actualSize} email={email} />;
  } else {
    if (image) {
      appearance = "default";
      content = <img src={image} height={actualSize} width={actualSize} />;
    } else {
      appearance = "initials";
      content = <div>{getInitials(name)}</div>;
    }
  }

  visualAppearance =
    visualAppearance ??
    theme.components.avatar.appearance(
      palette,
      actualColorMode,
      appearance,
      "none",
      typeof size === "number" ? "default" : size
    );

  if (color != null) {
    const pigment = palette.pigments[color as PaletteHue];
    if (pigment && visualAppearance.weight != null) {
      color = pigment[visualAppearance.weight];
    }
  }

  color = color ?? visualAppearance.back;

  const interactive = typeof onClick === "function";
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key == " ") {
        if (typeof onClick === "function") {
          onClick();
        }

        event.preventDefault();
      }
    },
    [onClick]
  );

  const marginProps = { margin, marginTop, marginRight, marginBottom, marginLeft, m, mt, mr, mb, ml };
  const avatar = (
    <div
      onClick={interactive ? onClick : undefined}
      onKeyDown={interactive ? onKeyDown : undefined}
      tabIndex={interactive ? 0 : undefined}
      css={[
        StyleBase(
          visualStyle,
          actualSize,
          color,
          appearance === "overflow" ? 1 : 2,
          border ? palette.light : undefined,
          square,
          inline
        ),
        StyleMargin(marginProps),
        visualAppearance.text &&
          StyleText(
            resolveFont(theme.typography, visualStyle.font),
            textColor ? resolveTextColor(palette, textColor) : visualAppearance.text,
            "center"
          ),
        interactive && StyleInteractive(visualAppearance),
      ]}>
      {content}
    </div>
  );

  return tooltip
    ? createTooltip({
        children: avatar,
        content: tooltip,
        inline: inline,
        colorMode: colorMode,
      })
    : avatar;
}

Avatar.displayName = "Avatar";
Avatar.propTypes = AvatarPropTypes;

export default Avatar;
