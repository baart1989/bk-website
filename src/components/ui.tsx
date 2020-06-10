import React, { useState } from 'react';

import { Link } from './utils';
import { Loader } from 'react-feather';
import cns from 'classnames';

export type ButtonProps = {
  title: string;
  to?: string;
  type?: any;
  disabled?: boolean;
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  full?: boolean;
  className?: string;
  onClick?: () => void;
};
export const Button: React.FC<ButtonProps> = ({
  title,
  to,
  type,
  disabled,
  full,
  className = '',
  iconLeft,
  iconRight,
  ...rest
}) => {
  if (full) {
    className = cns(className, 'w-full justify-center');
  }

  const innerComponents = (
    <React.Fragment>
      {iconLeft && <span className="icon icon-left">{iconLeft}</span>}
      <span>{title}</span>
      {iconRight && <span className="icon icon-right">{iconRight}</span>}
    </React.Fragment>
  );

  if (type) {
    const b = type.split(',');
    const t = b[1] ? b[1] : 'button';
    const dis = disabled === undefined ? false : disabled;
    if (b[0] === 'button') {
      return (
        <button
          type={t}
          disabled={dis}
          className={cns(className, `btn btn-primary`, { disabled: dis })}
          {...rest}
        >
          {innerComponents}
        </button>
      );
    }
  }
  return (
    <Link to={to} className={cns(className, `btn btn-primary`)} title={title}>
      {innerComponents}
    </Link>
  );
};

export const TextInput = ({ label, type = 'text', name, onChange, footer }) => {
  const [focused, changeFocused] = useState(false);

  let elem = (
    <input
      type={type}
      name={name}
      className="block w-full outline-none px-4 py-2 focus:outline-none bg-bg text-color-default"
      onFocus={() => changeFocused(true)}
      onBlur={() => changeFocused(false)}
      onChange={onChange}
      aria-label={name}
    />
  );

  if (type === 'textarea') {
    elem = (
      <textarea
        className="block w-full outline-none resize-none px-4 py-2 focus:outline-none bg-bg text-color-default"
        name={name}
        onChange={event => {
          event.target.style.height = 'auto';
          event.target.style.height = event.target.scrollHeight + 'px';

          onChange(event);
        }}
        onFocus={() => changeFocused(true)}
        onBlur={() => changeFocused(false)}
        aria-label={name}
      />
    );
  }

  return (
    <div
      className={`${
        focused ? 'input focused shadow-2xl' : ''
        } transition - all duration - 300 py - 3 lg: p - 4 pb - 6`}
    >
      <p className="text-color-3">{label}</p>
      <div className="bg-gradient-primary p-2px">{elem}</div>
      {footer && <>{footer}</>}
    </div>
  );
};

export const Heading = ({ title }) => {
  return (
    <div className="title py-12 text-center">
      <h2 className="font-black text-5xl text-color-1">{title}</h2>
    </div>
  );
};

export const SpinIcon = ({ spin = false }) => {
  if (spin) {
    return (
      <span
        className="spin"
        style={{
          display: 'inline-block',
          verticalAlign: 'middle',
          animationDuration: '5s',
        }}
      >
        <Loader />
      </span>
    );
  }
  return null;
};
