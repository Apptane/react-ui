/**
 * Attribution: https://github.com/seznam/compose-react-refs
 *
 * Copyright (c) 2019, Seznam.cz, a.s.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

import { MutableRefObject, Ref } from "react";

type OptionalRef<T> = Ref<T> | undefined;

export function composeRefs<T>(...refs: [OptionalRef<T>, OptionalRef<T>, ...Array<OptionalRef<T>>]): Ref<T> {
  if (refs.length === 2) {
    // micro-optimize the hot path
    return composeTwoRefs(refs[0], refs[1]) || null;
  }

  const composedRef = refs
    .slice(1)
    .reduce(
      (semiCombinedRef: OptionalRef<T>, refToInclude: OptionalRef<T>) => composeTwoRefs(semiCombinedRef, refToInclude),
      refs[0]
    );
  return composedRef || null;
}

type NonNullRef<T> = NonNullable<Ref<T>>;
const composedRefCache = new WeakMap<NonNullRef<unknown>, WeakMap<NonNullRef<unknown>, NonNullRef<unknown>>>();

function composeTwoRefs<T>(ref1: OptionalRef<T>, ref2: OptionalRef<T>): OptionalRef<T> {
  if (ref1 && ref2) {
    const ref1Cache = composedRefCache.get(ref1) || new WeakMap<NonNullRef<unknown>, NonNullRef<unknown>>();
    composedRefCache.set(ref1, ref1Cache);

    const composedRef =
      ref1Cache.get(ref2) ||
      ((instance: T): void => {
        updateRef(ref1, instance);
        updateRef(ref2, instance);
      });
    ref1Cache.set(ref2, composedRef);

    return composedRef as NonNullRef<T>;
  }

  if (!ref1) {
    return ref2;
  } else {
    return ref1;
  }
}

function updateRef<T>(ref: NonNullRef<T>, instance: null | T): void {
  if (typeof ref === "function") {
    ref(instance);
  } else {
    (ref as MutableRefObject<T | null>).current = instance;
  }
}
