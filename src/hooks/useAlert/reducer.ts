import * as Actions from './actions';

export const INITIAL_STATE = {
  alerts: [] as Actions.AlertOptions[],
};

export type AlertState = typeof INITIAL_STATE;

export function alertReducer(state = INITIAL_STATE, action: Actions.ActionTypes): AlertState {
  switch (action.type) {
    case Actions.SHOW_ALERT: {
      return { ...state, alerts: [...state.alerts, action.payload] };
    }
    case Actions.HIDE_ALERT: {
      const alerts =
        action.payload && action.payload.id
          ? state.alerts.filter(({ id }) => id !== action.payload.id)
          : [...state.alerts.splice(0, 1)];
      return { ...state, alerts };
    }
    default:
      return state;
  }
}
