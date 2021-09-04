import { createContext, useEffect, useState } from "react";

export type ViewportOrientation = "portrait" | "landscape";
export type ViewportDevice = "tablet" | "mobile" | "desktop";

export interface ViewportMediaTraits {
  /**
   * Gets the current media device based on its viewport characteristics.
   */
  readonly device: ViewportDevice;

  /**
   * Determines whether media device is tablet or mobile.
   */
  readonly isTabletOrMobile: boolean;

  /**
   * Determines whether media device is mobile.
   */
  readonly isMobile: boolean;

  /**
   * Gets the current orientation.
   */
  readonly orientation: ViewportOrientation;

  /**
   * Gets the current viewport width.
   */
  readonly viewportWidth: number;

  /**
   * Gets the current viewport height.
   */
  readonly viewportHeight: number;
}

function createMediaTraits(mobile: number | undefined, tablet: number | undefined): ViewportMediaTraits {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  let device: ViewportDevice = "desktop";
  if (mobile != null && width <= mobile) {
    device = "mobile";
  } else if (tablet != null && width <= tablet) {
    device = "tablet";
  }

  return {
    device: device,
    isTabletOrMobile: device === "mobile" || device === "tablet",
    isMobile: device === "mobile",
    orientation: width < height ? "portrait" : "landscape",
    viewportWidth: width,
    viewportHeight: height,
  };
}

/**
 * Viewport media context.
 */
export const ViewportMediaContext = createContext<ViewportMediaTraits | null>(null);

export interface ViewportMediaProviderProps {
  children?: React.ReactNode;

  /**
   * Breakpoint for mobile mode.
   */
  mobile?: number;

  /**
   * Breakpoint for tablet mode.
   */
  tablet?: number;
}

/**
 * Viewport media provider.
 */
export function ViewportMediaProvider({ children, mobile, tablet }: ViewportMediaProviderProps) {
  const [media, setMedia] = useState(createMediaTraits(mobile, tablet));
  useEffect(() => {
    function onResize() {
      const nextMedia = createMediaTraits(mobile, tablet);
      setMedia((prevMedia) =>
        prevMedia.viewportWidth !== nextMedia.viewportWidth || prevMedia.viewportHeight !== nextMedia.viewportHeight
          ? nextMedia
          : prevMedia
      );
    }

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [mobile, tablet]);

  return <ViewportMediaContext.Provider value={media}>{children}</ViewportMediaContext.Provider>;
}
