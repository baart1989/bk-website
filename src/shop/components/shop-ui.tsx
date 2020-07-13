import { Button, ButtonProps } from '../../components/ui';

import React from 'react';
import cns from 'classnames';

export const PriceLabel = ({ value, currency }) => (
  <p className="font-semibold tracking-tighter uppercase">{`${currency} ${' '} ${value}`}</p>
);

export const ActionButton: React.FC<ButtonProps> = props => {
  const baseClass = props.type === 'submit' ? 'btn-tertiary' : 'btn-primary';
  return (
    <Button
      className={cns(
        baseClass,
        'px-3 lg:px-6',
        'relative inline-flex items-center text-sm leading-5 font-medium rounded-md',
      )}
      {...props}
    />
  );
};
