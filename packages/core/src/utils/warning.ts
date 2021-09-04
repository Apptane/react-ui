/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable */

const __DEV__ = process.env.NODE_ENV !== "production";
const emptyFunction = function () {};

function printWarning(format: string, ...args: any[]) {
  const length = arguments.length;
  args = new Array(length > 1 ? length - 1 : 0);
  for (let key = 1; key < length; key++) {
    args[key - 1] = arguments[key];
  }
  let argIndex = 0;
  const message =
    "Warning: " +
    format.replace(/%s/g, function () {
      return args[argIndex++];
    });

  if (typeof console !== "undefined") {
    console.warn(message);
  }

  try {
    // this error was thrown as a convenience so that you can use this stack
    // to find the callsite that caused this warning to fire
    throw new Error(message);
  } catch (x) {}
}

export const warning = __DEV__
  ? function (condition: boolean, format: string, ...args: any[]) {
      if (!condition) {
        const length = arguments.length;
        args = new Array(length > 2 ? length - 2 : 0);
        for (let key = 2; key < length; key++) {
          args[key - 2] = arguments[key];
        }

        if (format === undefined) {
          throw new Error("`warning(condition, format, ...args)` requires a warning message argument");
        }

        // @ts-ignore
        printWarning.apply(null, [format].concat(args));
      }
    }
  : emptyFunction;
