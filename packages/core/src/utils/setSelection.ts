/**
 * Sets the selection bounds of a textarea or input and focuses the input.
 */
export function setSelection(
  input: HTMLInputElement | HTMLTextAreaElement | undefined | null,
  offsets: {
    start: number;
    end: number;
  }
) {
  const start = offsets.start;
  let end = offsets.end;
  if (end === undefined) {
    end = start;
  }

  if (input && "selectionStart" in input) {
    input.selectionStart = start;
    input.selectionEnd = Math.min(end, input.value.length);
  }
}
