export type Action<T, K> = { type: T; payload: K };
export type CartItem = {
  id: string;
  price: number;
  title: string;
  image: any;
  path?: string;
  currency: string;
  quantity?: number;
  description?: string;
};

export const ADD_TO_CART = 'AT_ADD_TO_CART';
export const REMOVE_FROM_CART = 'AT_REMOVE_FROM_CART';
export const CLEAR_CART = 'AT_CLEAR_CART';
export const CHANGE_QTY = 'AT_CHANGE_QTY';

export type Add = Action<typeof ADD_TO_CART, CartItem>;
export type Remove = Action<typeof REMOVE_FROM_CART, Pick<CartItem, 'id'>>;
export type ChangeQty = Action<typeof CHANGE_QTY, { item: CartItem; value: 1 | -1 }>;
export type Clear = Action<typeof CLEAR_CART, undefined>;

export const add = (item: CartItem): Add => ({ type: ADD_TO_CART, payload: item });
export const remove = (item: CartItem): Remove => ({ type: REMOVE_FROM_CART, payload: item });
export const clear = (): Clear => ({ type: CLEAR_CART, payload: undefined });
export const changeQty = (item: CartItem, value: 1 | -1): ChangeQty => ({
  type: CHANGE_QTY,
  payload: { item, value },
});

export const CartActions = {
  add,
  remove,
  clear,
  changeQty,
};

export type ActionTypes = Add | Remove | Clear | ChangeQty;
