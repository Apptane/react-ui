import uniq from "lodash/uniq";
import { composeRefs, getComponentSize } from "@apptane/react-ui-core";
import { useTimeout } from "@apptane/react-ui-hooks";
import { Tag } from "@apptane/react-ui-tag";
import { useTheme } from "@apptane/react-ui-theme";
import { css, keyframes } from "@emotion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { InputTagProps, InputTagPropsTypes } from "./InputTag.types";
import InputTextBase from "./InputTextBase";

const StyleContainer = css`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 3px -4px;
  > * {
    margin: 4px;
  }
`;

const StyleTag = (height: number) => css`
  flex: 1 1 0;
  display: flex;
  align-items: center;
  min-width: 20%;
  min-height: ${height}px;

  input {
    border: none;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
`;

const animationIn = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  60% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
`;

const animationOut = keyframes`
  0% {
    max-width: 500px; // this should be reasonably large, but not too large
  }
  100% {
    max-width: 0;
    opacity: 0;
  }
`;

const StyleTagAnimateIn = (duration: number) => css`
  animation-name: ${animationIn};
  animation-duration: ${duration}ms;
  animation-timing-function: ease-in;
`;

const StyleTagAnimateOut = (duration: number) => css`
  animation-name: ${animationOut};
  animation-duration: ${duration}ms;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  overflow: hidden;
`;

const SeparatorKeys = ["Enter", "Tab", ","];

type InputTagEntry = [tag: string, out: boolean | undefined];

/**
 * Constructs set of tag entries with animation traits.
 */
function buildTags(
  current: InputTagEntry[],
  initial: boolean,
  value?: string[],
  sort?: (a: string, b: string) => number
): InputTagEntry[] {
  if (value == null || value.length === 0) {
    // optimized path: all current values are removed
    return current.map((entry) => [entry[0], true] as InputTagEntry);
  } else {
    value = uniq(value); // deduplicate

    // since uniq always creates new array
    // we don't have to copy it before sorting
    if (sort != null) {
      value.sort(sort);
    }

    if (current.length == 0) {
      // optimized path: all values are added
      // do not animate on initialization to reduce distraction
      return value.map((tag) => [tag, initial ? undefined : false] as InputTagEntry);
    } else {
      const entries: InputTagEntry[] = [];
      const prev: string[] = [];
      current.forEach((entry) => {
        // if the entry was already on its way out, i.e. animating,
        // then get rid of it here to avoid repeating the animation;
        // everything else should be treated as "stayed"
        if (entry[1] !== true) {
          prev.push(entry[0]);
        }
      });

      if (sort != null) {
        // if entries are sorted, there is no need to retain
        // indices of the deleted entries, since their position
        // is defined by the sort order
        //
        // the strategy is simple - sort both arrays and do
        // a synchronous scan using sort function for comparison
        prev.sort(sort);

        let j = 0; // index for elements in prev
        for (let i = 0; i < value.length; ) {
          const tag = value[i];

          if (j < prev.length) {
            while (sort(prev[j], tag) < 0) {
              entries.push([prev[j], true]); // entry removed
              ++j;
            }

            if (tag === prev[j]) {
              entries.push([tag, undefined]); // entry stayed
              ++j;
              ++i;
              continue;
            }
          }

          entries.push([tag, false]); // entry added
          ++i;
        }

        for (; j < prev.length; ++j) {
          entries.push([prev[j], true]); // entry removed
        }
      } else {
        // if entries are not sorted, the situation is a bit more
        // complex, since we want the deleted entries to maintain
        // their respective visual position in the list
        //
        // the strategy is to process value array first and
        // identify removed entries then re-insert with their
        // original indices
        const map = new Map<string, number>();
        prev.forEach((tag, index) => map.set(tag, index));

        for (let i = 0; i < value.length; ++i) {
          const tag = value[i];

          if (map.has(tag)) {
            entries.push([tag, undefined]); // entry stayed
            map.delete(tag);
          } else {
            entries.push([tag, false]); // entry added
          }
        }

        map.forEach((index, tag) => {
          entries.splice(index, 0, [tag, true]); // entry removed
        });
      }

      return entries;
    }
  }
}

/**
 * Returns a list of values from the current set
 * with appended value.
 */
function appendValue(entries: InputTagEntry[], value: string) {
  return [...entries.map((entry) => entry[0]), value];
}

/**
 * Returns a list of values from the current set
 * with removed value at the specified index.
 */
function removeValue(entries: InputTagEntry[], index?: number) {
  const newEntries = [...entries.map((entry) => entry[0])];
  newEntries.splice(index ?? entries.length - 1, 1);
  return newEntries;
}

/**
 * Tests whether any entry has animation traits.
 */
function hasAnimated(entries: InputTagEntry[]) {
  return entries.some((entry) => entry[1] != null);
}

/**
 * Removes animation traits and drops deleted tags.
 */
function cleanup(entries: InputTagEntry[]) {
  const newEntries: InputTagEntry[] = [];
  entries.forEach((entry) => {
    if (entry[1] !== true) {
      newEntries.push([entry[0], undefined]);
    }
  });
  return newEntries;
}

/**
 * `InputTag` component — combines input with tags.
 */
function InputTag({
  value,
  onChange,
  tagSize = "large",
  tagAppearance = "primary",
  tagHue,
  separators,
  sort,
  deleteOnBackspace,
  type = "text",
  ...other
}: InputTagProps) {
  const theme = useTheme();
  const duration = theme.animation.duration;

  // align input size with the tag size to maintain layout
  const actualTagSize = getComponentSize(theme.components.tag.sizes, tagSize);

  const [currentText, setCurrentText] = useState<string>("");
  const [currentEntries, setCurrentEntries] = useState(() => buildTags([], true, value, sort));

  // compute the difference to determine how tags should be animated
  useEffect(() => {
    setCurrentEntries((prevValue) => buildTags(prevValue, false, value, sort));
  }, [value, sort]);

  // if we have tags that are being animated create a delayed
  // task to cleanup at the end of animation
  useTimeout(
    () => setCurrentEntries((prevValue) => cleanup(prevValue)),
    hasAnimated(currentEntries) ? duration : undefined
  );

  const disabled = other.disabled || other.readonly;
  const inputRef = useRef<HTMLInputElement>(null);

  const removeTag = useCallback(
    (index: number) => {
      if (typeof onChange === "function") {
        onChange(removeValue(currentEntries, index));
      }
      inputRef.current?.focus();
    },
    [onChange, currentEntries]
  );

  const onContainerClick = useCallback(() => inputRef.current?.focus(), [inputRef]);
  const onInputChange = useCallback((value) => setCurrentText(value), [setCurrentText]);
  const onInputKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value;

      // Enter, Comma and Tab keys to finish entering and add current value
      if (targetValue && (separators ?? SeparatorKeys).includes(e.key)) {
        if (typeof onChange === "function") {
          // do not append if the value already exists
          if (currentEntries.some((entry) => entry[0] === targetValue)) {
            return;
          }

          onChange(appendValue(currentEntries, targetValue));
        }

        e.preventDefault();
        setCurrentText("");
      }

      // Backspace to remove the last tag when no value is entered yet
      if (deleteOnBackspace && e.key === "Backspace" && !currentText) {
        if (typeof onChange === "function") {
          onChange(removeValue(currentEntries));
        }

        e.preventDefault();
      }
    },
    [currentText, currentEntries, onChange, separators, deleteOnBackspace]
  );

  const onInputBlur = useCallback(
    (e: React.FocusEvent) => {
      const targetValue = (e.target as HTMLInputElement).value;
      if (targetValue) {
        if (typeof onChange === "function") {
          // do not append if the value already exists
          if (currentEntries.some((entry) => entry[0] === targetValue)) {
            return;
          }

          onChange(appendValue(currentEntries, targetValue));
        }

        e.preventDefault();
        setCurrentText("");
      }
    },
    [currentEntries, onChange]
  );

  // there are three classes of entries:
  // - "removed", exist in currentValue, but not in value;
  // - "added", exist in value, but not in currentValue;
  // - "unchanged", exist in both
  const tags: JSX.Element[] = currentEntries.map((entry, index) => (
    <div
      key={`t${index}`}
      css={[entry[1] === false && StyleTagAnimateIn(duration), entry[1] === true && StyleTagAnimateOut(duration)]}>
      <Tag
        colorMode={other.colorMode}
        size={tagSize}
        appearance={tagAppearance}
        inactive={disabled}
        hue={tagHue}
        onRemove={disabled && entry[1] == null ? undefined : () => removeTag(index)}>
        {entry[0]}
      </Tag>
    </div>
  ));

  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {};
  if (!disabled) {
    inputProps.type = type;
    inputProps.value = currentText;
  }

  return (
    <InputTextBase
      {...other}
      size="auto"
      onInputChange={onInputChange}
      onInputKeyDown={onInputKeyDown}
      onInputBlur={onInputBlur}
      inputProps={inputProps}
      empty={!value || value.length === 0}
      renderInput={(childProps) => (
        <div css={StyleContainer} onClick={onContainerClick}>
          {tags}
          {!disabled && (
            <div css={StyleTag(actualTagSize)}>
              <input
                {...childProps}
                ref={composeRefs<HTMLInputElement>(inputRef, childProps.ref as React.Ref<HTMLInputElement>)}
              />
            </div>
          )}
        </div>
      )}
    />
  );
}

InputTag.displayName = "InputTag";
InputTag.propTypes = InputTagPropsTypes;

export default InputTag;
