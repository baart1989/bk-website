import { Actions, AlertTemplate } from './actions';
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
  showAlert: (message: string, alertOptions?: Partial<AlertOptions>) => AlertTemplate;
  hideAlert: (alert?: AlertTemplate) => void;
};

type AlertOptions = {
  type: 'info' | 'warning' | 'success';
  onOpen?: () => void;
  onOk?: () => void;
  onClose?: () => void;
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

  const show = useCallback((message = '', alertOptions: Partial<AlertOptions> = {}) => {
    const id = Math.random()
      .toString(36)
      .substr(2, 9);

    const alert = {
      id,
      message,
      options: alertOptions,
      close: undefined,
      confirm: undefined,
    };

    alert.close = () => {
      dispatch(Actions.hide(alert));
      alertOptions.onClose ? alertOptions.onClose() : null;
      return alert;
    };

    alert.confirm = () => {
      dispatch(Actions.hide(alert));
      alertOptions.onOk ? alertOptions.onOk() : null;
      return alert;
    };

    dispatch(Actions.show(alert));
    if (alert.options.onOpen) alert.options.onOpen();
    return alert;
  }, []);

  const showAlert = useCallback(
    (message = '', options: Partial<AlertOptions> = {}) => {
      options.type = 'info';
      return show(message, options);
    },
    [show],
  );

  const hideAlert = useCallback((alert?: AlertTemplate) => {
    dispatch(Actions.hide(alert));
    if (alert.options.onClose) {
      alert.options.onClose();
    }
  }, []);

  const value = useMemo(
    () => ({
      ...state,
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
