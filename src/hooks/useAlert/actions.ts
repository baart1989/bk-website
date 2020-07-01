export type Action<T, K> = { type: T; payload: K };
export type AlertSelectOptions = AlertOptions & {
  options: AlertSelectOption[];
};
export type AlertOptions = {
  id?: string;
  header?: string;
  subHeader?: string;
  message?: string;
  inputs?: AlertInput[];
  buttons?: AlertButton[];
  backdropDismiss?: boolean;
  type: 'alert' | 'select' | 'input';
  onOpen?: () => void;
  onOk?: () => void;
  onClose?: () => void;
};
export interface AlertSelectOption {
  id: string;
  label: string;
}
export interface AlertInput {
  type?: string;
  name?: string;
  label?: string;
}
export interface AlertButton {
  text: string;
  role?: 'cancel' | 'confirm' | 'destroy';
  cssClass?: string | string[];
  handler?: Function;
}

export const SHOW_ALERT = 'AT_SHOW_ALERT';
export const HIDE_ALERT = 'AT_HIDE_ALERT';
export type Show = Action<typeof SHOW_ALERT, Partial<AlertOptions>>;
export type Hide = Action<typeof HIDE_ALERT, Partial<AlertOptions>>;

export const show = (payload: Partial<AlertOptions>): Show => ({ type: SHOW_ALERT, payload });
export const hide = (payload: Partial<AlertOptions>): Hide => ({ type: HIDE_ALERT, payload });

export const Actions = {
  show,
  hide,
};

export type ActionTypes = Show | Hide;
