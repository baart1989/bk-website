import * as ApiModel from '../../API';

import React from 'react';
import { getPrettyDate } from '../utils';

export const EventDetails: React.FC<{ item: ApiModel.EventInput; inPast?: boolean }> = ({
  item,
  inPast,
}) => {
  return item ? (
    <div className="mt-6 shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <h3 className="text-color-default">{getPrettyDate(new Date(item.startDate))}</h3>
      <div className="flex flex-wrap">
        <div className="w-1/2 py-4">Specjalista: Anna Podsiadło</div>
        <div className="w-1/2 py-4">Rodzaj wizyty: Rozmowa telefoniczna</div>
        {!inPast && <div className="w-1/2 py-4">Czas trwania: 60min</div>}
        {!inPast && <div className="w-1/2 py-4">Typ płatności: Zapłacone</div>}
      </div>
    </div>
  ) : null;
};
