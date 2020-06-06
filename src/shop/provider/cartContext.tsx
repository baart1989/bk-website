import * as CartActions from './cartActions';

import { CartState, INITIAL_STATE, cartReducer } from './cartReducer';

import React from 'react';
import { Undo } from '../components/undo';
import { createPersistedReducer } from 'react-frontend-common';
import { toast } from 'react-toastify';

type SiteContextState = CartState & {
  addToCart: (item: CartActions.CartItem) => void;
  clearCart: (item: CartActions.CartItem) => void;
  removeFromCart: (item: CartActions.CartItem) => void;
  increaseQty: (item: CartActions.CartItem) => void;
  decreaseQty: (item: CartActions.CartItem) => void;
};

const usePersistedReducer = createPersistedReducer('AT_WEBSITE_BASKET', globalThis.localStorage);
const SiteContext = React.createContext<SiteContextState>(INITIAL_STATE as SiteContextState);

export const useSiteContext = () => React.useContext(SiteContext);

const ContextProviderComponent = ({ children }) => {
  const [state, dispatch] = usePersistedReducer(cartReducer, INITIAL_STATE);

  const removeFromCart = (item: CartActions.CartItem) => {
    dispatch(CartActions.remove(item));
    toast(<Undo text="Usunięto z koszyka" onUndo={() => dispatch(CartActions.add(item))} />);
  };
  const clearCart = () => dispatch(CartActions.clear());

  const addToCart = (item: CartActions.CartItem) => {
    dispatch(CartActions.add(item));
    toast(<Undo text="Produkt dodano do koszyka" onUndo={() => removeFromCart(item)} />);
  };

  const increaseQty = (item: CartActions.CartItem) => {
    dispatch(CartActions.changeQty(item, 1));
  };

  const decreaseQty = (item: CartActions.CartItem) => {
    dispatch(CartActions.changeQty(item, -1));
  };

  const value = React.useMemo(
    () => ({
      ...state,
      removeFromCart,
      clearCart,
      addToCart,
      increaseQty,
      decreaseQty,
    }),
    [state],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
};

export { SiteContext, ContextProviderComponent };
