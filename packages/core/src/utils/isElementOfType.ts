import { createElement, isValidElement } from "react";
import memoize from "memoizee";

// see https://github.com/gaearon/react-hot-loader/issues/304
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveComponentType(componentType: any) {
  return createElement(componentType).type;
}

const componentTypeResolver = memoize(resolveComponentType);

/**
 * Determines whether an argument is a valid React element of
 * the specified type.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isElementOfType<P>(element: {} | null | undefined, componentType: React.FunctionComponent<P>) {
  if (isValidElement(element)) {
    const elementType = componentTypeResolver(componentType);
    return element.type === elementType; // || (element.type && element.type.Component === elementType);
  } else {
    return false;
  }
}
