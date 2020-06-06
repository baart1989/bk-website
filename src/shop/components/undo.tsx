import React from 'react';

type UndoProps = { text: string; onUndo: () => void; closeToast?: Function };

export const Undo: React.FC<UndoProps> = ({ text, onUndo, closeToast }) => {
  const handleClick = () => {
    onUndo();
    closeToast ? closeToast() : undefined;
  };

  return (
    <div className="max-w-sm w-full bg-white shadow-lg rounded-sm pointer-events-auto">
      <div className="shadow-xs overflow-hidden">
        <div className="p-4">
          <div className="flex items-center">
            <div className="w-0 flex-1 flex justify-between">
              <p className="w-0 flex-1 text-sm leading-5 font-medium text-gray-900">{text}</p>
              <button
                onClick={handleClick}
                className="ml-3 flex-shrink-0 text-sm leading-5 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                Cofnij
              </button>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={() => closeToast()}
                className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
