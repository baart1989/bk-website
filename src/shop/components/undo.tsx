import React from 'react';

type UndoProps = { title: string; message: string; onUndo: () => void; closeToast?: Function };

export const Undo: React.FC<UndoProps> = ({ title, message, onUndo, closeToast }) => {
  const handleClick = () => {
    onUndo();
    closeToast ? closeToast() : undefined;
  };

  return (
    <>
      <div className="w-0 flex-1 flex items-center p-4 rounded-md">
        <div className="w-full">
          <p className="text-sm leading-5 font-medium text-color-1">{title}</p>
          <p className="mt-1 text-sm leading-5 text-color-default">{message}</p>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <div className="-ml-px flex flex-col">
          <div className="h-0 flex-1 flex border-b border-color-4">
            <button
              onClick={handleClick}
              className="-mb-px flex items-center justify-center w-full rounded-tr-lg border border-transparent px-4 py-3 text-sm leading-5 font-medium text-color-default hover:text-indigo-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-indigo-700 active:bg-gray-50 transition ease-in-out duration-150"
            >
              Cofnij
            </button>
          </div>
          <div className="-mt-px h-0 flex-1 flex">
            <button
              onClick={closeToast}
              className="flex items-center justify-center w-full rounded-br-lg border border-transparent px-4 py-3 text-sm leading-5 font-medium text-color-default hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
            >
              Zamknij
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
