import * as ApiModel from '../../API';

import { eventTypeName, getPrettyDate } from '../../calendar/utils';

import React from 'react';

export const EventCard: React.FC<{ data: ApiModel.EventInput }> = ({ data }) => {
  return (
    <li className="col-span-1 flex flex-col text-center bg-medium-light rounded-lg shadow">
      <div className="flex-1 flex flex-col p-8">
        <h6 className="mt-6 leading-5 font-medium">{eventTypeName(data.eventType)}</h6>
        <dl className="mt-1 flex-grow flex flex-col justify-between">
          <dt className="sr-only">Czas trwania</dt>
          <dd className="text-color-secondary text-sm leading-5">{data.duration} min</dd>
          <dt className="sr-only">Termin</dt>
          <dd className="mt-3">
            <span className="px-2 py-1 text-white text-xs leading-4 font-medium bg-secondary-dark rounded-full">
              {getPrettyDate(new Date(data.startDate))}
            </span>
          </dd>
        </dl>
      </div>
      {/* <div className="border-t border-medium">
        <div className="-mt-px flex">
          <div className="w-0 flex-1 flex">
            <a
              href="#"
              className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-color-secondary font-medium border border-transparent rounded-bl-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150"
            >
              <span className="ml-3">Anuluj</span>
            </a>
          </div>
        </div>
      </div> */}
    </li>
  );
};
