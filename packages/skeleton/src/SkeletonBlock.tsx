import { AnimationStyle, StyleMargin } from "@apptane/react-ui-core";
import { SkeletonVisualAppearance, useVisualAppearance } from "@apptane/react-ui-theme";
import { css } from "@emotion/react";
import { StyleAnimation } from "./SkeletonBase";
import { SkeletonBlockProps, SkeletonBlockPropTypes } from "./SkeletonBlock.types";

const StyleBlock = (appearance: SkeletonVisualAppearance, animation: AnimationStyle, radius: number) => css`
  ${StyleAnimation(animation)};
  background: ${appearance.default};
  border-radius: ${radius}px;
`;

/**
 * `SkeletonBlock` component — represents a block or round skeleton element.
 */
function SkeletonBlock({
  colorMode,
  appearance,
  width,
  height,
  round,
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
}: SkeletonBlockProps) {
  const [visualAppearance, theme] = useVisualAppearance<SkeletonVisualAppearance>("skeleton", colorMode, appearance);
  const marginProps = { margin, marginTop, marginRight, marginBottom, marginLeft, m, mt, mr, mb, ml };
  return (
    <div
      css={[
        StyleMargin(marginProps),
        StyleBlock(
          visualAppearance,
          theme.components.skeleton.animation,
          round ? height || 0 : theme.components.skeleton.style.borderRadius
        ),
        { width: round ? height : width, height: height },
      ]}
    />
  );
}

SkeletonBlock.displayName = "SkeletonBlock";
SkeletonBlock.propTypes = SkeletonBlockPropTypes;

export default SkeletonBlock;
