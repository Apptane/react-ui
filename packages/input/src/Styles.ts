import { css } from "@emotion/react";

export const StyleControl = (width: number, height: number, readonly?: boolean) => css`
  box-sizing: border-box;
  position: relative;
  z-index: 0; // establish stacking context
  outline: none;

  width: max-content;
  min-width: ${width}px;
  min-height: ${height}px;

  > input {
    cursor: ${readonly ? "inherit" : " pointer"};
    ${readonly && "pointer-events: none"};
    position: absolute;
    opacity: 0;
    margin: 0;
    left: 0;
    width: ${width}px;
    height: ${height}px;
    z-index: 1;
  }
`;
