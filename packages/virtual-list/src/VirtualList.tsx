import { StyleOutlineReset, warning } from "@apptane/react-ui-core";
import { useComponentClientSize } from "@apptane/react-ui-hooks";
import { Scroller } from "@apptane/react-ui-scroller";
import { css } from "@emotion/react";
import {
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useReducer,
  useRef,
} from "react";
import { ContentSizeList } from "./ContentSizeList";
import { FixedSizeList } from "./FixedSizeList";
import { ListItemData, ListManager, ScrollAlignment } from "./List.types";
import { VariableSizeList } from "./VariableSizeList";
import { VirtualListHandle, VirtualListProps, VirtualListPropTypes } from "./VirtualList.types";

const StyleItemRegular = css`
  width: 100%;
`;

const StyleItemVirtual = css`
  width: 100%;
  position: absolute;
  left: 0;
`;

const StyleContainerBase = css`
  ${StyleOutlineReset};
  position: relative;
  touch-action: manipulation;
`;

const StyleContainerRegular = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  ${StyleContainerBase};
`;

const StyleContainerVirtual = css`
  will-change: transform;
  ${StyleContainerBase};
`;

function getEstimatedItemHeight(value?: number) {
  warning(
    value != null,
    "`estimatedItemHeight` should be specified when using variable size items; generic fallback value of 40px is used."
  );
  return value ?? 40;
}

/**
 * Constructs new list manager.
 */
const createList = (
  containerRef: React.RefObject<HTMLElement>,
  itemHeight: VirtualListProps["itemHeight"],
  itemCount: VirtualListProps["itemCount"],
  estimatedItemHeight: VirtualListProps["estimatedItemHeight"]
) =>
  itemHeight == null
    ? new ContentSizeList(containerRef, itemCount)
    : typeof itemHeight === "function"
    ? new VariableSizeList(itemHeight, itemCount, getEstimatedItemHeight(estimatedItemHeight))
    : new FixedSizeList(itemHeight, itemCount);

type VirtualListState = {
  list: ListManager;
  actualOffset: number;
  targetOffset: number | undefined;
  focusedIndex: number;
};

type VirtualListAction =
  | { type: "list"; value: ListManager }
  | { type: "sync"; value: number }
  | { type: "offset"; value: number }
  | { type: "focus"; value: number; pageSize: number; scrollAlignment?: ScrollAlignment };

const init = (
  props: Pick<
    VirtualListProps,
    "itemHeight" | "itemCount" | "estimatedItemHeight" | "scrollIndex" | "scrollAlignment"
  > & { pageSize: number; containerRef: React.RefObject<HTMLElement> }
): VirtualListState => {
  const list = createList(props.containerRef, props.itemHeight, props.itemCount, props.estimatedItemHeight);
  return {
    list: list,
    actualOffset: 0,
    targetOffset:
      props.scrollIndex != null && props.scrollIndex >= 0
        ? list.getOffsetForIndexAndAlignment(props.scrollIndex, 0, props.pageSize, props.scrollAlignment ?? "smart")
        : undefined,
    focusedIndex: props.scrollIndex != null && props.scrollIndex >= 0 ? props.scrollIndex : -1,
  };
};

const reducer = (state: VirtualListState, action: VirtualListAction): VirtualListState => {
  switch (action.type) {
    case "list":
      return {
        ...state,
        list: action.value,
      };
    case "sync":
      return {
        ...state,
        actualOffset: action.value,
      };
    case "offset":
      return {
        ...state,
        targetOffset: action.value,
      };
    case "focus":
      return {
        ...state,
        focusedIndex: action.value,
        targetOffset: state.list.getOffsetForIndexAndAlignment(
          action.value,
          state.actualOffset,
          action.pageSize,
          action.scrollAlignment ?? "smart"
        ),
      };
  }
};

type VirtualListItemProps<T extends ListItemData> = {
  children: React.ReactNode;
  list: ListManager;
  index: number;
  data?: T;
  interactive?: boolean;
  onClick?: (index: number) => void;
  onFocus?: (index: number) => void;
  dispatch: (value: VirtualListAction) => void;
  containerSize: number;
  focused: boolean;
  virtual: boolean;
};

function VirtualListItem<T extends ListItemData>({
  children,
  list,
  index,
  interactive,
  onClick,
  onFocus,
  dispatch,
  containerSize,
  virtual,
  ...other
}: VirtualListItemProps<T>) {
  const onClickCallback = useCallback(() => {
    if (typeof onClick === "function") {
      onClick(index);
    }

    if (typeof onFocus === "function") {
      onFocus(index);
    }

    dispatch({
      type: "focus",
      value: index,
      pageSize: containerSize,
    });
  }, [onClick, onFocus, dispatch, index, containerSize]);

  const itemProps = { index, ...other };

  // although it is possible to cache/memoize styles here,
  // I didn't find much reason to do so, reflowing <div>
  // itself should not be a big deal and children can use
  // their own optimization if they are expensive to render
  const style = virtual
    ? {
        top: list.getItemOffset(index),
        height: list.getItemSize(index),
      }
    : undefined;

  return (
    <div
      css={virtual ? StyleItemVirtual : StyleItemRegular}
      onClick={interactive ? onClickCallback : undefined}
      style={style}>
      {typeof children === "function"
        ? children(itemProps)
        : isValidElement(children)
        ? cloneElement(children, itemProps)
        : null}
    </div>
  );
}

/**
 * `VirtualList` component — lightweight virtualized list with support for
 * fixed and variable size items, keyboard navigation and imperative positioning.
 */
export const VirtualList = forwardRef(
  <T extends ListItemData = void>(props: VirtualListProps<T>, ref: React.ForwardedRef<VirtualListHandle>) => {
    const {
      children,
      minContentWidth,
      scrollOffsetY,
      itemCount,
      itemHeight,
      itemData,
      estimatedItemHeight,
      overscan = 3,
      scrollIndex,
      scrollAlignment = "smart",
      onScroll,
      onHorizontalScroll,
      keyboardNavigation,
      onItemFocus,
      onItemClick,
      ...other
    } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const scrollerRef = useRef<HTMLDivElement>(null);
    const scrollerSize = useComponentClientSize(scrollerRef);
    const pageSize = scrollerSize.height;

    const [state, dispatch] = useReducer(
      reducer,
      { itemHeight, itemCount, estimatedItemHeight, scrollIndex, scrollAlignment, pageSize, containerRef },
      init
    );

    useEffect(() => {
      dispatch({
        type: "list",
        value: createList(containerRef, itemHeight, itemCount, estimatedItemHeight),
      });
    }, [itemCount, itemHeight, estimatedItemHeight]);

    useEffect(() => {
      if (scrollOffsetY != null && scrollOffsetY > 0) {
        dispatch({
          type: "offset",
          value: scrollOffsetY,
        });
      }
    }, [scrollOffsetY]);

    useEffect(() => {
      if (scrollIndex != null && scrollIndex >= 0) {
        dispatch({
          type: "focus",
          value: scrollIndex,
          pageSize: pageSize,
          scrollAlignment: scrollAlignment,
        });
      }
    }, [scrollIndex, pageSize, scrollAlignment]);

    // expose reset externally (imperatively)
    useImperativeHandle(ref, () => ({
      invalidate: (index?: number) => {
        state.list.reset(index);
      },
    }));

    const onScrollY = useCallback(
      (offset: number) => {
        if (typeof onScroll === "function") {
          const [firstIndex, lastIndex] = state.list.getRange(offset, pageSize);
          onScroll(offset, firstIndex, lastIndex);
        }

        dispatch({
          type: "sync",
          value: offset,
        });
      },
      [onScroll, pageSize, state.list]
    );

    const onScrollX = useCallback(
      (offset: number) => {
        if (typeof onHorizontalScroll === "function") {
          onHorizontalScroll(offset);
        }
      },
      [onHorizontalScroll]
    );

    // virtualization mode when itemHeight is specified
    const virtual = itemHeight != null;
    const totalHeight = state.list.getEstimatedTotalSize();

    // average item height
    const averageItemHeight = totalHeight / itemCount;
    const itemsPerPage = Math.max(1, Math.floor(pageSize / averageItemHeight));

    let start = 0;
    let end = itemCount - 1;

    if (virtual) {
      [start, end] = state.list.getRange(state.actualOffset, pageSize);

      // account for overscan
      start = Math.max(0, start - overscan);
      end = Math.max(0, Math.min(itemCount - 1, end + overscan));
    }

    const interactive = typeof onItemClick === "function" || keyboardNavigation;
    const items: JSX.Element[] = [];
    for (let index = start; index <= end; ++index) {
      items.push(
        <VirtualListItem<T>
          key={`i${index - start}`}
          list={state.list}
          index={index}
          data={itemData != null && typeof itemData === "function" ? itemData(index) : itemData}
          interactive={interactive}
          onClick={onItemClick}
          onFocus={onItemFocus}
          dispatch={dispatch}
          containerSize={pageSize}
          focused={!!keyboardNavigation && index === state.focusedIndex}
          virtual={virtual}>
          {children}
        </VirtualListItem>
      );
    }

    // handles keyboard navigation
    const onKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (keyboardNavigation) {
          let nextIndex: number | undefined;

          switch (event.key) {
            case "Home":
              nextIndex = 0;
              break;
            case "End":
              nextIndex = itemCount - 1;
              break;
            case "PageUp":
              nextIndex = Math.max(0, state.focusedIndex - itemsPerPage);
              break;
            case "PageDown":
              nextIndex = Math.min(itemCount - 1, state.focusedIndex + itemsPerPage);
              break;
            case "ArrowUp":
              nextIndex = Math.max(0, state.focusedIndex - 1);
              break;
            case "ArrowDown":
              nextIndex = Math.min(itemCount - 1, state.focusedIndex + 1);
              break;
          }

          if (state.focusedIndex != null && typeof onItemClick === "function") {
            switch (event.key) {
              case "Enter":
                onItemClick(state.focusedIndex);
                break;
            }
          }

          if (nextIndex != null && nextIndex !== state.focusedIndex) {
            // prevent default processing to manually adjust
            // scrolling position when focused item is updated
            event.preventDefault();

            if (nextIndex !== state.focusedIndex && typeof onItemFocus === "function") {
              onItemFocus(nextIndex);
            }

            dispatch({
              type: "focus",
              value: nextIndex,
              pageSize: pageSize,
            });
          }
        }
      },
      [keyboardNavigation, itemCount, itemsPerPage, onItemFocus, onItemClick, state.focusedIndex, pageSize]
    );

    return (
      <Scroller
        {...other}
        ref={scrollerRef}
        onScrollX={onScrollX}
        onScrollY={onScrollY}
        scrollOffsetY={state.targetOffset}>
        <div
          ref={containerRef}
          onKeyDown={keyboardNavigation ? onKeyDown : undefined}
          tabIndex={keyboardNavigation ? 0 : undefined}
          css={virtual ? StyleContainerVirtual : StyleContainerRegular}
          style={{
            height: virtual ? totalHeight : "max-content",
            minWidth: minContentWidth,
          }}>
          {items}
        </div>
      </Scroller>
    );
  }
);

VirtualList.displayName = "VirtualList";
VirtualList.propTypes = VirtualListPropTypes;

export default VirtualList;
