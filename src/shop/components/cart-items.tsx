import { Check, Edit2 } from 'react-feather';

import Img from 'gatsby-image';
import React from 'react';
import cns from 'classnames';
import { useSiteContext } from '../provider';

const CartItem = ({ item, readonly }) => {
  const [editable, setEditable] = React.useState(false);

  const actionButtons = (
    <React.Fragment>
      <button
        onClick={() => setEditable(!editable)}
        className="text-left w-full flex justify-between items-start text-gray-400 focus:outline-none focus:text-gray-900"
      >
        <span className="font-medium text-color-default">{editable ? 'Zapisz' : 'Edytuj'}</span>
        <span className="ml-6 h-7 flex items-center">
          {editable && <Check />}
          {!editable && <Edit2 />}
        </span>
      </button>
    </React.Fragment>
  );

  return (
    <div className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="min-w-0 flex-1 flex items-center">
          <div className="flex-shrink-0">
            {item.image ? (
              <Img className="h-16 w-16 rounded-full" fluid={item.image.childImageSharp.fluid} />
            ) : null}
          </div>
          <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
            <div>
              <div className="text-sm leading-5 font-medium text-color-1 truncate">
                {item.title}
              </div>
              <div className="mt-2 flex items-center text-sm leading-5">
                <span className="truncate">{item.description}</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div>
                <div className="text-sm leading-5">Cena całkowita</div>
                <div className="mt-2 flex items-center text-sm leading-5 text-color-3">
                  {item.quantity} x {item.price} {item.currency}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>{!readonly && actionButtons}</div>
      </div>
    </div>
  );
};

export function CartItems({ readonly = false }) {
  const { cart } = useSiteContext();
  return (
    <div className="shadow overflow-hidden sm:rounded-md mt-8">
      <ul>
        {cart.map((item, index) => (
          <li key={item.id} className={cns({ 'border-t border-gray-200': index !== 0 })}>
            <CartItem readonly={readonly} item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
