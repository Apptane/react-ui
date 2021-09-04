import { css } from "@emotion/react";

export const StyleOutlineReset = css`
  outline: 0;

  // FireFox doesn't respect outline: 0
  ::-moz-focus-inner {
    border: 0;
  }
`;

export const StyleButtonReset = css`
  ${StyleOutlineReset};

  padding: 0;
  margin: 0;
  background: none;
  border: none;
  line-height: 1;

  // behavior
  touch-action: manipulation;
  user-select: none;

  // geometry
  box-sizing: border-box;
`;
