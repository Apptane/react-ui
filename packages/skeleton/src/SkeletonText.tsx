import { AnimationStyle } from "@apptane/react-ui-core";
import { SkeletonVisualAppearance, useVisualAppearance } from "@apptane/react-ui-theme";
import { css } from "@emotion/react";
import { StyleAnimation } from "./SkeletonBase";
import { SkeletonTextProps, SkeletonTextPropTypes } from "./SkeletonText.types";

const StyleText = (appearance: SkeletonVisualAppearance, animation: AnimationStyle, height: number) => css`
  ${StyleAnimation(animation)};
  background: ${appearance.default};
  height: ${height}px;
`;

/**
 * `SkeletonText` component — represents a line or a paragraph of skeleton text.
 */
function SkeletonText({ colorMode, appearance, lines = 1 }: SkeletonTextProps) {
  const [visualAppearance, theme] = useVisualAppearance<SkeletonVisualAppearance>("skeleton", colorMode, appearance);
  const entries = [];
  for (let i = 0; i < lines; ++i) {
    entries.push(
      <div
        key={`l${i}`}
        css={[
          StyleText(visualAppearance, theme.components.skeleton.animation, theme.components.skeleton.style.lineHeight),
          {
            marginTop: theme.components.skeleton.style.paragraphSpacing,
            width: i > 0 && i === lines - 1 ? "80%" : "100%",
          },
        ]}
      />
    );
  }

  return <div>{entries}</div>;
}

SkeletonText.displayName = "SkeletonText";
SkeletonText.propTypes = SkeletonTextPropTypes;

export default SkeletonText;
