import { useLayoutEffect, useRef } from "react";

/**
 * Global variable referencing the root DOM node hosting all portal elements.
 */
let portalRoot: HTMLElement | null;

/**
 * Gets the portal root element creating one if does not exist yet.
 */
function getPortalRoot(): HTMLElement {
  if (!portalRoot) {
    // check if the root already exists in DOM and create
    // new one if not
    portalRoot = document.getElementById("eb-portal-root");
    if (!portalRoot) {
      portalRoot = document.createElement("div");
      portalRoot.setAttribute("id", "eb-portal-root");
      portalRoot.setAttribute("eb-portal-root", "");
      document.body.appendChild(portalRoot);
    }
  }

  return portalRoot;
}

/**
 * Hook that creates portal root element.
 */
export function usePortalRoot() {
  const portalRoot = getPortalRoot();
  const container = useRef<HTMLElement>();

  useLayoutEffect(() => {
    container.current = document.createElement("div");
    portalRoot.appendChild(container.current);
    return () => {
      if (container.current) {
        portalRoot.removeChild(container.current);
      }
    };
  }, [portalRoot]);

  return container;
}
