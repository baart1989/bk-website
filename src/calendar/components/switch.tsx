import { ChevronLeft, ChevronRight } from 'react-feather';

import React from 'react';

export const SwitchDate = ({ nextCallback, previousCallback }) => {
  return (
    <span className="relative z-0 inline-flex">
      <button
        type="button"
        onClick={previousCallback}
        className="relative w-10 h-10 inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
        aria-label="Poprzedni"
      >
        <ChevronLeft />
      </button>
      <button
        type="button"
        onClick={nextCallback}
        className="-ml-px relative w-10 h-10 inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
        aria-label="Następny"
      >
        <ChevronRight />
      </button>
    </span>
  );
};
