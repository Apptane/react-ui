import { Color, StyleOutlineReset } from "@apptane/react-ui-core";
import { Icon } from "@apptane/react-ui-icon";
import { Text } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { useCallback } from "react";
import { SortDirection } from "./TableView.types";
import { StyleCell } from "./TableViewCell";
import { TableViewColumnHeaderProps, TableViewColumnHeaderPropTypes } from "./TableViewColumnHeader.types";

const StyleHeader = css`
  ${StyleOutlineReset};

  // behavior
  touch-action: manipulation;
  user-select: none;
`;

const StyleInteractive = (highlight: Color) => css`
  cursor: pointer;
  &:hover,
  &:focus {
    background: ${highlight};
  }
`;

const StyleContent = (alignment: string) => css`
  flex: 0 1 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  align-items: center;
  justify-content: ${alignment};
`;

/**
 * `TableView` column header.
 */
export function TableViewColumnHeader<T>({
  children,
  flexAlignment,
  flex = false,
  width,
  minWidth,
  paddingLeft,
  paddingRight,
  sortKey,
  sortDir,
  onSortChanged,
  theme,
  appearance,
}: TableViewColumnHeaderProps<T>) {
  const interactive = sortKey != null;
  const onSortLoop = useCallback(() => {
    let nextDir: SortDirection | null;
    switch (sortDir) {
      case "asc":
        nextDir = "desc";
        break;
      case "desc":
        nextDir = null;
        break;
      default:
        nextDir = "asc";
        break;
    }

    if (typeof onSortChanged === "function" && sortKey != null) {
      onSortChanged(sortKey, nextDir);
    }
  }, [sortKey, sortDir, onSortChanged]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key == " ") {
        onSortLoop();
        event.preventDefault();
      }
    },
    [onSortLoop]
  );

  const visualStyle = theme.components.tableView.style;

  let content = typeof children === "function" ? children() : children;
  if (typeof content === "string") {
    content = (
      <Text ellipsis color={appearance.header.text} {...visualStyle.font.header}>
        {content}
      </Text>
    );
  }

  return (
    <div
      role="columnheader"
      tabIndex={interactive ? 0 : undefined}
      onClick={interactive ? onSortLoop : undefined}
      onKeyDown={interactive ? onKeyDown : undefined}
      css={[
        StyleHeader,
        StyleCell("stretch", paddingLeft, paddingRight, flex, width, minWidth),
        interactive && StyleInteractive(appearance.header.highlight),
      ]}>
      <div css={StyleContent(flexAlignment)}>{content}</div>
      {interactive && (
        <Icon
          marginLeft={visualStyle.sortIconSpacing}
          marginRight={visualStyle.cellSortShift}
          color={sortDir ? appearance.sort.active : appearance.sort.default}
          size={visualStyle.sortIconSize}
          name={sortDir === "desc" ? "i:sort-down" : sortDir === "asc" ? "i:sort-up" : "i:sort-updown"}
        />
      )}
    </div>
  );
}

TableViewColumnHeader.propTypes = TableViewColumnHeaderPropTypes;

export default TableViewColumnHeader;
