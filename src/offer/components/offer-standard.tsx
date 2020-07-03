import * as ApiModel from '../../API';

import { CalendarProviderComponent, useCalendar } from '../../calendar/provider';

import { OfferCheckmark } from './offer-checkmark';
import { OfferListQuery_allMdx_edges_node } from '../__generated__/OfferListQuery';
import React from 'react';
import cns from 'classnames';
import { navigate } from 'gatsby';

type OfferDetails = OfferListQuery_allMdx_edges_node & { position: 'left' | 'right' } & {
  eventType: ApiModel.EventType;
};

const OfferStandard: React.FC<OfferDetails> = ({
  frontmatter: { title, price, currency, details },
  position,
  eventType,
}) => {
  const containerClassNames =
    'mt-10 mx-auto max-w-lg lg:m-0 lg:max-w-none lg:row-start-2 lg:row-end-3';
  const innerContainerClassNames =
    'h-full flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none';

  const { bookEvent } = useCalendar();

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
              <h5 className="text-center leading-8 font-thin">{title}</h5>
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
                  onClick={() => {
                    bookEvent({
                      startDate: new Date().toISOString(),
                      eventType: eventType,
                    });
                    navigate('/calendar/');
                  }}
                  className="btn-secondary block w-full text-base font-medium border border-transparent"
                >
                  Zarezerwuj wizytę
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function OfferStandardWithContext(props) {
  return (
    <CalendarProviderComponent>
      <OfferStandard {...props} />
    </CalendarProviderComponent>
  );
}
