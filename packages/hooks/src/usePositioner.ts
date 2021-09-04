import { Placement } from "@apptane/react-ui-core";
import { useEffect, useState } from "react";
import raf from "raf";

type Dimensions = {
  width: number;
  height: number;
};

type Position = {
  left: number;
  top: number;
};

type Rect = Position & {
  bottom: number;
  right: number;
  width: number;
  height: number;
};

type Geometry = {
  placement: Placement;
  offset: number;
  anchorRect: DOMRect;
  dimensions: Dimensions;
  position: Position;
};

type PositionState = {
  placement?: Placement;
  left?: number;
  top?: number;
  transformOrigin?: string;
};

const PLACEMENT_TOP = 0x01;
const PLACEMENT_BOTTOM = 0x02;
const PLACEMENT_LEFT = 0x04;
const PLACEMENT_RIGHT = 0x08;
const PLACEMENT_START = 0x10;
const PLACEMENT_MIDDLE = 0x20;
const PLACEMENT_END = 0x40;
const PLACEMENT_TOP_BOTTOM = PLACEMENT_TOP | PLACEMENT_BOTTOM;

/**
 * Converts placement string enumeration into numeric flag.
 * @param {Placement} value Placement text value
 */
function placementToFlag(value: Placement): number {
  switch (value) {
    case "top":
      return PLACEMENT_TOP | PLACEMENT_MIDDLE;
    case "top-left":
      return PLACEMENT_TOP | PLACEMENT_START;
    case "top-right":
      return PLACEMENT_TOP | PLACEMENT_END;
    case "top-center":
      return PLACEMENT_TOP | PLACEMENT_MIDDLE;
    case "bottom":
      return PLACEMENT_BOTTOM | PLACEMENT_MIDDLE;
    case "bottom-left":
      return PLACEMENT_BOTTOM | PLACEMENT_START;
    case "bottom-right":
      return PLACEMENT_BOTTOM | PLACEMENT_END;
    case "bottom-center":
      return PLACEMENT_BOTTOM | PLACEMENT_MIDDLE;
    case "left":
      return PLACEMENT_LEFT | PLACEMENT_MIDDLE;
    case "left-top":
      return PLACEMENT_LEFT | PLACEMENT_START;
    case "left-bottom":
      return PLACEMENT_LEFT | PLACEMENT_END;
    case "left-middle":
      return PLACEMENT_LEFT | PLACEMENT_MIDDLE;
    case "right":
      return PLACEMENT_RIGHT | PLACEMENT_MIDDLE;
    case "right-top":
      return PLACEMENT_RIGHT | PLACEMENT_START;
    case "right-bottom":
      return PLACEMENT_RIGHT | PLACEMENT_END;
    case "right-middle":
      return PLACEMENT_RIGHT | PLACEMENT_MIDDLE;
    default:
      return 0;
  }
}

/**
 * Converts placement numeric flag into string enumeration.
 * @param {number} value Placement flag value
 */
function placementToEnum(value: number): Placement | undefined {
  if (value === (PLACEMENT_TOP | PLACEMENT_START)) return "top-left";
  if (value === (PLACEMENT_TOP | PLACEMENT_END)) return "top-right";
  if (value === (PLACEMENT_TOP | PLACEMENT_MIDDLE)) return "top-center";
  if (value === (PLACEMENT_BOTTOM | PLACEMENT_START)) return "bottom-left";
  if (value === (PLACEMENT_BOTTOM | PLACEMENT_END)) return "bottom-right";
  if (value === (PLACEMENT_BOTTOM | PLACEMENT_MIDDLE)) return "bottom-center";
  if (value === (PLACEMENT_LEFT | PLACEMENT_START)) return "left-top";
  if (value === (PLACEMENT_LEFT | PLACEMENT_END)) return "left-bottom";
  if (value === (PLACEMENT_LEFT | PLACEMENT_MIDDLE)) return "left-middle";
  if (value === (PLACEMENT_RIGHT | PLACEMENT_START)) return "right-top";
  if (value === (PLACEMENT_RIGHT | PLACEMENT_END)) return "right-bottom";
  if (value === (PLACEMENT_RIGHT | PLACEMENT_MIDDLE)) return "right-middle";
}

/**
 * Constructs rectangle definition.
 * @param {number} x X coordinate
 * @param {number} y Y coordinate
 * @param {number} w Width
 * @param {number} h Height
 */
function createRect(x: number, y: number, w: number, h: number): Rect {
  return {
    top: y,
    left: x,
    bottom: y + h,
    right: x + w,
    width: w,
    height: h,
  };
}

/**
 * Returns horizontally or vertically flipped placement.
 * @param {number} placement Placement flag value to flip
 */
function getFlippedSide(placement: number): number {
  if (placement & PLACEMENT_TOP) {
    return (placement & ~PLACEMENT_TOP) | PLACEMENT_BOTTOM;
  }

  if (placement & PLACEMENT_BOTTOM) {
    return (placement & ~PLACEMENT_BOTTOM) | PLACEMENT_TOP;
  }

  if (placement & PLACEMENT_LEFT) {
    return (placement & ~PLACEMENT_LEFT) | PLACEMENT_RIGHT;
  }

  if (placement & PLACEMENT_RIGHT) {
    return (placement & ~PLACEMENT_RIGHT) | PLACEMENT_LEFT;
  }

  return placement;
}

/**
 * Calculates placement rectangle.
 * @param {number} placement Placement flag value
 * @param {number} anchorRect Anchor rectangle (top, left, width, height)
 * @param {number} offset Offset between anchor and positioned element
 * @param {number} width Width of the positioned element
 * @param {number} height Height of the positioned element
 */
function calculatePlacementRect(placement: number, anchorRect: DOMRect, offset: number, width: number, height: number) {
  if (placement & PLACEMENT_TOP_BOTTOM) {
    const y = placement & PLACEMENT_TOP ? anchorRect.top - offset - height : anchorRect.bottom + offset;
    if (placement & PLACEMENT_END) {
      return createRect(anchorRect.left + anchorRect.width - width, y, width, height);
    } else if (placement & PLACEMENT_MIDDLE) {
      return createRect(Math.ceil(anchorRect.left + anchorRect.width / 2 - width / 2), y, width, height);
    } else {
      return createRect(anchorRect.left, y, width, height);
    }
  } else {
    const x = placement & PLACEMENT_LEFT ? anchorRect.left - offset - width : anchorRect.right + offset;
    if (placement & PLACEMENT_END) {
      return createRect(x, anchorRect.top + anchorRect.height - height, width, height);
    } else if (placement & PLACEMENT_MIDDLE) {
      return createRect(x, Math.ceil(anchorRect.top + anchorRect.height / 2 - height / 2), width, height);
    } else {
      return createRect(x, anchorRect.top, width, height);
    }
  }
}

/**
 * Returns 'transform-origin' CSS style for the specified placement.
 * @param {number} placement Placement flag value
 * @param {Rect} rect Positioned bounding box rectangle
 */
function getTransformOrigin(placement: number, rect: Rect) {
  if (placement & PLACEMENT_TOP_BOTTOM) {
    const y = placement & PLACEMENT_TOP ? rect.height : 0;
    if (placement & PLACEMENT_END) {
      return `${rect.width}px ${y}px`;
    } else if (placement & PLACEMENT_MIDDLE) {
      return `${rect.width / 2}px ${y}px`;
    } else {
      return `0 ${y}px`;
    }
  } else {
    const x = placement & PLACEMENT_LEFT ? rect.width : 0;
    if (placement & PLACEMENT_END) {
      return `${x}px ${rect.height}px`;
    } else if (placement & PLACEMENT_MIDDLE) {
      return `${x}px ${rect.height / 2}px`;
    } else {
      return `${x}px 0`;
    }
  }
}

/**
 * Minimum margin to place the element away from the viewport boundary.
 */
const MIN_VIEWPORT_MARGIN = 10;

/**
 * Verifies whether the specified rectangle fits the viewport
 * within margin when considering vertical orientation.
 * @param {Rect} rect Rectangle to check
 * @param {number} viewportHeight Viewport height
 */
function checkFitVertically(rect: Rect, viewportHeight: number) {
  return rect.top >= MIN_VIEWPORT_MARGIN && rect.bottom <= viewportHeight - MIN_VIEWPORT_MARGIN;
}

/**
 * Verifies whether the specified rectangle fits the viewport
 * within margin when considering horizontal orientation.
 * @param {Rect} rect Rectangle to check
 * @param {number} viewportWidth Viewport width
 */
function checkFitHorizontally(rect: Rect, viewportWidth: number) {
  return rect.left >= MIN_VIEWPORT_MARGIN && rect.right <= viewportWidth - MIN_VIEWPORT_MARGIN;
}

/**
 * Returns placement and position result along with the computed
 * "transform-origin" CSS property.
 * @param {number} placement
 * @param {Rect} rect
 */
function getPlacementResult(placement: number, rect: Rect) {
  return {
    placement: placementToEnum(placement),
    position: rect,
    transformOrigin: getTransformOrigin(placement, rect),
  };
}

/**
 * Calculates best placement of the positioned element aligned
 * relative to the anchor node according to placement type.
 */
function calculateBestPlacement(placement: number, anchorRect: DOMRect, dimensions: Dimensions, offset: number) {
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;

  // determine preferred placement rectangle
  let preferred = calculatePlacementRect(placement, anchorRect, offset, dimensions.width, dimensions.height);

  if (placement & PLACEMENT_TOP_BOTTOM) {
    if (!checkFitVertically(preferred, viewportHeight)) {
      placement = getFlippedSide(placement);
      preferred = calculatePlacementRect(placement, anchorRect, offset, dimensions.width, dimensions.height);
    }

    if (preferred.left < MIN_VIEWPORT_MARGIN && (placement & PLACEMENT_START) === 0) {
      placement = (placement & ~PLACEMENT_END & ~PLACEMENT_MIDDLE) | PLACEMENT_START;
      preferred = calculatePlacementRect(placement, anchorRect, offset, dimensions.width, dimensions.height);
    } else if (preferred.right > viewportWidth - MIN_VIEWPORT_MARGIN && (placement & PLACEMENT_END) === 0) {
      placement = (placement & ~PLACEMENT_START & ~PLACEMENT_MIDDLE) | PLACEMENT_END;
      preferred = calculatePlacementRect(placement, anchorRect, offset, dimensions.width, dimensions.height);
    }
  } else {
    if (!checkFitHorizontally(preferred, viewportWidth)) {
      placement = getFlippedSide(placement);
      preferred = calculatePlacementRect(placement, anchorRect, offset, dimensions.width, dimensions.height);
    }

    if (preferred.top < MIN_VIEWPORT_MARGIN && (placement & PLACEMENT_START) === 0) {
      placement = (placement & ~PLACEMENT_END & ~PLACEMENT_MIDDLE) | PLACEMENT_START;
      preferred = calculatePlacementRect(placement, anchorRect, offset, dimensions.width, dimensions.height);
    } else if (preferred.bottom > viewportHeight - MIN_VIEWPORT_MARGIN && (placement & PLACEMENT_END) === 0) {
      placement = (placement & ~PLACEMENT_START & ~PLACEMENT_MIDDLE) | PLACEMENT_END;
      preferred = calculatePlacementRect(placement, anchorRect, offset, dimensions.width, dimensions.height);
    }
  }

  return getPlacementResult(placement, preferred);
}

/**
 * Hook for positioning element relative to the anchor element
 * with continuous position update.
 *
 * @param anchorRef anchor element reference
 * @param nodeRef positioned element reference
 * @param placement default placement
 * @param offset offset from the anchor
 * @param visible positioned element visibility flag
 */
export function usePositioner(
  anchorRef: React.RefObject<HTMLElement | undefined>,
  nodeRef: React.RefObject<HTMLElement | undefined>,
  placement: Placement,
  offset: number,
  visible?: boolean
) {
  const [position, setPosition] = useState<PositionState>({
    placement: undefined,
    left: undefined,
    top: undefined,
    transformOrigin: undefined,
  });

  useEffect(() => {
    let animationFrame: ReturnType<typeof raf>;
    let geometry: Geometry;
    let terminate = false;

    // executed on each animation frame
    function onFrame() {
      // break the loop if any of the following is conditions are met
      if (!anchorRef.current || !nodeRef.current || !visible) {
        return;
      }

      if (terminate) {
        return;
      }

      const anchorRect = anchorRef.current.getBoundingClientRect();
      const dimensions = {
        width: Math.ceil(nodeRef.current.offsetWidth),
        height: Math.ceil(nodeRef.current.offsetHeight),
      };

      // determine whether geometry has changed
      if (geometry) {
        const unchanged =
          geometry.placement === placement &&
          geometry.offset === offset &&
          geometry.anchorRect.top === anchorRect.top &&
          geometry.anchorRect.left === anchorRect.left &&
          geometry.anchorRect.width === anchorRect.width &&
          geometry.anchorRect.height === anchorRect.height &&
          geometry.dimensions.width === dimensions.width &&
          geometry.dimensions.height === dimensions.height;

        if (unchanged) {
          loop();
          return;
        }
      }

      const {
        placement: newPlacement,
        position: newPosition,
        transformOrigin,
      } = calculateBestPlacement(placementToFlag(placement), anchorRect, dimensions, offset);

      // prevent jittering on non-100% DPI screens due to rounding issues
      if (geometry && geometry.position) {
        if (
          Math.abs(geometry.position.left - newPosition.left) < 2 &&
          Math.abs(geometry.position.top - newPosition.top) < 2
        ) {
          loop();
          return;
        }
      }

      setPosition({
        placement: newPlacement,
        left: newPosition.left,
        top: newPosition.top,
        transformOrigin: transformOrigin,
      });

      geometry = {
        placement: placement,
        offset: offset,
        anchorRect: anchorRect,
        dimensions: dimensions,
        position: newPosition,
      };

      loop();
    }

    // call onFrame() on next animation frame
    function loop() {
      animationFrame = raf(onFrame);
    }

    // start the tracking loop
    if (visible) {
      loop();
    }

    return () => {
      // deal with possible race when placement or offset are changed too quickly
      // and raf.cancel fails to break the loop
      terminate = true;
      raf.cancel(animationFrame);
    };
  }, [anchorRef, nodeRef, placement, offset, visible]);

  return position;
}
