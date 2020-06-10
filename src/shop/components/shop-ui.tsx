import { Button, ButtonProps } from '../../components/ui';

import React from 'react';

export const PriceLabel = ({ value, currency }) => (
  <p className="font-semibold tracking-tighter uppercase">{`${currency} ${' '} ${value}`}</p>
);

export const ActionButton: React.FC<ButtonProps> = props => (
  <Button
    className="relative inline-flex items-center text-sm leading-5 font-medium rounded-md"
    {...props}
  />
);

export const SectionHeading = ({ title, button }) => (
  <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
    <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">
      <div className="ml-4 mt-4">
        <h5 className="leading-6 text-color-default font-medium">{title}</h5>
      </div>
      <div className="ml-4 mt-4 flex-shrink-0">
        <span className="inline-flex rounded-md">{button}</span>
      </div>
    </div>
  </div>
);
