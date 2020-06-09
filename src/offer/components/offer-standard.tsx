import { OfferCheckmark } from './offer-checkmark';
import { OfferListQuery_allMdx_edges_node } from '../__generated__/OfferListQuery';
import React from 'react';
import cns from 'classnames';
import { useSiteContext } from '../../shop/provider';

type OfferDetails = OfferListQuery_allMdx_edges_node & { position: 'left' | 'right' };

export const OfferStandard: React.FC<OfferDetails> = ({
  id,
  frontmatter: { title, price, currency, details, image: localFile },
  position,
}) => {
  const { addToCart } = useSiteContext();

  const addItemToCart = () => () => {
    addToCart({ id, title, price, currency, image: localFile });
  };

  const containerClassNames =
    'mt-10 mx-auto max-w-lg lg:m-0 lg:max-w-none lg:row-start-2 lg:row-end-3';
  const innerContainerClassNames =
    'h-full flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none';

  return (
    <div
      className={cns(containerClassNames, {
        'lg:col-start-1 lg:col-end-3': position === 'left',
        'lg:col-start-6 lg:col-end-8': position === 'right',
      })}
    >
      <div
        className={cns(innerContainerClassNames, {
          'lg:rounded-l-lg': position === 'left',
          'lg:rounded-r-lg': position === 'right',
          'border-2 lg:border-r-0': position === 'left',
          'border-2 lg:border-l-0': position === 'right',
        })}
      >
        <div className="flex-1 flex flex-col">
          <div className="px-6 py-10">
            <div>
              <h5 className="text-center leading-8 font-thin text-color-default">{title}</h5>
              <div className="mt-4 flex items-center justify-center">
                <span className="px-3 flex items-start text-5xl leading-none tracking-tight">
                  <span className="font-extrabold">{price}</span>
                </span>
                <span className="text-xl leading-7 font-medium">{currency}</span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-between border-t-2 border-gray-100 p-6 bg-gray-50 sm:p-10 lg:p-6 xl:p-10">
            <ul>
              {details.map((text, index) => (
                <OfferCheckmark key={index} text={text} />
              ))}
            </ul>
            <div className="mt-4">
              <div className="rounded-lg shadow-md">
                <button
                  onClick={addItemToCart}
                  className="block w-full text-center border border-transparent bg-white px-6 py-3 text-base leading-6 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:shadow-outline transition ease-in-out duration-150"
                >
                  Dodaj do koszyka
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferStandard;
