import { ContextProviderComponent, useSiteContext } from '../provider';

import { Link } from 'gatsby';
import React from 'react';
import { ShoppingCart } from 'react-feather';

export const CartIcon = ({ className = '' }) => {
  const { numberOfItemsInCart } = useSiteContext();
  return (
    <Link to="/cart/" className={className}>
      <ShoppingCart />
      {numberOfItemsInCart
        ? null // <span className="font-bold text-sm">{numberOfItemsInCart}</span>
        : null}
    </Link>
  );
};

export default function cartIconWithContext() {
  return (
    <ContextProviderComponent>
      <CartIcon />
    </ContextProviderComponent>
  );
}
