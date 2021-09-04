import { CallbackFunction, ListManager, ScrollAlignment } from "./List.types";
import { getAlignedOffset } from "./ListStrategy";
import { findNearestItemBinarySearch } from "./VariableSizeList";

/**
 * Non-visual logic supporting non-virtualized `VirtualList`
 * with content-sized items.
 */
export class ContentSizeList implements ListManager {
  private readonly __containerRef: React.RefObject<HTMLElement>;
  private readonly __itemCount: number;

  constructor(containerRef: React.RefObject<HTMLElement>, itemCount: number) {
    this.__containerRef = containerRef;
    this.__itemCount = itemCount;
  }

  /**
   * @private
   * Finds the index of the item nearest to the specified offset.
   *
   * @param offset offset to determine the nearest item for
   */
  private __findNearestItem(offset: number) {
    return findNearestItemBinarySearch(this.getItemOffset, this.__itemCount - 1, 0, offset);
  }

  /**
   * @public
   * Gets the number of items.
   */
  public get itemCount() {
    return this.__itemCount;
  }

  /**
   * @public
   * Gets the offset of the specified item.
   * @param index index of the item
   */
  public getItemOffset = (index: number): number => {
    if (this.__containerRef.current != null && index >= 0 && index < this.__containerRef.current.children.length) {
      const node = this.__containerRef.current.children[index];
      return (node as HTMLElement).offsetTop;
    }

    return 0;
  };

  /**
   * @public
   * Gets the size of the specified item.
   * @param index index of the item
   */
  public getItemSize = (index: number): number => {
    if (this.__containerRef.current != null && index >= 0 && index < this.__containerRef.current.children.length) {
      const node = this.__containerRef.current.children[index];
      return (node as HTMLElement).offsetHeight;
    }

    return 0;
  };

  /**
   * @public
   * Gets the total estimated size of all items as measured so far.
   */
  public getEstimatedTotalSize(): number {
    if (this.__containerRef.current != null) {
      return this.__containerRef.current.clientHeight;
    }

    return 0;
  }

  /**
   * @public
   * Gets the effective offset to the item with the specified index
   * according to the alignment.
   *
   * @param index index of the item to compute the offset for
   * @param offset current scrolling offset
   * @param pageSize window (page) size
   * @param align alignment option
   */
  public getOffsetForIndexAndAlignment(index: number, offset: number, pageSize: number, align: ScrollAlignment) {
    const itemSize = this.getItemSize(index);
    const itemOffset = this.getItemOffset(index);

    return getAlignedOffset(offset, itemOffset, itemSize, this.getEstimatedTotalSize(), pageSize, align);
  }

  /**
   * @public
   * Gets the items index range for the specified offset.
   *
   * @param offset offset to determine the range for
   * @param pageSize window (page) size
   */
  public getRange(offset: number, pageSize: number): [number, number] {
    const startIndex = this.__findNearestItem(offset);
    const startItemOffset = this.getItemOffset(startIndex);
    const startItemSize = this.getItemSize(startIndex);

    let stopIndex = startIndex;
    let itemOffset = startItemOffset + startItemSize;

    const maxOffset = offset + pageSize;
    while (stopIndex < this.__itemCount - 1 && itemOffset < maxOffset) {
      stopIndex++;
      itemOffset += this.getItemSize(stopIndex);
    }

    return [startIndex, stopIndex];
  }

  /**
   * @public
   * Subscribes to notifications when list measurements are reset.
   */
  public subscribe(callback: CallbackFunction): CallbackFunction {
    return callback;
  }

  /**
   * @public
   * Unsubscribes from notifications.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public unsubscribe(callback: CallbackFunction): void {}

  /**
   * @public
   * Resets all measured items at and above the specified index.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public reset(index?: number): void {}
}
