import { useGlobals } from "@storybook/api";
import { IconButton } from "@storybook/components";
import { useCallback } from "react";
import { TOOL_ID } from "./constants";

export const Tool = () => {
  const [{ darkMode }, updateGlobals] = useGlobals();
  const toggleDarkMode = useCallback(
    () =>
      updateGlobals({
        darkMode: !darkMode,
      }),
    [darkMode, updateGlobals]
  );

  return (
    <IconButton key={TOOL_ID} active={darkMode} title="Enable dark mode" onClick={toggleDarkMode}>
      <svg viewBox="0 0 24 24">
        <path
          d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16.001A8 8 0 0012 20zm-5-4.68a8.965 8.965 0 005.707-2.613A8.965 8.965 0 0015.32 7 6 6 0 117 15.32z"
          fill="currentColor"
        />
      </svg>
    </IconButton>
  );
};
