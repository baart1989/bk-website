import * as ApiModel from '../../API';

import { clientName, eventTypeName, getPrettyDate, paymentTypeName } from '../utils';

import React from 'react';

export const EventDetails: React.FC<{ item: ApiModel.EventInput; inPast?: boolean }> = ({
  item,
  inPast,
}) => {
  return item ? (
    <div className="mt-6 shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <h3 className="text-color-default">{getPrettyDate(new Date(item.startDate))}</h3>
      <div className="flex flex-wrap">
        <div className="w-1/2 py-4">Specjalista: {clientName(item.clientId)}</div>
        <div className="w-1/2 py-4">Rodzaj wizyty: {eventTypeName(item.eventType)}</div>
        {!inPast && <div className="w-1/2 py-4">Czas trwania: {item.duration}min</div>}
        {!inPast && (
          <div className="w-1/2 py-4">Typ płatności: {paymentTypeName(item.paymentType)}</div>
        )}
      </div>
    </div>
  ) : null;
};
