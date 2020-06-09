import { Check } from 'react-feather';
import React from 'react';

export const OfferCheckmark = ({ text }) => (
  <li className="flex items-start mt-4">
    <div className="flex-shrink-0">
      <Check className="text-green-500" />
    </div>
    <p className="ml-3 text-base leading-6 font-medium">{text}</p>
  </li>
);
