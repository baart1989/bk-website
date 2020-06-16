import * as Actions from './actions';

import { addMonths, addWeeks, subMonths, subWeeks } from 'date-fns';

export type ViewType = 'monthly' | 'weekly';

const config = {
  excludeHoursAfterMidnight: 8,
  excludeHoursBeforeMidnight: 4,
  slotLengthInMinutes: 60,
};
export type CalendarConfig = typeof config;

export const INITIAL_STATE = {
  status: 'idle' as const,
  config,
  calendar: {
    currentDate: new Date().toISOString(),
    selectedDay: new Date().toISOString(),
    view: 'monthly' as ViewType,
  },
  bookedEvents: {
    '2020-06-16T10:00:00.000Z': 30,
    '2020-06-16T11:00:00.000Z': 60,
    '2020-06-16T13:00:00.000Z': 45,
    '2020-06-16T15:00:00.000Z': 60,
  },
  unavailable: {
    '2020-06-16T08:00:00.000Z': true,
    '2020-06-16T09:00:00.000Z': true,
    '2020-06-16T18:00:00.000Z': true,
    '2020-06-16T19:00:00.000Z': true,
  },
};

export type CalendarState<T = any> = {
  status: 'idle' | 'pending' | 'resolved' | 'rejected';
  config: CalendarConfig;
  calendar: {
    currentDate: T;
    selectedDay: T;
    view: ViewType;
  };
  bookedEvents: { [id: string]: boolean };
  unavailable: { [id: string]: boolean };
};

export function calendarReducer(
  state: CalendarState = INITIAL_STATE,
  action: Actions.ActionTypes,
): CalendarState {
  switch (action.type) {
    case Actions.ADD: {
      return state;
    }

    case Actions.TOGGLE_VIEW: {
      return {
        ...state,
        calendar: {
          ...state.calendar,
          view: state.calendar.view === 'monthly' ? 'weekly' : 'monthly',
        },
      };
    }

    case Actions.SELECT_DAY: {
      return {
        ...state,
        calendar: {
          ...state.calendar,
          currentDate: action.payload.toISOString(),
          selectedDay: action.payload.toISOString(),
        },
      };
    }

    case Actions.PREVIOUS_MONTH: {
      const { currentDate } = state.calendar;
      return {
        ...state,
        calendar: {
          ...state.calendar,
          currentDate: subMonths(new Date(currentDate), 1).toISOString(),
        },
      };
    }

    case Actions.NEXT_MONTH: {
      const { currentDate } = state.calendar;
      return {
        ...state,
        calendar: {
          ...state.calendar,
          currentDate: addMonths(new Date(currentDate), 1).toISOString(),
        },
      };
    }

    case Actions.NEXT_WEEK: {
      const { currentDate } = state.calendar;
      return {
        ...state,
        calendar: {
          ...state.calendar,
          currentDate: addWeeks(new Date(currentDate), 1).toISOString(),
        },
      };
    }

    case Actions.PREVIOUS_WEEK: {
      const { currentDate } = state.calendar;
      return {
        ...state,
        calendar: {
          ...state.calendar,
          currentDate: subWeeks(new Date(currentDate), 1).toISOString(),
        },
      };
    }

    case Actions.CLEAR: {
      return INITIAL_STATE;
    }

    default:
      return state;
  }
}
