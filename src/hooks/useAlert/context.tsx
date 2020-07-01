import { Actions, AlertButton, AlertOptions } from './actions';
import { AlertComponent, AlertTransition } from '../../components/alert';
import { AlertState, INITIAL_STATE, alertReducer } from './reducer';
import React, {
  Fragment,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';

import { canUseDOM } from 'react-frontend-common';
import { createPortal } from 'react-dom';

type AlertContextState = AlertState & {
  showAlert: (alertOptions?: Partial<AlertOptions>) => AlertOptions;
  hideAlert: (alertOptions?: Partial<AlertOptions>) => void;
};

const ALERT_ID = '__at-alert__';
const Context = createContext<AlertContextState>(INITIAL_STATE as AlertContextState);
export const useAlert = () => React.useContext(Context);

export const AlertProviderComponent = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, INITIAL_STATE);
  const root = useRef(null);

  useEffect(() => {
    root.current = canUseDOM ? document.createElement('div') : null;
    if (canUseDOM) {
      root.current.id = ALERT_ID;
      document.body.appendChild(root.current);
    }
    return () => {
      if (root.current) {
        document.body.removeChild(root.current);
      }
    };
  }, []);

  const show = useCallback((alert: Partial<AlertOptions> = {}) => {
    const id = Math.random()
      .toString(36)
      .substr(2, 9);

    const openCallback = alert.onOpen;
    const defaultButtons: AlertButton[] = [{ role: 'confirm', text: 'OK' }];

    alert.id = id;
    alert.buttons = alert.buttons ? alert.buttons : defaultButtons;

    alert.buttons = alert.buttons.map(button => {
      const callback = button.handler || undefined;
      button.handler = (data: any) => {
        dispatch(Actions.hide(alert));
        callback ? callback(data) : undefined;
      };
      return button;
    });

    dispatch(Actions.show(alert));
    openCallback ? openCallback() : null;

    return alert;
  }, []);

  const showAlert = useCallback(
    (options: Partial<AlertOptions> = {}) => {
      options.type = 'alert';
      return show(options);
    },
    [show],
  );

  const hideAlert = useCallback((options?: AlertOptions) => {
    dispatch(Actions.hide(options));
    options.onClose ? options.onClose() : null;
  }, []);

  const showSelect = useCallback(
    (options: Partial<AlertOptions> = {}) => {
      options.type = 'select';
      return show(options);
    },
    [show],
  );

  const value = useMemo(
    () => ({
      ...state,
      showSelect,
      showAlert,
      hideAlert,
    }),
    [state],
  );

  return (
    <Context.Provider value={value}>
      {children}
      {root.current &&
        createPortal(
          <Fragment>
            <AlertTransition isVisible={!!state.alerts.length}>
              {!!state.alerts.length && <AlertComponent data={state.alerts[0]}></AlertComponent>}
            </AlertTransition>
          </Fragment>,
          root.current,
        )}
    </Context.Provider>
  );
};

export default Context;
