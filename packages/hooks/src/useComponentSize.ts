import { useCallback, useLayoutEffect, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";

const ZERO = {
  width: 0,
  height: 0,
};

type ElementSizer<T extends Element> = (element: T) => { width: number; height: number };

function getElementSize(element: Element) {
  if (!element) {
    return ZERO;
  }

  return {
    width: element.scrollWidth,
    height: element.scrollHeight,
  };
}

/**
 * Hook that tracks element size.
 *
 * @param ref element reference
 * @param sizer custom sizer function, default is { width: scrollWidth, height: scrollHeight }
 */
export function useComponentSize<T extends Element>(ref: React.RefObject<T | undefined>, sizer?: ElementSizer<T>) {
  const elementSizer = typeof sizer === "function" ? sizer : getElementSize;

  const [size, setSize] = useState(() => {
    if (ref.current) {
      const { width, height } = elementSizer(ref.current);
      return {
        width: Math.round(width),
        height: Math.round(height),
      };
    } else {
      return ZERO;
    }
  });

  const onSizeChanged = useCallback(() => {
    if (ref.current) {
      const { width, height } = elementSizer(ref.current);

      // NB: trigger only on changes > 1px to prevent jitter due
      // to fractional pixels
      setSize((prevSize) => {
        if (!prevSize || Math.abs(prevSize.width - width) > 1 || Math.abs(prevSize.height - height) > 1) {
          return {
            width: Math.round(width),
            height: Math.round(height),
          };
        } else {
          return prevSize;
        }
      });
    }
  }, [elementSizer, ref]);

  useLayoutEffect(() => {
    if (ref.current) {
      onSizeChanged();
      let ro: ResizeObserver | null = new ResizeObserver(() => onSizeChanged());

      ro.observe(ref.current);
      return () => {
        if (ro != null) {
          ro.disconnect();
        }
        ro = null;
      };
    }
  }, [onSizeChanged, ref]);

  return size;
}

function getElementClientSize(element: Element) {
  if (!element) {
    return ZERO;
  }

  return {
    width: element.clientWidth,
    height: element.clientHeight,
  };
}

function getElementVisualSize(element: HTMLElement) {
  if (!element) {
    return ZERO;
  }

  return {
    width: element.offsetWidth,
    height: element.offsetHeight,
  };
}

/**
 * Hook that tracks element's client size.
 */
export function useComponentClientSize(ref: React.RefObject<Element | undefined>) {
  return useComponentSize(ref, getElementClientSize);
}

/**
 * Hook that tracks element's visual (offset) size.
 */
export function useComponentVisualSize(ref: React.RefObject<HTMLElement | undefined>) {
  return useComponentSize(ref, getElementVisualSize);
}
