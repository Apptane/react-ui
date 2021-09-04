import { css } from "@emotion/react";
import { MediaObjectProps, MediaObjectPropTypes } from "./MediaObject.types";

const StyleGrid = (spacing: number) => css`
  display: grid;
  width: 100%;
  grid-column-gap: ${spacing}px;
  grid-template-columns: auto 1fr;
  grid-template-rows: repeat(3, minmax(min-content, max-content)) 1fr;
  grid-template-areas:
    "media ."
    "media header"
    "media content"
    ". content";
`;

const StyleGridMedia = css`
  grid-area: media;
  display: flex;
  align-self: center;
`;

const StyleGridContent = css`
  grid-area: content;
`;

const StyleGridHeader = css`
  grid-area: header;
  display: flex;
  align-self: center;
  align-items: center;

  &:empty {
    grid-column: 1;
    grid-row: 2;

    &::after {
      content: "x";
      visibility: hidden;
    }

    ~ div {
      grid-row-start: 2;
    }
  }
`;

const StyleFlex = css`
  display: flex;
  width: 100%;
  flex-direction: row;
`;

const StyleFlexMedia = (alignToTop: boolean, spacing?: number) => css`
  display: flex;
  align-items: ${alignToTop ? "flex-start" : "center"};
  ${spacing && `margin-right: ${spacing}px`};
`;

const StyleFlexContent = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

/**
 * `MediaObject` components — implements media object layout with different alignment options.
 */
function MediaObject({ children, header, media, alignment = "overhang", spacing }: MediaObjectProps) {
  return alignment === "overhang" ? (
    <div css={StyleGrid(media ? spacing ?? 0 : 0)}>
      <div css={StyleGridMedia}>{media}</div>
      <div css={StyleGridHeader}>{header}</div>
      <div css={StyleGridContent}>{children}</div>
    </div>
  ) : (
    <div css={StyleFlex}>
      {media && <div css={StyleFlexMedia(alignment === "top", spacing)}>{media}</div>}
      <div css={StyleFlexContent}>
        {header}
        {children}
      </div>
    </div>
  );
}

MediaObject.displayName = "MediaObject";
MediaObject.propTypes = MediaObjectPropTypes;

export default MediaObject;
