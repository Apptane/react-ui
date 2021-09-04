import { useCallback, useEffect, useState } from "react";
import copyToClipboard from "copy-to-clipboard";

/**
 * Hook to copy text to clipboard.
 *
 * @param {string} value value to copy
 * @param {number} delay delay in milliseconds to reset the copied state (defaults to 2s)
 * @param {string} format MIME type
 */
export function useClipboard(value: string, delay = 2000, format?: string) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    setCopied(copyToClipboard(value, { format: format }));
  }, [value, format]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (copied) {
      timeoutId = setTimeout(() => setCopied(false), delay);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [delay, copied]);

  return { value, copy, copied };
}
