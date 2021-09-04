import React from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */

declare module "react" {
  function memo<T extends React.ComponentType<any>>(
    Component: T,
    propsAreEqual?: (
      prevProps: Readonly<React.ComponentProps<T>>,
      nextProps: Readonly<React.ComponentProps<T>>
    ) => boolean
  ): T;
}
