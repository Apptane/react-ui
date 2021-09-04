import { useMemo } from "react";
import { timeDay, timeHour, timeMinute, timeMonth, timeWeek, timeYear } from "d3-time";
import { timeFormat } from "d3-time-format";
import { ChartAxis } from "./ChartAxis";
import { ChartTimeAxisProps } from "./ChartTimeAxis.types";

const FormatSecond = timeFormat(":%S");
const FormatMinute = timeFormat("%H:%M");
const FormatHour = timeFormat("%I %p");
const FormatDay = timeFormat("%a %d");
const FormatWeek = timeFormat("%b %d");
const FormatMonth = timeFormat("%b");
const FormatYear = timeFormat("%Y");

/**
 * Formats tick labels for time-based axis.
 */
function formatTime(v: Date) {
  return (
    timeMinute(v) < v
      ? FormatSecond
      : timeHour(v) < v
      ? FormatMinute
      : timeDay(v) < v
      ? FormatHour
      : timeMonth(v) < v
      ? timeWeek(v) < v
        ? FormatDay
        : FormatWeek
      : timeYear(v) < v
      ? FormatMonth
      : FormatYear
  )(v);
}

export function ChartTimeAxis({ scale, format, tickValues, ...other }: ChartTimeAxisProps) {
  const ticks = useMemo(
    () => (tickValues != null && Array.isArray(tickValues) ? tickValues : scale.ticks(tickValues)),
    [scale, tickValues]
  );

  return (
    <ChartAxis {...other} extent={scale.range()[1]} ticks={ticks} tickPosition={scale} format={format ?? formatTime} />
  );
}
