import { Button, SpinIcon } from '../../components/ui';

import Input from './input';
import { Link } from 'gatsby';
import React from 'react';
import { useFormikContext } from 'formik';

export const Form = () => {
  const { handleSubmit, isSubmitting } = useFormikContext();
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        handleSubmit(event as any);
      }}
    >
      <div className="mt-6 flex flex-col">
        <Input name="email" placeholder="Adres email" autoComplete="username" />
      </div>
      <div className="mt-6">
        <Button
          type="button"
          title="Dalej"
          iconRight={<SpinIcon spin={isSubmitting} />}
          onClick={event => handleSubmit(event)}
          className="btn-secondary w-full flex justify-center border border-transparent text-sm leading-5 font-medium rounded-md"
        />
      </div>
    </form>
  );
};

export default Form;
