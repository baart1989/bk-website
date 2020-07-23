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
  onClick?: (event?: any) => void;
  state?: any;
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
  state = {},
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

  let baseClass = `btn btn-primary`;

  if (className.indexOf('btn-secondary') !== -1) {
    baseClass = 'btn btn-secondary';
  }

  if (className.indexOf('btn-tertiary') !== -1) {
    baseClass = 'btn btn-tertiary';
  }

  if (type) {
    const b = type.split(',');
    const t = b[1] ? b[1] : 'button';
    const dis = disabled === undefined ? false : disabled;
    if (b[0] === 'button' || b[0] === 'submit') {
      return (
        <button
          type={t}
          disabled={dis}
          className={cns(className, baseClass, { disabled: dis })}
          {...rest}
        >
          {innerComponents}
        </button>
      );
    }
  }
  return (
    <Link to={to} className={cns(className, baseClass)} title={title} state={state}>
      {innerComponents}
    </Link>
  );
};

export const TextInput = ({
  label = '',
  type = 'text',
  name = '',
  onChange,
  footer = undefined,
}) => {
  const [focused, changeFocused] = useState(false);

  let elem = (
    <input
      type={type}
      name={name}
      className="block w-full outline-none px-4 py-2 focus:outline-none bg-bg"
      onFocus={() => changeFocused(true)}
      onBlur={() => changeFocused(false)}
      onChange={onChange}
      aria-label={name}
    />
  );

  if (type === 'textarea') {
    elem = (
      <textarea
        className="block w-full outline-none resize-none px-4 py-2 focus:outline-none bg-bg"
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
      className={cns('transition-all duration-300 py-3 lg:p-4 pb-6', {
        'input focused shadow-2xl': focused,
      })}
    >
      <p className="text-color-secondary">{label}</p>
      <div className="bg-primary p-2px rounded-sm">{elem}</div>
      {footer && <>{footer}</>}
    </div>
  );
};

export const Heading = ({ title }) => {
  return (
    <div className="title py-12 text-center">
      <h2 className="font-black text-5xl lg:text-6xl text-color-1">{title}</h2>
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

export const SectionHeading: React.FC<{
  title?: string;
  subtitle?: string;
  button?: JSX.Element;
}> = ({ title, subtitle, button }) => (
  <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
    <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">
      <div className="ml-4 mt-4">
        <h5 className="leading-6 font-medium">{title}</h5>
        {subtitle && <span className="text-lg">{subtitle}</span>}
      </div>
      <div className="ml-4 mt-4 flex-shrink-0">
        <span className="inline-flex rounded-md">{button}</span>
      </div>
    </div>
  </div>
);

export const ThemeIcons = ({ themes, currentTheme, switchTheme, className }) => {
  const themeOptions = Object.keys(themes).map(key => (
    <button
      key={themes[key].name}
      type="button"
      className={cns(
        className,
        'transition-transform duration-200 transform top-0 left-0',
        {
          'scale-100': key === currentTheme,
        },
        {
          'scale-0 absolute': key !== currentTheme,
        },
      )}
      onClick={switchTheme}
    >
      {themes[key].icon}
    </button>
  ));
  return <React.Fragment>{themeOptions}</React.Fragment>;
};
