import { useEffect, useRef, useState } from "react";
import raf from "raf";

export type CapturedLocation = {
  documentX: number;
  documentY: number;
  elementX: number;
  elementY: number;
  elementLeft: number;
  elementTop: number;
  elementHeight: number;
  elementWidth: number;
};

/**
 * Hook that captures mouse position on mouse down and continuously
 * tracks position until releasing on mouse up.
 *
 * @param ref anchor element reference
 * @param callback callback to invoke with updated mouse position
 */
export function useMouseCapture<T extends HTMLElement>(
  ref: React.RefObject<T | undefined>,
  callback?: (location: CapturedLocation) => void
) {
  const [hover, setHover] = useState(false);
  const [location, setLocation] = useState({
    documentX: 0,
    documentY: 0,
    elementX: 0,
    elementY: 0,
    elementLeft: 0,
    elementTop: 0,
    elementHeight: 0,
    elementWidth: 0,
  });

  const captured = useRef(false);
  useEffect(() => {
    const node = ref.current;
    if (node) {
      const updateLocation = (pageX: number, pageY: number) => {
        const { left, top, width: elementWidth, height: elementHeight } = node.getBoundingClientRect();
        const elementLeft = left + (window.scrollX || window.pageXOffset || document.body.scrollLeft);
        const elementTop = top + (window.scrollY || window.pageYOffset || document.body.scrollTop);
        const elementX = pageX - elementLeft;
        const elementY = pageY - elementTop;
        const currentLocation: CapturedLocation = {
          documentX: pageX,
          documentY: pageY,
          elementX,
          elementY,
          elementLeft,
          elementTop,
          elementHeight,
          elementWidth,
        };

        setLocation(currentLocation);
        if (typeof callback === "function") {
          callback(currentLocation);
        }
      };

      const updateMouseLocation = (event: MouseEvent) => {
        if (captured.current) {
          updateLocation(event.pageX, event.pageY);
        }
      };

      const updateTouchLocation = (event: TouchEvent) => {
        if (captured.current && event.changedTouches.length === 1) {
          const touch = event.changedTouches[0]; // ignore multiple simultaneous touches
          updateLocation(touch.pageX, touch.pageY);
        }
      };

      let animationFrame: ReturnType<typeof raf>;

      const onMouseOver = () => setHover(true);
      const onMouseLeave = () => setHover(false);
      const onMouseUp = () => {
        captured.current = false;
      };

      const onMouseDown = (event: MouseEvent) => {
        captured.current = true;
        raf.cancel(animationFrame);
        animationFrame = raf(() => updateMouseLocation(event));
      };

      const onMouseMove = (event: MouseEvent) => {
        raf.cancel(animationFrame);
        animationFrame = raf(() => updateMouseLocation(event));
      };

      const onTouchStart = (event: TouchEvent) => {
        event.preventDefault(); // should suppress mouse event
        captured.current = true;
        setHover(true);
        raf.cancel(animationFrame);
        animationFrame = raf(() => updateTouchLocation(event));
      };

      const onTouchEnd = (event: TouchEvent) => {
        event.preventDefault(); // should suppress mouse event
        if (event.targetTouches.length === 0) {
          captured.current = false;
          setHover(false);
        }
      };

      const onTouchMove = (event: TouchEvent) => {
        event.preventDefault(); // should suppress mouse event
        raf.cancel(animationFrame);
        animationFrame = raf(() => updateTouchLocation(event));
      };

      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("mousemove", onMouseMove);

      node.addEventListener("mouseover", onMouseOver);

      // Using "mouseleave" instead of "mouseout" because we want an indication
      //  of when the container is being hovered on.  "mouseout" will get triggered
      //  when the mouse hovers over a child element.
      node.addEventListener("mouseleave", onMouseLeave);
      node.addEventListener("mousedown", onMouseDown);

      node.addEventListener("touchstart", onTouchStart);
      node.addEventListener("touchend", onTouchEnd);
      node.addEventListener("touchcancel", onTouchEnd);
      node.addEventListener("touchmove", onTouchMove);

      return () => {
        raf.cancel(animationFrame);

        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("mousemove", onMouseMove);

        node.removeEventListener("mouseover", onMouseOver);
        node.removeEventListener("mouseleave", onMouseLeave);
        node.removeEventListener("mousedown", onMouseDown);

        node.removeEventListener("touchstart", onTouchStart);
        node.removeEventListener("touchend", onTouchEnd);
        node.removeEventListener("touchmove", onTouchMove);
      };
    }
  }, [ref, callback, captured]);

  return [hover, location];
}
