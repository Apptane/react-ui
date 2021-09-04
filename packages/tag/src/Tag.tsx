import {
  Color,
  findVisualStyleBySize,
  getComponentSize,
  hasChildContent,
  Palette,
  PaletteHue,
  StyleButtonReset,
  StyleMargin,
} from "@apptane/react-ui-core";
import {
  resolveFont,
  TagVisualAppearance,
  TagVisualStateAppearance,
  TagVisualStyle,
  useVisualAppearance,
} from "@apptane/react-ui-theme";
import { createTooltip } from "@apptane/react-ui-tooltip";
import { StyleTextBase } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { memo, useCallback } from "react";
import { TagProps, TagPropTypes } from "./Tag.types";

type VisualVariant = {
  back: Color;
  text: Color;
  border?: Color;
};

function createVariant(palette: Palette, appearance: TagVisualStateAppearance, hue?: PaletteHue) {
  return {
    back: hue != null && appearance.backWeight ? palette.pigments[hue][appearance.backWeight] : appearance.back,
    text: hue != null ? palette.pigments[hue][appearance.textWeight] : appearance.text,
    border: hue != null && appearance.borderWeight ? palette.pigments[hue][appearance.borderWeight] : appearance.border,
  };
}

const StyleBase = (variant: VisualVariant, size: number, style: TagVisualStyle, inline?: boolean) => css`
  ${StyleButtonReset};

  display: ${inline ? "inline-flex" : "flex"};
  position: relative;

  // geometry
  box-sizing: border-box;
  border-radius: ${style.borderRadius}px;
  height: ${size}px;
  min-width: ${size}px;
  padding: 0 ${style.padding.r ?? style.padding.l}px 0 ${style.padding.l}px;

  // behavior
  user-select: none;

  // content and appearance
  text-align: center;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  flex-wrap: nowrap;
  flex: initial;
  width: max-content;

  background: ${variant.back};
  color: ${variant.text};
  ${variant.border && `border: solid 1px ${variant.border}`};

  > div {
    padding: 0 ${style.textPadding}px;
  }

  > svg {
    margin-left: ${style.spacing}px;
    display: block;
    fill: ${variant.text};
  }
`;

const StyleInteractive = (variant: VisualVariant) => css`
  cursor: pointer;
  &:hover,
  &:focus {
    background: ${variant.back};
    color: ${variant.text};
    ${variant.border && `border: solid 1px ${variant.border}`};

    > svg {
      fill: ${variant.text};
    }
  }
`;

const CloseButton = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636l4.95 4.95z" />
  </svg>
);

/**
 * `Tag` component — a primitive that renders a tag.
 */
function Tag({
  children,
  colorMode,
  appearance = "primary",
  size = "default",
  hue,
  tooltip,
  onRemove,
  inactive,
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
}: TagProps) {
  const [visualAppearance, theme, actualColorMode] = useVisualAppearance<TagVisualAppearance>(
    "tag",
    colorMode,
    appearance,
    "none",
    typeof size === "number" ? "default" : size
  );

  const hasContent = hasChildContent(children);
  const actualSize = getComponentSize(theme.components.tag.sizes, size);
  const visualStyle = findVisualStyleBySize(theme.components.tag.styles, actualSize);

  // determine color variants
  const defaultVisualAppearance = inactive ? visualAppearance.inactive : visualAppearance.default;
  const focusedVisualAppearance = visualAppearance.focused;
  const variants = {
    regular: createVariant(theme.palette[actualColorMode], defaultVisualAppearance, hue),
    focused: createVariant(theme.palette[actualColorMode], focusedVisualAppearance, hue),
  };

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Backspace" || event.key === "Delete") {
        if (typeof onRemove === "function") {
          onRemove();
        }

        event.preventDefault();
      }
    },
    [onRemove]
  );

  // suppress rendering if there is no content to render
  const interactive = typeof onRemove === "function";
  const marginProps = { margin, marginTop, marginRight, marginBottom, marginLeft, m, mt, mr, mb, ml };
  const element = hasContent ? (
    <div
      {...other}
      onClick={interactive ? onRemove : undefined}
      onKeyDown={interactive ? onKeyDown : undefined}
      tabIndex={interactive ? 0 : undefined}
      css={[
        StyleBase(variants.regular, actualSize, visualStyle, inline),
        StyleMargin(marginProps),
        StyleTextBase(resolveFont(theme.typography, visualStyle.font)),
        interactive && StyleInteractive(variants.focused),
      ]}>
      <div>{children}</div>
      {interactive && <CloseButton size={visualStyle.buttonSize} />}
    </div>
  ) : null;

  return tooltip && element
    ? createTooltip({
        children: element,
        content: tooltip,
        inline: inline,
        colorMode: colorMode,
      })
    : element;
}

Tag.displayName = "Tag";
Tag.propTypes = TagPropTypes;

/**
 * `Tag` component — a primitive that renders a tag.
 */
export default memo(Tag);
