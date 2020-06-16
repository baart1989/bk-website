import {
  addHours,
  eachDayOfInterval,
  eachHourOfInterval,
  eachWeekOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format as formatFn,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subHours,
} from 'date-fns';

export const now = new Date();

export const getDayNumber = (date = now) => formatFn(date, 'd');
export const getHourSlot = (date = now) => formatFn(date, 'HH:mm');

export const getHours = (date = now) =>
  eachHourOfInterval({
    start: addHours(startOfDay(date), 8),
    end: subHours(endOfDay(date), 4),
  });

export const getDays = (date = now) =>
  eachDayOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(date),
  });

export const getWeeks = (date = now) =>
  eachWeekOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  });

export const getWeekDays = (date = now) => {
  return eachDayOfInterval({
    start: startOfWeek(date, { weekStartsOn: 1 }),
    end: endOfWeek(date, { weekStartsOn: 1 }),
  });
};

export const getPrettyMonthTitle = (date = now) =>
  `${formatFn(date, 'LLLL')} ${formatFn(date, 'yyyy')}`;

export const getPrettyWeekTitle = (weekDays: Date[]) =>
  `
  ${formatFn(weekDays[0], 'do')} ${formatFn(weekDays[0], 'MMM')} - ${formatFn(
    weekDays[weekDays.length - 1],
    'do',
  )}
  ${formatFn(weekDays[weekDays.length - 1], 'MMM')}

  `;

export const getPrettyDayOfWeek = (date: Date) =>
  `${formatFn(date, 'do MMM')},${formatFn(date, 'EEE')}`;
