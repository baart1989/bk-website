import React, { useState } from 'react';

import { AlertOptions } from '../../hooks/useAlert/actions';
import { TextInput } from '../ui';
import cns from 'classnames';

export const AlertComponent: React.FC<{ data: AlertOptions }> = ({
  data: { header, message, buttons, inputs = [] },
}) => {
  const [data, changeData] = useState({});
  return (
    <div
      className="bg-bg rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div className="bg-bg px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg leading-6 font-medium" id="modal-headline">
              {header}
            </h3>
            {!!message && (
              <div className="mt-2">
                <p className="text-sm leading-5">{message}</p>
              </div>
            )}
            <div>
              {inputs.map(input => (
                <TextInput
                  {...input}
                  key={input.name}
                  onChange={e => changeData({ ...data, [input.name]: e.target.value })}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        {buttons.map((button, index) => (
          <span
            key={button.role}
            className={cns(
              'flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto',
              {
                'sm:ml-3': index !== buttons.length - 1,
              },
              {
                'mt-3 sm:mt-0': index === buttons.length - 1,
              },
            )}
          >
            <button
              className={cns(
                'text-base leading-6 font-medium',
                'inline-flex justify-center w-full rounded-md border px-4 py-2',
                'focus:outline-none sm:text-sm sm:leading-5 shadow-sm',
                'transition ease-in-out duration-150',
                {
                  'bg-bg text-color-secondary border-medium hover:text-medium-light focus:text-medium-light':
                    button.role === 'cancel',
                },
                {
                  'border-transparent bg-red-600 text-white hover:bg-red-500 focus:border-red-700 focus:shadow-outline-red':
                    button.role === 'destroy',
                },
                {
                  'border-indigo-400 bg-bg text-secondary-dark hover:text-secondary-light focus:border-secondary-light focus:shadow-outline-secondary':
                    button.role === 'confirm',
                },
              )}
              onClick={() => button.handler(data)}
              type="button"
            >
              {button.text}
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default AlertComponent;
