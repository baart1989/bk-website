import { Minus, Plus } from 'react-feather';

import { CartItem } from '../provider/cartActions';
import Img from 'gatsby-image';
import React from 'react';
import cns from 'classnames';
import { roundNumber } from 'react-frontend-common';
import { useAlert } from '../../hooks/useAlert';
import { useSiteContext } from '../provider';

const Icon = ({ children, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={cns(
      'm-2 md:m-4 p-1 md:p-2 rounded-lg hover:bg-medium-light focus:bg-medium-light hover:outline-none focus:outline-none',
      className,
    )}
  >
    {children}
  </button>
);

const Item: React.FC<{ item: CartItem; readonly: boolean }> = ({ item, readonly }) => {
  const { increaseQty, decreaseQty: descrease, removeFromCart } = useSiteContext();
  const alert = useAlert();

  const decreaseQty = (item: CartItem) => {
    const newQty = item.quantity - 1;
    if (newQty > 0) {
      return descrease(item);
    }
    alert.showAlert({
      type: 'warning',
      header: 'Usunąć z koszyka?',
      buttons: [
        { role: 'destroy', text: 'Usuń', handler: () => removeFromCart(item) },
        { role: 'cancel', text: 'Anuluj' },
      ],
    });
  };
  const actionButtons = (
    <React.Fragment>
      <div className="flex items-center">
        {!readonly && (
          <Icon onClick={() => decreaseQty(item)}>
            <Minus size="24" />
          </Icon>
        )}
        <div className="p-2 text-xl md:text-3xl">{item.quantity}</div>
        {!readonly && (
          <Icon onClick={() => increaseQty(item)}>
            <Plus size="24" />
          </Icon>
        )}
      </div>
    </React.Fragment>
  );

  return (
    <div className="flex items-center justify-between py-4 px-4">
      <div className="hidden md:block flex-shrink-0">
        {item.image ? (
          <Img className="h-16 w-16 rounded-full" fluid={item.image.childImageSharp.fluid} />
        ) : null}
      </div>
      <div className="w-1/2">
        <div className="text-sm leading-5 font-medium color-secondary-text">{item.title}</div>
      </div>
      <div>{!readonly && actionButtons}</div>
      <div>
        {roundNumber(item.quantity * item.price, 2)}
        {` ${item.currency}`}
      </div>
    </div>
  );
};

export function CartItems({ readonly = false }) {
  const { cart, total } = useSiteContext();
  return (
    <div className="shadow overflow-hidden sm:rounded-md my-8">
      <ul>
        {cart.map((item, index) => (
          <li key={item.id} className={cns({ 'border-t border-gray-200': index !== 0 })}>
            <Item readonly={readonly} item={item} />
          </li>
        ))}
        <li className="border-t border-gray-200">
          <div className="flex justify-end px-4 py-4 sm:px-6">
            <div>
              Łącznie
              <span className="text-2xl">{` ${total} `}</span>
              pln
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
