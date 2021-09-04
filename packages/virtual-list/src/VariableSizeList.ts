import { CallbackFunction, ListManager, ScrollAlignment } from "./List.types";
import { getAlignedOffset } from "./ListStrategy";

type ItemMetadata = [offset: number, size: number];

export function findNearestItemBinarySearch(
  getItemOffset: (index: number) => number,
  high: number,
  low: number,
  offset: number
): number {
  while (low <= high) {
    const middle = low + Math.floor((high - low) / 2);
    const currentOffset = getItemOffset(middle);

    if (currentOffset === offset) {
      return middle;
    } else if (currentOffset < offset) {
      low = middle + 1;
    } else if (currentOffset > offset) {
      high = middle - 1;
    }
  }

  if (low > 0) {
    return low - 1;
  } else {
    return 0;
  }
}

export function findNearestItemExponentialSearch(
  getItemOffset: (index: number) => number,
  index: number,
  offset: number,
  itemCount: number
): number {
  let interval = 1;
  while (index < itemCount && getItemOffset(index) < offset) {
    index += interval;
    interval *= 2;
  }

  return findNearestItemBinarySearch(getItemOffset, Math.min(index, itemCount - 1), Math.floor(index / 2), offset);
}

/**
 * Non-visual logic supporting `VirtualList` with dynamic (variable) item heights.
 *
 * The logic here is largely adopted from:
 * https://github.com/bvaughn/react-window
 */
export class VariableSizeList implements ListManager {
  private readonly __itemSize: (index: number) => number;
  private readonly __estimatedItemSize: number;
  private readonly __itemCount: number;
  private readonly __items: ItemMetadata[];
  private readonly __subscriptions: Set<CallbackFunction>;
  private __lastMeasuredIndex = -1;

  constructor(itemSize: (index: number) => number, itemCount: number, estimatedItemSize: number) {
    this.__itemSize = itemSize;
    this.__itemCount = itemCount;
    this.__estimatedItemSize = estimatedItemSize;
    this.__items = new Array(itemCount);
    this.__subscriptions = new Set();
  }

  /**
   * @private
   * Finds the index of the item nearest to the specified offset.
   *
   * @param offset offset to determine the nearest item for
   */
  private __findNearestItem(offset: number) {
    const lastMeasuredItemOffset = this.__lastMeasuredIndex > 0 ? this.__items[this.__lastMeasuredIndex][0] : 0;

    if (lastMeasuredItemOffset >= offset) {
      // we've already measured items within this range, use a binary search as it's faster
      return findNearestItemBinarySearch(this.getItemOffset, this.__lastMeasuredIndex, 0, offset);
    } else {
      // otherwise, fallback to an exponential search with an inner binary search;
      // the exponential search avoids pre-computing sizes for the full set of items
      // as a binary search would, the overall complexity for this approach is O(log n)
      return findNearestItemExponentialSearch(
        this.getItemOffset,
        Math.max(0, this.__lastMeasuredIndex),
        offset,
        this.__itemCount
      );
    }
  }

  /**
   * @private
   * Returns the [offset, size] metadata for the item with the specified index.
   *
   * @param index index of the item
   */
  private __getItemMetadata(index: number): ItemMetadata {
    if (index > this.__lastMeasuredIndex) {
      let offset = 0;
      if (this.__lastMeasuredIndex >= 0) {
        const [itemOffset, itemSize] = this.__items[this.__lastMeasuredIndex];
        offset = itemOffset + itemSize;
      }

      for (let i = this.__lastMeasuredIndex + 1; i <= index; ++i) {
        const size = this.__itemSize(i);
        this.__items[i] = [offset, size];
        offset += size;
      }

      this.__lastMeasuredIndex = index;
    }

    return this.__items[index];
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
    return this.__getItemMetadata(index)[0];
  };

  /**
   * @public
   * Gets the size of the specified item.
   * @param index index of the item
   */
  public getItemSize = (index: number): number => {
    return this.__getItemMetadata(index)[1];
  };

  /**
   * @public
   * Gets the total estimated size of all items as measured so far.
   */
  public getEstimatedTotalSize(): number {
    let totalSizeOfMeasuredItems = 0;

    if (this.__lastMeasuredIndex >= 0) {
      const [itemOffset, itemSize] = this.__items[this.__lastMeasuredIndex];
      totalSizeOfMeasuredItems = itemOffset + itemSize;
    }

    const numUnmeasuredItems = this.__itemCount - this.__lastMeasuredIndex - 1;
    const totalSizeOfUnmeasuredItems = numUnmeasuredItems * this.__estimatedItemSize;

    return totalSizeOfMeasuredItems + totalSizeOfUnmeasuredItems;
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
  public getOffsetForIndexAndAlignment(
    index: number,
    offset: number,
    pageSize: number,
    align: ScrollAlignment
  ): number {
    const [itemOffset, itemSize] = this.__getItemMetadata(index);

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
    const [startItemOffset, startItemSize] = this.__getItemMetadata(startIndex);

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
    this.__subscriptions.add(callback);
    return callback;
  }

  /**
   * @public
   * Unsubscribes from notifications.
   */
  public unsubscribe(callback: CallbackFunction): void {
    this.__subscriptions.delete(callback);
  }

  /**
   * @public
   * Resets all measured items at and above the specified index.
   * @param index index to reset at
   */
  public reset(index?: number): void {
    this.__lastMeasuredIndex = index != null ? index - 1 : -1;
    this.__subscriptions.forEach((callback) => callback.call(this));
  }
}
