import React, { useState } from 'react';
import { useField, useFormikContext } from 'formik';

import cns from 'classnames';

type AdditionalProps = {
  label: string;
  applyBorder?: boolean;
  required?: boolean;
};

type TextInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  AdditionalProps;

export const Input: React.FC<TextInputProps> = ({
  label,
  placeholder,
  type = 'text',
  ...props
}) => {
  const { handleChange, setFieldValue, handleBlur } = useFormikContext();

  const onChange = event => {
    if (type === 'file') {
      const [file] = event.target.files;
      setFieldValue('file', file);
    }
    handleChange(event);
  };
  const [focused, changeFocused] = useState(false);
  const [field, meta] = useField(props.id || props.name);
  const hasError = meta.touched && meta.error;
  return (
    <>
      <div
        className={cns('transition-all duration-300 py-3 lg:p-4 pb-6', {
          'input focused shadow-2xl': focused,
        })}
      >
        <label htmlFor={props.id || props.name} className="text-color-secondary">
          {label}
        </label>
        <div className="bg-gradient-primary p-2px">
          <input
            aria-label={placeholder}
            placeholder={placeholder}
            aria-describedby={props.name}
            className="block w-full outline-none px-4 py-2 focus:outline-none bg-bg"
            type={type}
            onChange={onChange}
            {...field}
            {...props}
            onFocus={() => changeFocused(true)}
            onBlur={event => {
              handleBlur(event as any);
              changeFocused(false);
            }}
          />
        </div>
        {hasError && <div className="text-sm pt-2">{meta.error}</div>}
      </div>
    </>
  );
};

export default Input;
