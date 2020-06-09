import * as CartActions from './cartActions';

export const INITIAL_STATE = {
  cart: [] as CartActions.CartItem[],
  numberOfItemsInCart: 0,
  total: 0,
};

const roundNumber = (number: number, numDecPlaces: number) => {
  const e: any = 'e';
  // http://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places
  return Number(Math.round(number + e + numDecPlaces) + 'e-' + numDecPlaces);
};

export type CartState = typeof INITIAL_STATE;

const calculateTotals = (cart: CartActions.CartItem[]) => {
  return cart.reduce(
    (acc, next) => {
      acc.numberOfItemsInCart = acc.numberOfItemsInCart + next.quantity;
      acc.total = roundNumber(acc.total + next.price * next.quantity, 2);
      return acc;
    },
    {
      total: 0,
      numberOfItemsInCart: 0,
    },
  );
};

const pushOrReplace = (
  cart: CartActions.CartItem[],
  newValue: CartActions.CartItem,
  newQty = 1,
): CartActions.CartItem[] => {
  const index = cart.findIndex(item => item.id === newValue.id);
  const isReplace = index !== -1;
  const newCart = [...cart];
  if (isReplace) {
    const oldValue = newCart[index];
    const qty = oldValue.quantity + newQty;
    newCart[index] = { ...oldValue, quantity: qty > 0 ? qty : 0 };
    return newCart;
  }
  newValue = { ...newValue, quantity: newQty };
  return newCart.concat(newValue);
};

export function cartReducer(
  state: CartState = INITIAL_STATE,
  action: CartActions.ActionTypes,
): CartState {
  switch (action.type) {
    case CartActions.ADD_TO_CART: {
      const newCartState = pushOrReplace(state.cart, action.payload, action.payload.quantity);
      return {
        ...state,
        cart: newCartState,
        ...calculateTotals(newCartState),
      };
    }
    case CartActions.REMOVE_FROM_CART: {
      const newCartState = state.cart.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        cart: newCartState,
        ...calculateTotals(newCartState),
      };
    }

    case CartActions.CHANGE_QTY: {
      const newCartState = pushOrReplace(state.cart, action.payload.item, action.payload.value);
      return {
        ...state,
        cart: newCartState,
        ...calculateTotals(newCartState),
      };
    }
    case CartActions.CLEAR_CART:
      return INITIAL_STATE;

    default:
      return state;
  }
}
