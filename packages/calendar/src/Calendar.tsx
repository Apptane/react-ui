import { IconButton } from "@apptane/react-ui-button";
import { Pane } from "@apptane/react-ui-pane";
import { useVisualAppearance } from "@apptane/react-ui-theme";
import { Text } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { addMonths, format, isAfter, isBefore, startOfMonth } from "date-fns";
import { CalendarProps, CalendarPropTypes } from "./Calendar.types";
import { CalendarMonth } from "./CalendarMonth";

const StyleEmpty = (size: number) => css`
  height: ${size}px;
  width: ${size}px;
`;

/**
 * `Calendar` component — supports one or more month panes, date ranges, selection.
 */
export function Calendar({
  colorMode,
  appearance,
  panes,
  selected,
  rangeStart,
  rangeEnd,
  notBefore,
  notAfter,
  weekStartsOnSunday,
  onClick,
  ...other
}: CalendarProps) {
  const [visualAppearance, theme] = useVisualAppearance("calendar", colorMode, appearance);
  const visualStyle = theme.components.calendar.style;
  const headerSize = theme.components.button.sizes.small;

  const [current, setCurrent] = useState<Date>(() => startOfMonth(selected ?? new Date()));
  useEffect(() => {
    if (selected != null) {
      setCurrent(startOfMonth(selected));
    }
  }, [selected]);

  const count = Math.max(1, panes ?? 1);
  const offset = Math.floor((count - 1) / 2);

  const monthProps = {
    colorMode,
    rangeStart,
    rangeEnd,
    notBefore,
    notAfter,
    weekStartsOnSunday,
    onClick,
    selected,
  };

  const blocks: React.ReactNode[] = [];
  for (let i = 0; i < count; ++i) {
    const d = i - offset === 0 ? current : addMonths(current, i - offset);
    const year = d.getFullYear();
    const month = d.getMonth();

    blocks.push(
      <Pane key={`${year}-${month}`} orientation="vertical" marginLeft={i > 0 ? visualStyle.spacing : undefined}>
        <Pane orientation="horizontal" horizontalAlignment="space-between" verticalAlignment="middle">
          {i === 0 ? (
            <IconButton
              iconName="i:arrow-right"
              colorMode={colorMode}
              appearance="minimal"
              size="small"
              disabled={notBefore != null && isBefore(addMonths(current, -offset), notBefore)}
              onClick={() => setCurrent(addMonths(current, -1))}
            />
          ) : (
            <div css={StyleEmpty(headerSize)} />
          )}
          <Text {...visualStyle.font.header} color={visualAppearance.text.header}>
            {format(d, "MMMM, yyyy")}
          </Text>
          {i === count - 1 ? (
            <IconButton
              iconName="i:arrow-left"
              colorMode={colorMode}
              appearance="minimal"
              size="small"
              disabled={notAfter != null && isAfter(addMonths(current, count - offset), notAfter)}
              onClick={() => setCurrent(addMonths(current, 1))}
            />
          ) : (
            <div css={StyleEmpty(headerSize)} />
          )}
        </Pane>
        <CalendarMonth {...monthProps} year={year} month={month} />
      </Pane>
    );
  }

  return (
    <Pane {...other} orientation="horizontal">
      {blocks}
    </Pane>
  );
}

Calendar.displayName = "Calendar";
Calendar.propTypes = CalendarPropTypes;

export default Calendar;
