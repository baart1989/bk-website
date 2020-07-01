import {
  addHours,
  addMinutes,
  eachDayOfInterval,
  eachHourOfInterval,
  eachWeekOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format as formatFn,
  isPast,
  isToday,
  isTomorrow,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subHours,
} from 'date-fns';

import { CalendarConfig } from '../provider';
import { pl } from 'date-fns/locale';

const commonOptions = { locale: pl };
const weekOptions = { weekStartsOn: 1 } as const;

export const getDayNumber = (date: Date) => formatFn(date, 'd');
export const getHourSlot = (date: Date) => formatFn(date, 'HH:mm');
export const isCurrentWeek = (date: Date) => isPast(startOfWeek(date, weekOptions));

export const getWorkingHours = (date: Date, config: CalendarConfig) => {
  const hoursSlots = eachHourOfInterval({
    start: addHours(startOfDay(date), config.excludeHoursAfterMidnight),
    end: subHours(endOfDay(date), config.excludeHoursBeforeMidnight),
  });
  if (config.slotLengthInMinutes !== 60) {
    return hoursSlots.reduce(
      (acc, next) => [...acc, next, addMinutes(next, config.slotLengthInMinutes)],
      [] as Date[],
    );
  }
  return hoursSlots;
};

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
    start: startOfWeek(date, weekOptions),
    end: endOfWeek(date, weekOptions),
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

export const getPrettyDate = (date: Date) =>
  `${formatFn(date, 'do MMMM yyyy - HH:mm', commonOptions)}`;
