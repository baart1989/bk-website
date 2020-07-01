import * as ApiModel from '../../API';

import { CalendarProviderComponent, useCalendar } from '../../calendar/provider';

import { Button } from '../../components/ui';
import { OfferCheckmark } from './offer-checkmark';
import { OfferListQuery_allMdx_edges_node } from '../__generated__/OfferListQuery';
import React from 'react';
import { navigate } from 'gatsby';

export const OfferItemMain: React.FC<OfferListQuery_allMdx_edges_node & {
  eventType: ApiModel.EventType;
}> = ({ frontmatter: { title, price, currency, details }, eventType }) => {
  const offerDetails = details.map((text, index) => <OfferCheckmark key={index} text={text} />);
  const { bookEvent } = useCalendar();
  return (
    <div className="mt-10 max-w-lg mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4">
      <div className="relative z-10 rounded-lg shadow-xl">
        <div className="pointer-events-none absolute inset-0 rounded-lg border-2 border-primary"></div>
        <div className="absolute inset-x-0 top-0 transform translate-y-px">
          <div className="flex justify-center transform -translate-y-1/2">
            <span className="inline-flex rounded-full bg-primary px-4 py-1 text-sm leading-5 font-semibold tracking-wider uppercase text-white">
              Polecany
            </span>
          </div>
        </div>
        <div className="rounded-t-lg px-6 pt-12 pb-10">
          <div>
            <h4 className="text-center text-color-default leading-9 font-semibold sm:-mx-6">
              {title}
            </h4>
            <div className="mt-4 flex items-center justify-center">
              <span className="px-3 flex items-start text-6xl leading-none tracking-tight sm:text-6xl">
                <span className="font-extrabold">{price}</span>
              </span>
              <span className="text-2xl leading-8 font-medium">{currency}</span>
            </div>
          </div>
        </div>
        <div className="border-t-2 lg:border-0 rounded-b-lg pt-10 pb-8 px-6 bg-gray-50 sm:px-10 sm:py-10">
          <ul className="m-8">{offerDetails}</ul>
          <div className="mt-10">
            <Button
              type="button"
              className="text-xl py-8"
              full={true}
              title="Zarezerwuj wizytę"
              onClick={() => {
                bookEvent({
                  startDate: new Date().toISOString(),
                  eventType: eventType,
                });
                navigate('/calendar/');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function OfferMainWithContext(props) {
  return (
    <CalendarProviderComponent>
      <OfferItemMain {...props} />
    </CalendarProviderComponent>
  );
}
