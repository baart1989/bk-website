import { AlertTemplate } from '../hooks/useAlert/actions';
import React from 'react';
import { Transition } from 'react-tailwind-component';

const EmptyComponent = () => <div></div>;

export const AlertTransition = ({ children, isVisible }) => {
  return (
    <Transition
      appear={isVisible}
      show={isVisible}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center z-50">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <Transition
          appear={isVisible}
          show={isVisible}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          {children || <EmptyComponent />}
        </Transition>
      </div>
    </Transition>
  );
};

export const AlertComponent: React.FC<{ data: AlertTemplate }> = ({ data }) => {
  const { title, message, close, confirm } = data;
  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              {title}
            </h3>
            {!!message && (
              <div className="mt-2">
                <p className="text-sm leading-5 text-gray-500">{message}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
          <button
            onClick={confirm}
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
          >
            Usuń
          </button>
        </span>
        <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
          <button
            onClick={close}
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
          >
            Anuluj
          </button>
        </span>
      </div>
    </div>
  );
};

export default AlertTemplate;
