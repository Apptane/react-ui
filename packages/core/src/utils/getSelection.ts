/**
 * Gets the selection from the input.
 */
export function getSelection(input: HTMLInputElement | HTMLTextAreaElement | undefined | null) {
  // modern browser with input or textarea.
  if (input && "selectionStart" in input) {
    return {
      start: input.selectionStart || 0,
      end: input.selectionEnd || 0,
    };
  }

  return { start: 0, end: 0 };
}
