/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-env browser */

import { ColorModeProvider } from "@apptane/react-ui-theme";
import { StoryContext, StoryFn as StoryFunction, useGlobals } from "@storybook/addons";

export const withGlobals = (StoryFn: StoryFunction, context: StoryContext) => {
  const [{ darkMode }] = useGlobals();
  const isInDocs = context.viewMode === "docs";
  return <ColorModeProvider mode={darkMode ? "dark" : "light"}>{StoryFn() as any}</ColorModeProvider>;
};
