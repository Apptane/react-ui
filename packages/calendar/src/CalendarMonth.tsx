import { Pane } from "@apptane/react-ui-pane";
import { useVisualAppearance } from "@apptane/react-ui-theme";
import { Text } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { differenceInCalendarDays, getDay, isAfter, isBefore, isSameDay, isToday, lastDayOfMonth } from "date-fns";
import {
  CalendarDayCornerBL,
  CalendarDayCornerBR,
  CalendarDayCornerTL,
  CalendarDayCornerTR,
  CalendarMonthProps,
  CalendarMonthPropTypes,
} from "./Calendar.types";
import { CalendarDay } from "./CalendarDay";

const StyleContainer = (width: number) => css`
  width: ${width}px;
`;

const StyleHeader = (size: number) => css`
  width: ${size}px;
  height: ${size}px;
  display: grid;
  place-items: center;
`;

const DOWs = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; // TODO: i18n

/**
 * `CalendarMonth` component — renders individual month pane in the calendar.
 */
export function CalendarMonth({
  colorMode,
  appearance,
  year,
  month,
  selected,
  rangeStart,
  rangeEnd,
  notBefore,
  notAfter,
  weekStartsOnSunday,
  onClick,
}: CalendarMonthProps) {
  const [visualAppearance, theme, actualColorMode] = useVisualAppearance("calendar", colorMode, appearance);
  const visualStyle = theme.components.calendar.style;

  const childProps = { theme, colorMode: actualColorMode };

  const thisMonth = new Date(year, month, 1);
  const prevYear = month === 0 ? year - 1 : year;
  const prevMonth = month === 0 ? 11 : month - 1;
  const nextYear = month === 11 ? year + 1 : year;
  const nextMonth = month === 11 ? 0 : month + 1;

  const prevLastDate = lastDayOfMonth(new Date(prevYear, prevMonth, 1));
  const thisLastDate = lastDayOfMonth(thisMonth);
  const thisLastDay = thisLastDate.getDate();
  const prevLastDay = prevLastDate.getDate();

  // 0 = Su, 1 = Mo, ... 6 = Sa
  let thisFirstDow: number = getDay(thisMonth);
  if (!weekStartsOnSunday) {
    thisFirstDow = (thisFirstDow + 6) % 7;
  }

  // diffRangeStartToFirstDay = rangeStart - thisMonth
  // diffRangeEndToFirstDay = rangeEnd - thisMonth
  const diffRangeStartToFirstDay = rangeStart != null ? differenceInCalendarDays(rangeStart, thisMonth) : undefined;
  const diffRangeEndToFirstDay = rangeEnd != null ? differenceInCalendarDays(rangeEnd, thisMonth) : undefined;

  function highlight(d: number, i: number): number {
    // no range defined
    if (diffRangeStartToFirstDay == null || diffRangeEndToFirstDay == null) {
      return -1;
    }

    // negative = days before range boundary
    // zero = at range boundary exactly
    // positive = days after range boundary
    const deltaRangeStart = d - 1 - diffRangeStartToFirstDay;
    const deltaRangeEnd = d - 1 - diffRangeEndToFirstDay;

    // outside of the range
    if (deltaRangeStart < 0 || deltaRangeEnd > 0) {
      return -1;
    }

    const firstWeek = deltaRangeStart < 7;
    const lastWeek = deltaRangeEnd > -7;

    let corners = 0;

    // start of the month
    // start of the range
    // start of the week within the first week of the range
    if (d === 1 || deltaRangeStart === 0 || (i === 0 && firstWeek)) {
      corners |= CalendarDayCornerTL;
    }

    // end of the month
    // end of the range
    // end of the week within the last week of the range
    if (d === thisLastDay || deltaRangeEnd === 0 || (i === 6 && lastWeek)) {
      corners |= CalendarDayCornerBR;
    }

    // start of the range within the last week of the range
    // start the week within the last week of the range
    if ((deltaRangeStart === 0 && lastWeek) || (i === 0 && lastWeek)) {
      corners |= CalendarDayCornerBL;
    }

    // end of the range within the first week of the range
    // end the week within the first week of the range
    if ((deltaRangeEnd === 0 && firstWeek) || (i === 6 && firstWeek)) {
      corners |= CalendarDayCornerTR;
    }

    return corners;
  }

  function interactive(d: Date) {
    if (notBefore != null && isBefore(d, notBefore)) {
      return false;
    }

    if (notAfter != null && isAfter(d, notAfter)) {
      return false;
    }

    return true;
  }

  let thisDay = 1;
  let nextDay = 1;
  const weeks: React.ReactNode[] = [];
  for (let w = 0; w < 5; ++w) {
    const days: React.ReactNode[] = [];
    for (let i = 0; i < 7; ++i) {
      if (w === 0 && i < thisFirstDow) {
        const d = prevLastDay - thisFirstDow + i + 1;
        const date = new Date(prevYear, prevMonth, d);
        days.push(
          <CalendarDay
            key={`${prevMonth}-${d}`}
            {...childProps}
            date={date}
            day={d}
            today={isToday(date)}
            selected={selected && isSameDay(selected, date)}
            muted
            onClick={onClick != null && interactive(date) ? onClick : undefined}
          />
        );
      } else if (thisDay <= thisLastDay) {
        const date = new Date(year, month, thisDay);
        const h = highlight(thisDay, i);
        days.push(
          <CalendarDay
            key={`${month}-${thisDay}`}
            {...childProps}
            date={date}
            day={thisDay}
            today={isToday(date)}
            selected={selected && isSameDay(selected, date)}
            highlight={h >= 0}
            corners={h}
            onClick={onClick != null && interactive(date) ? onClick : undefined}
          />
        );

        ++thisDay;
      } else {
        const date = new Date(nextYear, nextMonth, nextDay);
        days.push(
          <CalendarDay
            key={`${nextMonth}-${nextDay}`}
            {...childProps}
            date={date}
            day={nextDay}
            today={isToday(date)}
            selected={selected && isSameDay(selected, date)}
            muted
            onClick={onClick != null && interactive(date) ? onClick : undefined}
          />
        );

        ++nextDay;
      }
    }

    weeks.push(
      <Pane key={`_${w}`} orientation="horizontal">
        {days}
      </Pane>
    );
  }

  const header: React.ReactNode[] = [];
  for (let i = 0; i < 7; ++i) {
    header.push(
      <div key={`_${i}`} css={StyleHeader(visualStyle.size)} role="columnheader">
        <Text {...visualStyle.font.header} color={visualAppearance.text.dow}>
          {DOWs[weekStartsOnSunday ? (i + 6) % 7 : i]}
        </Text>
      </div>
    );
  }

  return (
    <div css={StyleContainer(visualStyle.size * 7)} role="grid">
      <Pane grow={1} orientation="horizontal">
        {header}
      </Pane>
      {weeks}
    </div>
  );
}

CalendarMonth.displayName = "CalendarMonth";
CalendarMonth.propTypes = CalendarMonthPropTypes;

export default CalendarMonth;
