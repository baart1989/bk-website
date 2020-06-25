import * as Yup from 'yup';

import { Formik, useFormikContext } from 'formik';
import { Link, navigate } from 'gatsby';
import { isLoggedIn, setUser } from '../utils/auth';

import Auth from '@aws-amplify/auth';
import { Button } from '../components/ui';
import { Checkbox } from 'react-tailwind-component';
import Input from './components/input';
import React from 'react';
import { SpinIcon } from '../components/ui';

const WelcomeSection = () => (
  <div>
    <h2 className="mt-12 md:mt-24 text-center text-3xl leading-9 font-extrabold text-gray-900">
      Zaloguj się na swoje konto
    </h2>
    <p className="mt-2 text-center text-sm leading-5 text-gray-600">
      albo {` `}
      <a
        href="#"
        className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
      >
        rozpocznij 14-dniowy okres próbny
      </a>
    </p>
  </div>
);

const Form = () => {
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
        <Input
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Hasło"
        />
      </div>
      <div className="mt-6 flex justify-end">
        <div className="text-sm leading-5">
          <Link
            to="/reset-password/"
            className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            Zapomniałeś hasła?
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <Button
          type="button"
          title="Zaloguj się"
          iconRight={<SpinIcon spin={isSubmitting} />}
          onClick={event => handleSubmit(event)}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
        />
      </div>
    </form>
  );
};

export const Login: React.FC<{ path: string }> = () => {
  if (isLoggedIn()) navigate('/app/home');
  return (
    <div className="min-h-screen flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <WelcomeSection />
        <Formik
          initialValues={{
            email: '',
            password: '',
            remember: false,
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .required('Pole jest obowiązkowe')
              .email('Wprowadź prawidłowy adres email'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            const { email: username, password } = values;
            try {
              setSubmitting(true);
              const { attributes } = await Auth.signIn(username, password);
              setSubmitting(false);
              const userInfo = { ...attributes, username };
              setUser(userInfo);
              navigate('/app/home');
            } catch (err) {
              setSubmitting(false);
              console.log('error...: ', err);
            }
          }}
        >
          <Form />
        </Formik>
      </div>
    </div>
  );
};

export default Login;
