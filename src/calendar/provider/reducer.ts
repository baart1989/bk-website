import * as Actions from './actions';

import { addMonths, addWeeks, subMonths, subWeeks } from 'date-fns';

export type ViewType = 'monthly' | 'weekly';

export const INITIAL_STATE = {
  calendar: {
    currentDate: new Date().toISOString(),
    selectedDay: new Date().toISOString(),
    view: 'monthly' as ViewType,
  },
  bookedEvents: {},
};

export type CalendarState<T = any> = {
  calendar: {
    currentDate: T;
    selectedDay: T;
    view: ViewType;
  };
  bookedEvents: any;
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
