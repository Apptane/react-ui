import { getElementKey, isElementOfType, warning } from "@apptane/react-ui-core";
import { Pane } from "@apptane/react-ui-pane";
import {
  TableViewRowVisualAppearance,
  TableViewVisualAppearance,
  TableViewVisualStyle,
  useVisualAppearance,
} from "@apptane/react-ui-theme";
import { VirtualList, VirtualListHandle } from "@apptane/react-ui-virtual-list";
import { css } from "@emotion/react";
import {
  Children,
  forwardRef,
  isValidElement,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { TableViewProps, TableViewPropTypes } from "./TableView.types";
import { parseFlexAlignment, parseFlexWidth, TableViewCell } from "./TableViewCell";
import { TableViewCellProps } from "./TableViewCell.types";
import { TableViewColumn } from "./TableViewColumn";
import { TableViewColumnProps } from "./TableViewColumn.types";
import { TableViewColumnHeader } from "./TableViewColumnHeader";
import { TableViewExpansion } from "./TableViewExpansion";
import { TableViewExpansionProps } from "./TableViewExpansion.types";

const StyleEmpty = css`
  display: flex;
  flex-orientation: column;
  flex-wrap: nowrap;
  flex: auto;
  justify-content: center;
  align-items: center;
`;

const StyleFixed = css`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const StyleSticky = css`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
`;

const StyleRowBase = (height?: number) => css`
  display: flex;
  flex-orientation: row;
  flex-wrap: nowrap;
  align-items: stretch;
  box-sizing: border-box;
  position: relative;
  flex: none;
  ${height && `height: ${height}px`};
`;

const StyleRow = (
  appearance: TableViewRowVisualAppearance,
  style: TableViewVisualStyle,
  height?: number,
  focused?: boolean,
  borderHidden?: boolean
) => css`
  ${StyleRowBase(height)};
  background: ${focused ? appearance.highlight : appearance.back};
  border-bottom: ${borderHidden ? "none" : `solid ${style.rowBorderWidth}px ${appearance.border}`};
`;

const StyleCells = css`
  display: flex;
  flex-orientation: row;
  flex-wrap: nowrap;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
`;

const StyleCellsOther = css`
  ${StyleCells};
  flex: auto;
  width: 100%;
`;

const StyleCellsFixed = (
  appearance: TableViewRowVisualAppearance,
  style: TableViewVisualStyle,
  focused?: boolean
) => css`
  ${StyleSticky};
  ${StyleCells};
  flex: none;
  border-right: solid ${style.fixedBorderWidth}px ${appearance.border};
  background: ${focused ? appearance.highlight : appearance.back};
`;

const StyleRowInteractive = (appearance: TableViewRowVisualAppearance) => css`
  cursor: pointer;
  &:hover {
    background: ${appearance.highlight};
  }
`;

// [!] using functional notation here to workaround a subtle bug in EmotionJS
// that results in conditional hook usage that React (rightfully) complains about
// see: https://github.com/emotion-js/emotion/blob/1ee34005a5e02c9041b36f73395700f1965388eb/packages/react/src/emotion-element.js#L93
const StyleExpansionContainer = () => css`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100%;
`;

const StyleExpansion = (
  appearance: TableViewRowVisualAppearance,
  style: TableViewVisualStyle,
  paddingLeft: number,
  paddingRight: number,
  minHeight?: number,
  borderHidden?: boolean
) => css`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex: auto;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow: hidden;
  align-items: stretch;
  ${minHeight && `min-height: ${minHeight}px`};

  padding: 0 ${paddingRight}px 0 ${paddingLeft}px;
  background: ${appearance.back};
  border-bottom: ${borderHidden ? "none" : `solid ${style.rowBorderWidth}px ${appearance.border}`};
`;

function parseColumnProps<T>(
  props: TableViewColumnProps,
  style: TableViewVisualStyle,
  sidePadding?: number,
  lead?: boolean,
  tail?: boolean
): TableViewCellProps<T> {
  const w = parseFlexWidth(props.width);
  return {
    flexAlignment: parseFlexAlignment(props.alignment),
    flex: w.flex,
    width: w.width,
    minWidth: props.minWidth,
    paddingLeft:
      props.paddingLeft ?? (lead ? sidePadding ?? style.cellSidePadding : props.padding ?? style.cellPadding),
    paddingRight:
      props.paddingRight ?? (tail ? sidePadding ?? style.cellSidePadding : props.padding ?? style.cellPadding),
  };
}

function getColumnMinWidth(value?: number) {
  warning(value != null, "`minWidth` should be specified for flexible width columns; defaults to 0 otherwise.");
  return value ?? 0;
}

type TableContextData<T> = {
  data: ArrayLike<T>;
  sidePadding: TableViewProps<T>["sidePadding"];
  rowHeight: TableViewProps<T>["rowHeight"];
  rowExpanded: TableViewProps<T>["rowExpanded"];
  rowBorderHidden: TableViewProps<T>["rowBorderHidden"];
  lastRowBorderVisible: TableViewProps<T>["lastRowBorderVisible"];
  columns: React.ReactNode;
  columnCount: number;
  interactive?: boolean;
  visualStyle: TableViewVisualStyle;
  visualAppearance: TableViewRowVisualAppearance;
};

type RowProps<T> = {
  index: number;
  focused: boolean;
  data: TableContextData<T>;
};

function Row<T>({ index, focused, data }: RowProps<T>) {
  const {
    data: rowObjects,
    sidePadding,
    rowHeight,
    rowExpanded,
    rowBorderHidden,
    lastRowBorderVisible,
    columns,
    columnCount,
    interactive,
    visualStyle,
    visualAppearance,
  } = data;

  const rowObject = rowObjects[index];
  const height = typeof rowHeight === "function" ? rowHeight(rowObject, index) : rowHeight;
  const expanded = typeof rowExpanded === "function" && rowExpanded(rowObject, index);

  const fixedCells: JSX.Element[] = [];
  const otherCells: JSX.Element[] = [];
  let expansion: JSX.Element | undefined;

  const isLastRow = index === (rowObjects?.length ?? 0) - 1;
  const borderHidden = rowBorderHidden || (isLastRow && !lastRowBorderVisible);

  Children.forEach(columns, (child, columnIndex) => {
    if (child && isValidElement(child)) {
      if (isElementOfType(child, TableViewColumn)) {
        const column = child as React.ReactElement<TableViewColumnProps>;
        const columnProps = parseColumnProps<T>(
          column.props,
          visualStyle,
          sidePadding,
          columnIndex === 0,
          columnIndex === columnCount - 1
        );

        const cell = (
          <TableViewCell
            key={getElementKey(column, columnIndex)}
            {...columnProps}
            rowIndex={index}
            rowObject={rowObject}>
            {column.props.children}
          </TableViewCell>
        );

        if (column.props.fixed && !columnProps.flex) {
          fixedCells.push(cell);
        } else {
          otherCells.push(cell);
        }
      } else if (isElementOfType(child, TableViewExpansion) && expanded) {
        const element = child as React.ReactElement<TableViewExpansionProps>;
        expansion = (
          <div
            css={StyleExpansion(
              visualAppearance,
              visualStyle,
              element.props.paddingLeft ?? element.props.padding ?? visualStyle.cellSidePadding,
              element.props.paddingRight ?? element.props.padding ?? visualStyle.cellSidePadding,
              element.props.minHeight,
              borderHidden
            )}>
            {typeof element.props.children === "function"
              ? element.props.children(rowObject, index)
              : element.props.children}
          </div>
        );
      }
    }
  });

  const row = (
    <div
      role="row"
      css={[
        StyleRow(
          visualAppearance,
          visualStyle,
          height == null ? undefined : typeof height === "number" ? height : height[0],
          focused,
          borderHidden
        ),
        interactive && StyleRowInteractive(visualAppearance),
      ]}>
      {fixedCells.length > 0 && (
        <div
          css={[
            StyleCellsFixed(visualAppearance, visualStyle, focused),
            interactive && StyleRowInteractive(visualAppearance),
          ]}>
          {fixedCells}
        </div>
      )}
      {otherCells.length > 0 && <div css={StyleCellsOther}>{otherCells}</div>}
    </div>
  );

  return expansion ? (
    <div css={StyleExpansionContainer}>
      {row}
      {expansion}
    </div>
  ) : (
    row
  );
}

export type TableViewHandle = {
  invalidate: (index?: number) => void;
};

/**
 * `TableView` component — supports virtualization, sorting indicators,
 * keyboard navigation and row interactivity.
 */
export const TableView: React.ForwardRefExoticComponent<
  TableViewProps<unknown> & React.RefAttributes<TableViewHandle>
> & {
  Column?: React.FunctionComponent<TableViewColumnProps>;
  Expansion?: React.FunctionComponent<TableViewExpansionProps>;
} = forwardRef(function <T>(props: TableViewProps<T>, ref: React.ForwardedRef<TableViewHandle>) {
  const {
    children,
    colorMode,
    appearance,
    data,
    rowHeight,
    estimatedRowHeight = 40,
    virtualizationDisabled,
    rowExpanded,
    headerHeight,
    onRowFocus,
    onRowClick,
    sortKey,
    sortDir,
    onSortChanged,
    scrollOffsetX,
    scrollOffsetY,
    scrollIndex,
    scrollAlignment,
    onScroll,
    onHorizontalScroll,
    keyboardNavigation,
    empty,
    sidePadding,
    rowBorderHidden,
    lastRowBorderVisible,
    ...other
  } = props;

  const [visualAppearance, theme] = useVisualAppearance<TableViewVisualAppearance>("tableView", colorMode, appearance);
  const visualStyle = theme.components.tableView.style;

  const [offsetX, setOffsetX] = useState(0);
  const virtualListRef = useRef<VirtualListHandle>(null);

  const itemCount = data ? data.length : 0;
  const fixedRowHeight = typeof rowHeight === "number";

  // expose reset externally (imperatively)
  useImperativeHandle(ref, () => ({
    invalidate: (index?: number) => {
      if (virtualListRef.current != null) {
        virtualListRef.current.invalidate(index);
      }
    },
  }));

  // count columns and compute columns width
  const [columnCount, totalWidth, fixedWidth, hasExpansion] = useMemo(() => {
    let columnCount = 0;
    let totalWidth = 0;
    let fixedWidth = 0;
    let hasExpansion = false;

    Children.forEach(children, (child) => {
      if (child && isValidElement(child)) {
        if (isElementOfType(child, TableViewColumn)) {
          const column = child as React.ReactElement<TableViewColumnProps>;
          columnCount++;

          const w = parseFlexWidth(column.props.width);
          totalWidth += w.flex ? getColumnMinWidth(column.props.minWidth) : w.width;

          if (column.props.fixed) {
            if (w.flex) {
              warning(false, "`fixed` ignored on columns with flexible `width`");
            } else {
              fixedWidth += w.width;
            }
          }
        } else if (isElementOfType(child, TableViewExpansion)) {
          hasExpansion = true;
        }
      }
    });

    // account for border between fixed and scroll-able content
    if (fixedWidth > 0) {
      fixedWidth += visualStyle.fixedBorderWidth;
      totalWidth += visualStyle.fixedBorderWidth;
    }

    hasExpansion &&= rowExpanded != null;
    if (hasExpansion && !virtualizationDisabled) {
      warning(
        !fixedRowHeight,
        "`rowHeight` must provide both regular and expanded heights when row expansions are used"
      );
    }

    return [columnCount, totalWidth, fixedWidth, hasExpansion];
  }, [children, rowExpanded, fixedRowHeight, virtualizationDisabled, visualStyle.fixedBorderWidth]);

  const interactive = typeof onRowClick === "function" || keyboardNavigation;
  const contextData = useMemo<TableContextData<T>>(
    () => ({
      data: data ?? [],
      sidePadding,
      rowHeight,
      rowExpanded,
      rowBorderHidden,
      lastRowBorderVisible,
      columns: children,
      columnCount,
      interactive,
      visualStyle,
      visualAppearance: visualAppearance.row,
    }),
    [
      children,
      data,
      sidePadding,
      rowHeight,
      rowExpanded,
      interactive,
      rowBorderHidden,
      lastRowBorderVisible,
      visualStyle,
      visualAppearance.row,
      columnCount,
    ]
  );

  const [fixedHeaders, otherHeaders] = useMemo(() => {
    const fixedHeaders: JSX.Element[] = [];
    const otherHeaders: JSX.Element[] = [];

    if (headerHeight > 0) {
      Children.forEach(children, (child, columnIndex) => {
        if (child && isValidElement(child) && isElementOfType(child, TableViewColumn)) {
          const column = child as React.ReactElement<TableViewColumnProps>;
          const columnProps = parseColumnProps<T>(
            column.props,
            visualStyle,
            sidePadding,
            columnIndex === 0,
            columnIndex === columnCount - 1
          );

          const header = (
            <TableViewColumnHeader
              key={getElementKey(column, columnIndex)}
              {...columnProps}
              theme={theme}
              appearance={visualAppearance}
              sortKey={column.props.sortKey}
              sortDir={sortKey === column.props.sortKey ? sortDir : undefined}
              onSortChanged={onSortChanged}>
              {column.props.header}
            </TableViewColumnHeader>
          );

          if (column.props.fixed && !columnProps.flex) {
            fixedHeaders.push(header);
          } else {
            otherHeaders.push(header);
          }
        }
      });
    }
    return [fixedHeaders, otherHeaders];
  }, [
    children,
    sidePadding,
    headerHeight,
    sortKey,
    sortDir,
    onSortChanged,
    theme,
    visualStyle,
    visualAppearance,
    columnCount,
  ]);

  // keep track of the scroll position
  const firstVisibleRow = useRef<number>(0);
  const onScrollCore = useCallback(
    (offset: number, indexFirst?: number, indexLast?: number) => {
      if (typeof onScroll === "function") {
        onScroll(offset, indexFirst, indexLast);
      }

      if (indexFirst != null) {
        firstVisibleRow.current = indexFirst;
      }
    },
    [onScroll]
  );

  const onHorizontalScrollCore = useCallback(
    (offset: number) => {
      if (typeof onHorizontalScroll === "function") {
        onHorizontalScroll(offset);
      }
      setOffsetX(offset);
    },
    [onHorizontalScroll]
  );

  const onRowClickCore = useCallback(
    (index: number) => {
      if (typeof onRowClick === "function" && data != null) {
        onRowClick(data[index], index);
      }
    },
    [data, onRowClick]
  );

  const onRowFocusCore = useCallback(
    (index: number) => {
      if (typeof onRowFocus === "function" && data != null) {
        onRowFocus(data[index], index);
      }
    },
    [data, onRowFocus]
  );

  const itemHeightGetter = useCallback(
    (index: number) => {
      if (rowHeight == null) {
        return 0;
      }

      const expanded = hasExpansion && rowExpanded != null && data != null && rowExpanded(data[index], index);
      if (typeof rowHeight === "function") {
        if (data == null) {
          return 0;
        } else {
          const v = rowHeight(data[index], index);
          return typeof v === "number" ? v : v[expanded ? 1 : 0];
        }
      } else {
        return typeof rowHeight === "number" ? rowHeight : rowHeight[expanded ? 1 : 0];
      }
    },
    [data, rowHeight, hasExpansion, rowExpanded]
  );

  const itemHeight =
    rowHeight == null || virtualizationDisabled
      ? undefined
      : typeof rowHeight === "function" || hasExpansion
      ? itemHeightGetter
      : typeof rowHeight === "number"
      ? rowHeight
      : rowHeight[0];

  const [hasScrollBar, setHasScrollBar] = useState(false);
  const onScrollBarChanged = useCallback((v: boolean) => setHasScrollBar(v), [setHasScrollBar]);

  // [!] use style to set marginLeft on the header Pane, since the value
  // changes dynamically and should not be captured by the CSS rule
  // [!] use zIndex on the outer pane to create local stacking context
  return (
    <Pane
      {...other}
      colorMode={colorMode}
      accessibilityRole="grid"
      background={visualAppearance.row.back}
      overflow="hidden"
      zIndex={0}>
      {(otherHeaders.length > 0 || (otherHeaders.length === 0 && fixedHeaders.length > 0)) && (
        <Pane
          colorMode={colorMode}
          accessibilityRole="row"
          orientation="horizontal"
          verticalAlignment="stretch"
          overflow="hidden"
          height={headerHeight}
          grow={0}
          shrink={0}
          paddingLeft={otherHeaders.length > 0 ? fixedWidth : 0}
          paddingRight={hasScrollBar ? theme.components.scroller.style.thumbSize : 0}
          background={visualAppearance.header.back}
          borderBottom={visualAppearance.header.border}
          style={{
            marginLeft: -offsetX,
          }}>
          {otherHeaders.length === 0 ? fixedHeaders : otherHeaders}
        </Pane>
      )}
      {otherHeaders.length > 0 && fixedHeaders.length > 0 && (
        <div css={StyleFixed}>
          <Pane
            colorMode={colorMode}
            accessibilityRole="row"
            orientation="horizontal"
            verticalAlignment="stretch"
            overflow="hidden"
            height={headerHeight}
            grow={0}
            shrink={0}
            paddingRight={otherHeaders.length === 0 && hasScrollBar ? theme.components.scroller.style.thumbSize : 0}
            background={visualAppearance.header.back}
            borderBottom={visualAppearance.header.border}
            borderRight={visualAppearance.header.border}
            borderRightWidth={visualStyle.fixedBorderWidth}>
            {fixedHeaders}
          </Pane>
        </div>
      )}
      {itemCount > 0 && (
        <VirtualList
          ref={virtualListRef}
          colorMode={colorMode}
          shadow
          keyboardNavigation={keyboardNavigation}
          itemCount={itemCount}
          itemData={contextData}
          itemHeight={itemHeight}
          estimatedItemHeight={estimatedRowHeight}
          scrollIndex={scrollIndex}
          scrollOffsetX={scrollOffsetX}
          scrollOffsetY={scrollOffsetY}
          scrollAlignment={scrollAlignment}
          onScroll={onScrollCore}
          onScrollBarVisibilityChanged={onScrollBarChanged}
          onHorizontalScroll={onHorizontalScrollCore}
          minContentWidth={totalWidth}
          onItemClick={onRowClickCore}
          onItemFocus={onRowFocusCore}>
          {Row}
        </VirtualList>
      )}
      {itemCount === 0 && <div css={StyleEmpty}>{empty}</div>}
    </Pane>
  );
});

TableView.displayName = "TableView";
TableView.propTypes = TableViewPropTypes;

/**
 * `TableView` column.
 */
TableView.Column = TableViewColumn;

/**
 * `TableView` row expansion.
 */
TableView.Expansion = TableViewExpansion;

export default TableView;
