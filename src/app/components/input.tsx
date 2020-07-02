import { TextInput, TextInputProps } from 'react-tailwind-component';

import React from 'react';

export const Input: React.FC<TextInputProps> = ({ placeholder, type = 'text', ...props }) => {
  return (
    <div className="rounded-md">
      <TextInput
        aria-label={placeholder}
        className="bg-bg mt-4 form-input block w-full py-2 px-3 border border-color-3 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        type={type}
        placeholder={placeholder}
        aria-describedby={`${props.name}-optional}`}
        {...props}
      />
    </div>
  );
};

export default Input;
