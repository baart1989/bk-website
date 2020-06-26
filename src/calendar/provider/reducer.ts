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
    selectedEvent: null,
    view: 'monthly' as ViewType,
  },
  bookedEvents: {},
  unavailable: {},
};

export type CalendarState<T = any> = {
  status: 'idle' | 'pending' | 'resolved' | 'rejected';
  config: CalendarConfig;
  calendar: {
    currentDate: T;
    selectedEvent: {
      // ensure all values are string
      startDate: string;
      clientName: 'Anna Podsiadło';
      eventType: 'Rozmowa telefoniczna';
      duration: '60';
      paymentType: 'Płatność przelewem';
    };
    view: ViewType;
  };
  bookedEvents: { [id: string]: number };
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

    case Actions.SET_EVENTS: {
      if (action.payload.errors) {
        // TODO - handle errors gracefully
        return state;
      }

      const { data } = action.payload;

      if (data && data.getClientEvents) {
        const normalizedData = action.payload.data.getClientEvents.reduce(
          (acc, next) => {
            if (next.type === 'unavailable') {
              acc['unavailable'] = {
                ...acc['unavailable'],
                [new Date(next.startDate).toISOString()]: true,
              };
              return acc;
            }
            acc['bookedEvents'] = {
              ...acc['bookedEvents'],
              [new Date(next.startDate).toISOString()]: 60,
            };
            return acc;
          },
          {
            bookedEvents: {},
            unavailable: {},
          },
        );
        return {
          ...state,
          ...normalizedData,
        };
      }
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

    case Actions.BOOK_EVENT: {
      return {
        ...state,
        calendar: {
          ...state.calendar,
          selectedEvent: {
            eventType: 'Rozmowa telefoniczna',
            paymentType: 'Płatność przelewem',
            duration: '60',
            clientName: 'Anna Podsiadło',
            startDate: action.payload,
          },
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
