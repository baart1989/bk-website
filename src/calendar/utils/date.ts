import {
  addHours,
  eachDayOfInterval,
  eachHourOfInterval,
  eachWeekOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format as formatFn,
  isToday,
  isTomorrow,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subHours,
} from 'date-fns';

import { pl } from 'date-fns/locale';

const commonOptions = { locale: pl };

export const getDayNumber = (date: Date) => formatFn(date, 'd');
export const getHourSlot = (date: Date) => formatFn(date, 'HH:mm');

export const getHours = (date: Date) =>
  eachHourOfInterval({
    start: addHours(startOfDay(date), 8),
    end: subHours(endOfDay(date), 4),
  });

export const getDays = (date: Date) =>
  eachDayOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(date),
  });

export const getWeeks = (date: Date) =>
  eachWeekOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  });

export const getWeekDays = (date: Date) => {
  return eachDayOfInterval({
    start: startOfWeek(date, { weekStartsOn: 1 }),
    end: endOfWeek(date, { weekStartsOn: 1 }),
  });
};

export const getPrettyMonthTitle = (date: Date) =>
  `${formatFn(date, 'LLLL', commonOptions)} ${formatFn(date, 'yyyy')}`;

export const getPrettyDayOfWeek = (date: Date) =>
  isToday(date)
    ? `${formatFn(date, 'do MMM', commonOptions)},dziś`
    : isTomorrow(date)
    ? `${formatFn(date, 'do MMM', commonOptions)},jutro`
    : `${formatFn(date, 'do MMM', commonOptions)},${formatFn(date, 'EEE', commonOptions)}`;
