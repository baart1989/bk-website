import * as ApiModel from '../../API';

import React from 'react';

type UserInfo = Omit<Exclude<ApiModel.GetClientUserQuery['getClientUser'], null>, '__typename'>;

export const UserCard: React.FC<{ data: UserInfo }> = ({ data }) => {
  return (
    <li className="col-span-1 flex flex-col text-center bg-medium-light rounded-lg shadow">
      <div className="flex-1 flex flex-col p-8">
        <div>
          <span className="inline-flex items-center justify-center h-32 w-32 rounded-full bg-secondary">
            <span className="font-medium leading-none text-white uppercase">
              {data.name.slice(0, 2)}
            </span>
          </span>
        </div>
        <h3 className="mt-6 text-sm leading-5 font-medium">{data.name}</h3>
        <dl className="mt-1 flex-grow flex flex-col justify-between">
          <dt className="sr-only">Imię i Nazwisko</dt>
          <dd className="text-color-secondary text-sm leading-5">{data.email}</dd>
          <dt className="sr-only">Rola</dt>
          <dd className="mt-3">
            <span className="px-2 py-1 text-white text-xs leading-4 font-medium bg-secondary-dark rounded-full">
              Użytkownik
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
              <svg className="w-5 h-5 text-color-secondary" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="ml-3">Email</span>
            </a>
          </div>
        </div>
      </div> */}
    </li>
  );
};
