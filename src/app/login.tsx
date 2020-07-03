import * as Yup from 'yup';

import Auth, { CognitoUser } from '@aws-amplify/auth';
import { answerCustomChallenge, isLoggedIn, setUser } from '../utils/auth';

import { Formik } from 'formik';
import LoginForm from './components/login-form';
import React from 'react';
import { navigate } from 'gatsby';
import { useAlert } from '../hooks/useAlert';

export const Login: React.FC<{ path: string }> = () => {
  if (isLoggedIn()) navigate('/app/home');
  // const onSubmit = async (values, { setSubmitting }) => {
  //   const { email: username, password } = values;
  //   try {
  //     setSubmitting(true);
  //     const { attributes } = await Auth.signIn(username, password);
  //     setSubmitting(false);
  //     const userInfo = { ...attributes, username };
  //     setUser(userInfo);
  //     navigate('/app/home');
  //   } catch (err) {
  //     setSubmitting(false);
  //     console.log('error...: ', err);
  //   }
  // };

  let cognitoUser: CognitoUser;
  const alert = useAlert();

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      cognitoUser = await Auth.signIn(values.email);
      alert.showAlert({
        header: 'Wprowadź kod jednorazowy',
        message: 'Wpisz ponizej kod jednorazowy który wysłaliśmy na Twojego maila',
        inputs: [
          {
            label: 'Kod weryfikacyjny',
            name: 'code',
            type: 'number',
          },
        ],
        buttons: [
          {
            text: 'Dalej',
            role: 'confirm',
            handler: async ({ code }) => {
              setSubmitting(true);
              const isSuccess = await answerCustomChallenge(code, cognitoUser);
              if (isSuccess) {
                setSubmitting(false);
                navigate('/app/home');
                return;
              }
              setSubmitting(false);
              alert.showAlert({
                header: 'Coś poszło nie tak',
                message: 'Upewnij się, że wprowadzony kod jest prawidłowy i spróbuj ponownie',
              });
            },
          },
          { role: 'cancel', text: 'Anuluj' },
        ],
      });
    } catch (err) {
      setSubmitting(false);
      alert.showAlert({
        header: 'Coś poszło nie tak',
        message: 'Spróbuj ponownie później',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-12 md:mt-24 text-center text-3xl leading-9 font-extrabold">
            Zaloguj się na swoje konto
          </h2>
          <p className="mt-2 text-center text-sm leading-5">
            Nie posiadasz konta? {` `}
            <span className="link-secondary">Wprowadź swój adres email</span>
          </p>
        </div>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={Yup.object({
            email: Yup.string()
              .required('Wprowadź prawidłowy adres email')
              .email('Wprowadź prawidłowy adres email'),
          })}
          onSubmit={onSubmit}
        >
          <LoginForm />
        </Formik>
      </div>
    </div>
  );
};

export default Login;
