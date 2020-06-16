export type Action<T, K> = { type: T; payload: K };
export type CalendarEvent = any;

export const ADD = 'AT_CALENDAR_ADD_TO';
export const REMOVE = 'AT_CALENDAR_REMOVE_FROM';
export const CLEAR = 'AT_CALENDAR_CLEAR';

export const TOGGLE_VIEW = 'AT_CALENDAR_TOGGLE_VIEW';
export const NEXT_MONTH = 'AT_CALENDAR_NEXT_MONTH';
export const PREVIOUS_MONTH = 'AT_CALENDAR_PREVIOUS_MONTH';
export const NEXT_WEEK = 'AT_CALENDAR_NEXT_WEEK';
export const PREVIOUS_WEEK = 'AT_CALENDAR_PREVIOUS_WEEK';
export const SELECT_DAY = 'AT_CALENDAR_SELECT_DAY';

export type Add = Action<typeof ADD, CalendarEvent>;
export type Remove = Action<typeof REMOVE, Pick<CalendarEvent, 'id'>>;
export type Clear = Action<typeof CLEAR, undefined>;
export type NextMonth = Action<typeof NEXT_MONTH, undefined>;
export type PreviousMonth = Action<typeof PREVIOUS_MONTH, undefined>;
export type SelectDay = Action<typeof SELECT_DAY, Date>;
export type ToggleView = Action<typeof TOGGLE_VIEW, undefined>;
export type NextWeek = Action<typeof NEXT_WEEK, undefined>;
export type PreviousWeek = Action<typeof PREVIOUS_WEEK, undefined>;

export const add = (payload: CalendarEvent): Add => ({ type: ADD, payload });
export const remove = (payload: CalendarEvent): Remove => ({ type: REMOVE, payload });
export const nextMonth = (): NextMonth => ({ type: NEXT_MONTH, payload: undefined });
export const previousMonth = (): PreviousMonth => ({ type: PREVIOUS_MONTH, payload: undefined });
export const nextWeek = (): NextWeek => ({ type: NEXT_WEEK, payload: undefined });
export const previousWeek = (): PreviousWeek => ({ type: PREVIOUS_WEEK, payload: undefined });
export const clear = (): Clear => ({ type: CLEAR, payload: undefined });
export const selectDay = (payload: Date): SelectDay => ({ type: SELECT_DAY, payload });
export const toggleView = (): ToggleView => ({ type: TOGGLE_VIEW, payload: undefined });

export const Actions = {
  add,
  remove,
  clear,
  nextMonth,
  previousMonth,
  nextWeek,
  previousWeek,
  selectDay,
  toggleView,
};

export type ActionTypes =
  | Add
  | Remove
  | Clear
  | PreviousMonth
  | NextMonth
  | SelectDay
  | ToggleView
  | NextWeek
  | PreviousWeek;
