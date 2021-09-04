import { ContentAlignment } from "@apptane/react-ui-core";
import { css } from "@emotion/react";
import { TableViewCellProps, TableViewCellPropTypes } from "./TableViewCell.types";

export const StyleCellFlex = (width: number, minWidth?: number) => css`
  flex-basis: 0%;
  flex-grow: ${width};
  min-width: ${minWidth ?? 0}px;
`;

export const StyleCellFixed = (width: number) => css`
  flex-basis: ${width}px;
  flex-grow: 0;
  min-width: ${width}px;
  max-width: ${width}px;
`;

export const StyleCell = (
  alignment: string | undefined,
  paddingLeft: number,
  paddingRight: number,
  flex: boolean,
  width: number,
  minWidth?: number
) => css`
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  align-items: center;
  justify-content: ${alignment};
  flex-shrink: 0;

  box-sizing: border-box;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: ${paddingLeft}px;
  padding-right: ${paddingRight}px;

  ${flex ? StyleCellFlex(width, minWidth) : StyleCellFixed(width)};
`;

const DEFAULT_FLEX = { width: 1, flex: true };

export function parseFlexWidth(value?: number | string) {
  if (value == null) {
    return DEFAULT_FLEX;
  }

  let w: number;
  if (typeof value === "string") {
    w = parseFloat(value);
    if (isNaN(w)) {
      return DEFAULT_FLEX;
    }
  } else {
    w = value;
  }

  return { flex: typeof value === "string" && value.endsWith("*"), width: w };
}

export function parseFlexAlignment(value?: ContentAlignment) {
  switch (value) {
    case "left":
      return "flex-start";
    case "center":
      return "center";
    case "right":
      return "flex-end";
    default:
      return "stretch";
  }
}

/**
 * `TableView` cell.
 */
export function TableViewCell<T>({
  children,
  flexAlignment,
  flex = false,
  width,
  minWidth,
  paddingLeft,
  paddingRight,
  rowObject,
  rowIndex,
}: TableViewCellProps<T>) {
  return (
    <div role="gridcell" css={StyleCell(flexAlignment, paddingLeft, paddingRight, flex, width, minWidth)}>
      {typeof children === "function" ? children(rowObject, rowIndex) : children}
    </div>
  );
}

TableViewCell.displayName = "TableViewCell";
TableViewCell.propTypes = TableViewCellPropTypes;

export default TableViewCell;
