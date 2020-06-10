import { TextInput, TextInputProps } from 'react-tailwind-component';

import React from 'react';
import cns from 'classnames';

export const Input: React.FC<TextInputProps & { required?: boolean; applyBorder?: boolean }> = ({
  applyBorder = true,
  label,
  placeholder,
  type = 'text',
  required = true,
  ...props
}) => {
  return (
    <div className="mt-6 sm:mt-5">
      <div
        className={cns('sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5', {
          'sm:border-t sm:border-gray-200': applyBorder,
        })}
      >
        {label ? (
          <label
            htmlFor={props.name || props.id}
            className="block text-sm font-medium leading-5 sm:mt-px sm:pt-2"
          >
            {label} {required ? '' : '(Opcjonalnie)'}
          </label>
        ) : null}
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <div className="w-full md:max-w-sm rounded-md">
            <TextInput
              aria-label={placeholder}
              className="bg-bg mt-1 form-input block w-full py-2 px-3 border border-color-4 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              type={type}
              placeholder={placeholder}
              aria-describedby={`${props.name}-optional}`}
              {...props}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
