import React from 'react';

type ToastProps = {
  title?: string;
  message?: string;
  closeToast?: Function;
};

export const Toast: React.FC<ToastProps> = ({ title, message, closeToast }) => {
  return (
    <>
      <div className="w-0 flex-1 flex items-center p-4 rounded-md">
        <div className="w-full">
          {!!title && <p className="text-sm leading-5 font-medium">{title}</p>}
          {!!message && <p className="mt-1 text-sm leading-5 text-color-secondary">{message}</p>}
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <div className="-ml-px flex flex-col">
          <div className="-mt-px h-0 flex-1 flex">
            <button
              onClick={closeToast as any}
              className="flex items-center justify-center w-full rounded-br-lg border border-transparent px-4 py-3 text-sm leading-5 font-medium hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
            >
              Zamknij
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
