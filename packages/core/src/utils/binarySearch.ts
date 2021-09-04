/**
 * Performs binary search in the sorted array.
 *
 * When the exact match is not found returns a negative value
 * representing a bitwise complement of the insertion index.
 */
export function binarySearch<T>(array: ArrayLike<T>, element: T, comparer: (a: T, b: T) => number) {
  let i = 0;
  let j = array.length - 1;
  while (i <= j) {
    const k = (j + i) >> 1;
    const r = comparer(element, array[k]);
    if (r > 0) {
      i = k + 1;
    } else if (r < 0) {
      j = k - 1;
    } else {
      return k;
    }
  }
  return -i - 1;
}
