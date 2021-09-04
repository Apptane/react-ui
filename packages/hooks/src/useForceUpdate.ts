import { useReducer } from "react";

/**
 * Hooks that forces component update.
 */
export function useForceUpdate() {
  return useReducer((state) => !state, false)[1];
}
