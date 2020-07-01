import * as ApiModel from '../../API';

import { GraphQLResult } from '@aws-amplify/api';

export type Action<T, K> = { type: T; payload: K };
export type EventType = 'bookedEvents' | 'unavailable';

export const ADD = 'AT_CALENDAR_ADD_TO';
export const REMOVE = 'AT_CALENDAR_REMOVE_FROM';
export const CLEAR = 'AT_CALENDAR_CLEAR';

export const TOGGLE_VIEW = 'AT_CALENDAR_TOGGLE_VIEW';
export const NEXT_MONTH = 'AT_CALENDAR_NEXT_MONTH';
export const PREVIOUS_MONTH = 'AT_CALENDAR_PREVIOUS_MONTH';
export const NEXT_WEEK = 'AT_CALENDAR_NEXT_WEEK';
export const PREVIOUS_WEEK = 'AT_CALENDAR_PREVIOUS_WEEK';
export const BOOK_EVENT = 'AT_CALENDAR_BOOK_EVENT';
export const SET_EVENTS = 'AT_CALENDAR_SET_EVENTS';

export type Add = Action<typeof ADD, ApiModel.EventInput>;
export type Remove = Action<typeof REMOVE, Pick<ApiModel.EventInput, 'id'>>;
export type Clear = Action<typeof CLEAR, undefined>;
export type NextMonth = Action<typeof NEXT_MONTH, undefined>;
export type PreviousMonth = Action<typeof PREVIOUS_MONTH, undefined>;
export type BookEvent = Action<typeof BOOK_EVENT, Partial<ApiModel.EventInput>>;
export type ToggleView = Action<typeof TOGGLE_VIEW, undefined>;
export type NextWeek = Action<typeof NEXT_WEEK, undefined>;
export type PreviousWeek = Action<typeof PREVIOUS_WEEK, undefined>;
export type SetEvents = Action<typeof SET_EVENTS, GraphQLResult<any>>;

export const add = (payload: ApiModel.EventInput): Add => ({ type: ADD, payload });
export const remove = (payload: ApiModel.EventInput): Remove => ({ type: REMOVE, payload });
export const nextMonth = (): NextMonth => ({ type: NEXT_MONTH, payload: undefined });
export const previousMonth = (): PreviousMonth => ({ type: PREVIOUS_MONTH, payload: undefined });
export const nextWeek = (): NextWeek => ({ type: NEXT_WEEK, payload: undefined });
export const previousWeek = (): PreviousWeek => ({ type: PREVIOUS_WEEK, payload: undefined });
export const clear = (): Clear => ({ type: CLEAR, payload: undefined });
export const bookEvent = (payload: Partial<ApiModel.EventInput>): BookEvent => ({
  type: BOOK_EVENT,
  payload,
});
export const toggleView = (): ToggleView => ({ type: TOGGLE_VIEW, payload: undefined });
export const setEvents = (payload: GraphQLResult<ApiModel.GetClientEventsQuery>): SetEvents => ({
  type: SET_EVENTS,
  payload,
});

export const Actions = {
  add,
  remove,
  clear,
  bookEvent,
  nextMonth,
  previousMonth,
  nextWeek,
  previousWeek,
  toggleView,
  setEvents,
};

export type ActionTypes =
  | Add
  | Remove
  | Clear
  | PreviousMonth
  | NextMonth
  | BookEvent
  | ToggleView
  | NextWeek
  | PreviousWeek
  | SetEvents;
