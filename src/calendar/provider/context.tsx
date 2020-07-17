import * as ApiModel from '../../API';

import { CalendarState, INITIAL_STATE, calendarReducer } from './reducer';

import { Actions } from './actions';
import { GraphQLResult } from '@aws-amplify/api';
import React from 'react';
import { createPersistedReducer } from 'react-frontend-common';

type CalendarContextState = CalendarState<Date> & Partial<typeof Actions>;

function dispatchAction<T>(dispatch: Function, action: T) {
  dispatch(action);
  return action;
}

const usePersistedReducer = createPersistedReducer('AT_WEBSITE_CALENDAR');
const CalendarContext = React.createContext<CalendarContextState>(INITIAL_STATE as any);

export const useCalendar = () => React.useContext(CalendarContext);

const CalendarProviderComponent = ({ children }) => {
  const [state, dispatch] = usePersistedReducer(calendarReducer, INITIAL_STATE);
  const nextMonth = () => dispatchAction(dispatch, Actions.nextMonth());
  const previousMonth = () => dispatchAction(dispatch, Actions.previousMonth());
  const nextWeek = () => dispatchAction(dispatch, Actions.nextWeek());
  const previousWeek = () => dispatchAction(dispatch, Actions.previousWeek());

  const bookEvent = (data: Partial<ApiModel.EventInput>) =>
    dispatchAction(dispatch, Actions.bookEvent(data));

  const setEvents = (result: GraphQLResult<ApiModel.GetClientEventsQuery>) =>
    dispatchAction(dispatch, Actions.setEvents(result));

  const value = React.useMemo(
    () => ({
      ...state,
      calendar: {
        ...state.calendar,
        currentDate: new Date(state.calendar.currentDate),
      },
      nextMonth,
      previousMonth,
      bookEvent,
      previousWeek,
      nextWeek,
      setEvents,
    }),
    [state],
  );

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
};

export { CalendarContext, CalendarProviderComponent };
