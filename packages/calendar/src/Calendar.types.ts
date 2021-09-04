import { AppearanceProps, AppearancePropTypes, ColorMode, MarginProps, MarginPropTypes } from "@apptane/react-ui-core";
import { Theme } from "@apptane/react-ui-theme";
import { CalendarVisualAppearance } from "@apptane/react-ui-theme/src/components/CalendarTheme.types";
import PropTypes from "prop-types";

export interface CalendarProps extends MarginProps, AppearanceProps<CalendarVisualAppearance> {
  /**
   * Number of panes to display.
   * At least one pane is always displayed.
   */
  panes?: number;

  /**
   * Selected date.
   */
  selected?: Date;

  /**
   * First date in the highlighted range.
   */
  rangeStart?: Date;

  /**
   * First date in the highlighted range.
   */
  rangeEnd?: Date;

  /**
   * If specified indicates that dates before but not including
   * this date are not interactive.
   */
  notBefore?: Date;

  /**
   * If specified indicates that dates after but not including
   * this date are not interactive.
   */
  notAfter?: Date;

  /**
   * Indicates that week should start on Sunday.
   * Otherwise, week starts on Monday.
   */
  weekStartsOnSunday?: boolean;

  /**
   * Callback invoked when the day is clicked.
   */
  onClick?: (d: Date) => void;
}

export interface CalendarMonthProps extends AppearanceProps<CalendarVisualAppearance> {
  /**
   * Calendar year.
   */
  year: number;

  /**
   * Month index of the year (0..11).
   */
  month: number;

  /**
   * Selected date.
   */
  selected?: Date;

  /**
   * First date in the highlighted range.
   */
  rangeStart?: Date;

  /**
   * First date in the highlighted range.
   */
  rangeEnd?: Date;

  /**
   * If specified indicates that dates before but not including
   * this date are not interactive.
   */
  notBefore?: Date;

  /**
   * If specified indicates that dates after but not including
   * this date are not interactive.
   */
  notAfter?: Date;

  /**
   * Indicates that week should start on Sunday.
   * Otherwise, week starts on Monday.
   */
  weekStartsOnSunday?: boolean;

  /**
   * Callback invoked when the day is clicked.
   */
  onClick?: (d: Date) => void;
}

export const CalendarDayCornerTL = 1;
export const CalendarDayCornerTR = 2;
export const CalendarDayCornerBR = 4;
export const CalendarDayCornerBL = 8;

export type CalendarDayProps = {
  /**
   * Theme.
   */
  theme: Theme;

  /**
   * Color mode.
   */
  colorMode: ColorMode;

  /**
   * Date.
   */
  date: Date;

  /**
   * Day of the month number.
   */
  day: number;

  /**
   * Indicates today's date.
   */
  today?: boolean;

  /**
   * Indicates selected appearance.
   */
  selected?: boolean;

  /**
   * Indicates highlighted appearance.
   */
  highlight?: boolean;

  /**
   * Indicates muted appearance.
   */
  muted?: boolean;

  /**
   * Callback invoked when the day is clicked.
   */
  onClick?: (d: Date) => void;

  /**
   * Highlighted corners.
   */
  corners?: number;
};

export const CalendarPropTypes = {
  ...MarginPropTypes,
  ...AppearancePropTypes,
  selected: PropTypes.instanceOf(Date),
  rangeStart: PropTypes.instanceOf(Date),
  rangeEnd: PropTypes.instanceOf(Date),
  notBefore: PropTypes.instanceOf(Date),
  notAfter: PropTypes.instanceOf(Date),
  weekStartsOnSunday: PropTypes.bool,
  onClick: PropTypes.func,
  panes: PropTypes.number,
};

export const CalendarMonthPropTypes = {
  ...AppearancePropTypes,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  selected: PropTypes.instanceOf(Date),
  rangeStart: PropTypes.instanceOf(Date),
  rangeEnd: PropTypes.instanceOf(Date),
  notBefore: PropTypes.instanceOf(Date),
  notAfter: PropTypes.instanceOf(Date),
  weekStartsOnSunday: PropTypes.bool,
  onClick: PropTypes.func,
};

export const CalendarDayPropTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  day: PropTypes.number.isRequired,
  today: PropTypes.bool,
  selected: PropTypes.bool,
  highlight: PropTypes.bool,
  muted: PropTypes.bool,
  onClick: PropTypes.func,
  corners: PropTypes.number,
};
