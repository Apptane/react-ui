import { CallbackFunction, ListManager, ScrollAlignment } from "./List.types";
import { getAlignedOffset } from "./ListStrategy";

/**
 * Non-visual logic supporting `VirtualList` with fixed item height.
 *
 * The logic here is largely adopted from:
 * https://github.com/bvaughn/react-window
 */
export class FixedSizeList implements ListManager {
  private readonly __itemSize: number;
  private readonly __itemCount: number;

  constructor(itemSize: number, itemCount: number) {
    this.__itemSize = itemSize;
    this.__itemCount = itemCount;
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
    return index * this.__itemSize;
  };

  /**
   * @public
   * Gets the size of the specified item.
   * @param index index of the item
   */
  public getItemSize = (): number => {
    return this.__itemSize;
  };

  /**
   * @public
   * Gets the total estimated size of all items as measured so far.
   */
  public getEstimatedTotalSize(): number {
    return this.__itemCount * this.__itemSize;
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
    const itemSize = this.getItemSize();
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
    const startIndex = Math.max(0, Math.min(this.__itemCount - 1, Math.floor(offset / this.__itemSize)));

    const itemOffset = this.getItemOffset(startIndex);
    const numVisibleItems = Math.ceil((pageSize + offset - itemOffset) / this.__itemSize);

    const stopIndex = Math.max(
      0,
      Math.min(
        this.__itemCount - 1,
        startIndex + numVisibleItems - 1 // -1 is because stop index is inclusive
      )
    );

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
