import { hasChildContent, StyleMargin } from "@apptane/react-ui-core";
import { BulletVisualAppearance, useVisualAppearance } from "@apptane/react-ui-theme";
import { css } from "@emotion/react";
import { memo } from "react";
import { BulletProps, BulletPropTypes } from "./Bullet.types";

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
 * `Bullet` component — a primitive that renders a colored bullet based on
 * intent and can be used either as a standalone element or as a decorator
 * for a child element.
 */
function Bullet({
  children,
  colorMode,
  appearance,
  intent = "none",
  color,
  size,
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
}: BulletProps) {
  const [visualAppearance, theme, actualColorMode] = useVisualAppearance<BulletVisualAppearance>(
    "bullet",
    colorMode,
    appearance,
    intent
  );

  const actualSize = size ?? theme.components.bullet.style.size;
  const decorator = hasChildContent(children);

  const marginProps = { margin, marginTop, marginRight, marginBottom, marginLeft, m, mt, mr, mb, ml };
  const element = (
    <div
      {...other}
      css={[
        !decorator && StyleMargin(marginProps),
        decorator && StyleSuperscript(actualSize / 2),
        {
          width: actualSize,
          height: actualSize,
        },
      ]}>
      <svg
        viewBox={`0 0 ${actualSize} ${actualSize}`}
        width="100%"
        height="100%"
        css={{
          display: "block",
          margin: "auto",
        }}>
        <circle
          cx={actualSize / 2}
          cy={actualSize / 2}
          r={(actualSize - visualAppearance.borderWidth) / 2}
          strokeWidth={visualAppearance.borderWidth}
          stroke={color != null ? theme.palette[actualColorMode].white : visualAppearance.border}
          fill={color ?? visualAppearance.back}
        />
      </svg>
    </div>
  );

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

Bullet.displayName = "Bullet";
Bullet.propTypes = BulletPropTypes;

/**
 * `Bullet` component — a primitive that renders a colored bullet based on
 * intent and can be used either as a standalone element or as a decorator
 * for a child element.
 */
export default memo(Bullet);
