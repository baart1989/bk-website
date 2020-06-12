export type Action<T, K> = { type: T; payload: K };

export type AlertTemplate = {
  id: string;
  title?: string;
  message?: string;
  options: any;
  close: () => void;
  confirm: () => void;
};

export const SHOW_ALERT = 'AT_SHOW_ALERT';
export const HIDE_ALERT = 'AT_HIDE_ALERT';
export type Show = Action<typeof SHOW_ALERT, AlertTemplate>;
export type Hide = Action<typeof HIDE_ALERT, Partial<AlertTemplate>>;

export const show = (payload: AlertTemplate): Show => ({ type: SHOW_ALERT, payload });
export const hide = (payload?: Partial<AlertTemplate>): Hide => ({ type: HIDE_ALERT, payload });

export const Actions = {
  show,
  hide,
};

export type ActionTypes = Show | Hide;
