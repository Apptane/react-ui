import { StyleMargin, StyleOutlineReset } from "@apptane/react-ui-core";
import { Icon } from "@apptane/react-ui-icon";
import { HyperlinkVisualAppearance, resolveFont, useVisualAppearance } from "@apptane/react-ui-theme";
import { ClassNames, css } from "@emotion/react";
import { Fragment, memo, useMemo } from "react";
import { HyperlinkProps, HyperlinkPropTypes } from "./Hyperlink.types";
import { StyleText, StyleTextEllipsis, StyleTextNowrap } from "./Styles";

const StyleContainer = (block?: boolean) => css`
  ${StyleOutlineReset};

  display: ${block ? "flex" : "inline-flex"};
  align-items: center;
  text-decoration: none;
`;

const StyleLink = (appearance: HyperlinkVisualAppearance) => css`
  cursor: pointer;
  &:hover,
  &:focus {
    color: ${appearance.focused.text};
  }
`;

const StyleDecorated = css`
  &:hover,
  &:focus {
    text-decoration: underline solid;
  }
`;

/**
 * HACK: normally we should have set icon color via
 * corresponding property, but since maintaining both
 * hover and focused states for the button via events
 * is an overkill we override via CSS
 * NOTE: THIS DOESN'T WORK FOR STROKE-BASED SVGs :-\
 */
const StyleNormalIcon = (appearance: HyperlinkVisualAppearance) => css`
  svg {
    fill: ${appearance.default.icon};
  }

  &:hover,
  &:focus {
    svg {
      fill: ${appearance.focused.icon};
    }
  }
`;

/**
 * `Hyperlink` component — supports different appearances, text styles and icons.
 */
function Hyperlink({
  children,
  category = "content",
  size = "medium",
  weight = "regular",
  lineHeight,
  spacing,
  alignment = "left",
  nowrap,
  ellipsis,
  colorMode,
  appearance = "primary",
  decorated = false,
  disabled,
  onClick,
  iconSize = 16,
  iconAfterName,
  iconAfterData,
  iconBeforeName,
  iconBeforeData,
  block,
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
}: HyperlinkProps) {
  const [visualAppearance, theme] = useVisualAppearance<HyperlinkVisualAppearance>("hyperlink", colorMode, appearance);
  const visualStyle = theme.components.hyperlink.style;
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

  const marginProps = { margin, marginTop, marginRight, marginBottom, marginLeft, m, mt, mr, mb, ml };
  const style = [
    StyleContainer(block),
    !disabled && StyleLink(visualAppearance),
    !disabled && StyleNormalIcon(visualAppearance),
    !disabled && decorated && StyleDecorated,
    StyleText(font, disabled ? visualAppearance.disabled.text : visualAppearance.default.text, alignment),
    StyleMargin(marginProps),
    nowrap && StyleTextNowrap,
    ellipsis && StyleTextEllipsis,
  ];

  if (typeof children === "function") {
    const renderPropsChildren = children;
    return (
      <ClassNames>
        {({ css }) => {
          const childProps = {
            className: css(style),
            ...other,
          };

          return renderPropsChildren(childProps);
        }}
      </ClassNames>
    );
  }

  // NB: we are using somewhat hack-ish approach to control
  // embedded icon color (fill) to support focus/hover via
  // CSS selectors. The idea is to supply 'none' as the color
  // value to <Icon/> and then override it with CSS rule.
  const content = (
    <Fragment>
      {(iconBeforeName || iconBeforeData) && (
        <Icon
          color={disabled ? visualAppearance.disabled.icon : "none"}
          name={iconBeforeName}
          data={iconBeforeData}
          size={iconSize}
          marginRight={visualStyle.iconSpacing}
        />
      )}
      {children}
      {(iconAfterName || iconAfterData) && (
        <Icon
          color={disabled ? visualAppearance.disabled.icon : "none"}
          name={iconAfterName}
          data={iconAfterData}
          size={iconSize}
          marginLeft={visualStyle.iconSpacing}
        />
      )}
    </Fragment>
  );

  return disabled ? (
    <span css={style}>{content}</span>
  ) : (
    <a {...other} onClick={onClick} css={style}>
      {content}
    </a>
  );
}

Hyperlink.displayName = "Hyperlink";
Hyperlink.propTypes = HyperlinkPropTypes;

/**
 * `Hyperlink` component — supports different appearances, text styles and icons.
 */
export default memo(Hyperlink);
