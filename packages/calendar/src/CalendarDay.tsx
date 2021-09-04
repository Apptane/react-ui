import { Color, StyleButtonReset } from "@apptane/react-ui-core";
import { Text } from "@apptane/react-ui-typography";
import { css } from "@emotion/react";
import { useCallback } from "react";
import {
  CalendarDayCornerBL,
  CalendarDayCornerBR,
  CalendarDayCornerTL,
  CalendarDayCornerTR,
  CalendarDayProps,
} from "./Calendar.types";

const StyleAdorner = css`
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const StyleBase = (size: number, radius: number, back?: Color) => css`
  ${StyleButtonReset};
  position: relative;
  user-select: none;
  border-radius: ${radius}px;
  background: ${back};
  width: ${size}px;
  height: ${size}px;
  display: grid;
  place-items: center;
  z-index: 0;
`;

const StyleToday = (radius: number, border: Color) => css`
  &::after {
    ${StyleAdorner};
    border: dashed 1px ${border};
    border-radius: ${radius}px;
  }
`;

const StyleInteractive = (radius: number, border: Color) => css`
  cursor: pointer;
  &:hover,
  &:focus {
    &::after {
      ${StyleAdorner};
      border: solid 1px ${border};
      border-radius: ${radius}px;
    }
  }
`;

const StyleHighlight = (radius: number, back: Color, corners: number) => css`
  &::before {
    z-index: -1;
    ${StyleAdorner};
    background: ${back};
    border-top-left-radius: ${corners & CalendarDayCornerTL ? radius : 0}px;
    border-top-right-radius: ${corners & CalendarDayCornerTR ? radius : 0}px;
    border-bottom-left-radius: ${corners & CalendarDayCornerBL ? radius : 0}px;
    border-bottom-right-radius: ${corners & CalendarDayCornerBR ? radius : 0}px;
  }
`;

export function CalendarDay({
  theme,
  colorMode,
  date,
  day,
  today,
  selected,
  highlight,
  muted,
  onClick,
  corners,
}: CalendarDayProps) {
  const visualAppearance = theme.components.calendar.appearance(theme.palette[colorMode], colorMode, undefined, "none");
  const visualStyle = theme.components.calendar.style;
  const handleClick = useCallback(() => {
    if (onClick != null) {
      onClick(date);
    }
  }, [onClick, date]);

  const interactive = onClick != null;
  const backColor = selected ? visualAppearance.back.selected : undefined;
  const textColor = selected
    ? visualAppearance.text.selected
    : highlight
    ? visualAppearance.text.highlight
    : muted
    ? visualAppearance.text.muted
    : visualAppearance.text.normal;

  return (
    <button
      role="gridcell"
      onClick={interactive ? handleClick : undefined}
      disabled={!interactive}
      css={[
        StyleBase(visualStyle.size, visualStyle.borderRadius, backColor),
        interactive && StyleInteractive(visualStyle.borderRadius, visualAppearance.border.focused),
        today && StyleToday(visualStyle.borderRadius, visualAppearance.border.today),
        highlight &&
          StyleHighlight(visualStyle.borderRadius, backColor ?? visualAppearance.back.highlight, corners ?? 0),
      ]}>
      <Text {...visualStyle.font.day} weight={today ? "bold" : visualStyle.font.day.weight} color={textColor}>
        {day}
      </Text>
    </button>
  );
}
