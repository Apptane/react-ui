/**
 * Common non-visual list manager strategies.
 */

import { ScrollAlignment } from "./List.types";

export function getAlignedOffset(
  offset: number,
  itemOffset: number,
  itemSize: number,
  totalSize: number,
  pageSize: number,
  align: ScrollAlignment
) {
  const lastItemOffset = Math.max(0, totalSize - pageSize);
  const minOffset = Math.max(0, itemOffset + itemSize - pageSize);
  const maxOffset = Math.min(lastItemOffset, itemOffset);

  if (align === "smart") {
    if (offset >= minOffset - pageSize && offset <= maxOffset + pageSize) {
      align = "auto";
    } else {
      align = "center";
    }
  }

  switch (align) {
    case "start":
      return maxOffset;
    case "end":
      return minOffset;
    case "center": {
      // "centered" offset is usually the average of the min and max;
      // but near the edges of the list, this doesn't hold true
      const middleOffset = Math.round(minOffset + (maxOffset - minOffset) / 2);
      if (middleOffset <= Math.ceil(pageSize / 2)) {
        return 0; // near the beginning
      } else if (middleOffset > lastItemOffset + Math.floor(pageSize / 2)) {
        return lastItemOffset; // near the end
      } else {
        return middleOffset;
      }
    }
    case "auto":
    default:
      if (offset >= minOffset && offset <= maxOffset) {
        return offset;
      } else if (offset < minOffset) {
        return minOffset;
      } else {
        return maxOffset;
      }
  }
}
