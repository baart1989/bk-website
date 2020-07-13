import * as Yup from 'yup';

import Auth, { CognitoUser } from '@aws-amplify/auth';
import React, { useState } from 'react';
import { answerCustomChallenge, isLoggedIn, setUser, singInOrSignUp } from '../utils/auth';

import { Formik } from 'formik';
import LoginForm from './components/login-form';
import { navigate } from 'gatsby';
import { useAlert } from '../hooks/useAlert';

export const Login: React.FC<{ path: string }> = () => {
  if (isLoggedIn()) navigate('/app/home');

  let cognitoUser: CognitoUser;
  const alert = useAlert();
  const [authType, setAuthType] = useState('signIn');
  const isLogin = authType === 'signIn';

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      const cognitoUserPromise = isLogin ? Auth.signIn(values.email) : singInOrSignUp(values);
      cognitoUser = await cognitoUserPromise;
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
      console.error(err);
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
            {isLogin && <>Zaloguj się na swoje konto</>}
            {!isLogin && <>Zarejestruj się</>}
          </h2>
          <div className="text-center">
            {isLogin && (
              <a
                onClick={() => setAuthType('signUp')}
                className="mt-2 text-center text-sm leading-5"
              >
                Nie posiadasz konta? {` `}
                <span className="link-secondary">Zarejestruj się</span>
              </a>
            )}
            {!isLogin && (
              <a
                onClick={() => setAuthType('signIn')}
                className="mt-2 text-center text-sm leading-5"
              >
                Masz juz konto? {` `}
                <span className="link-secondary">Zaloguj się</span>
              </a>
            )}
          </div>
        </div>
        <Formik
          initialValues={{ email: '', forename: '', surname: '' }}
          validationSchema={Yup.object({
            email: Yup.string()
              .required('Wprowadź prawidłowy adres email')
              .email('Wprowadź prawidłowy adres email'),
          })}
          onSubmit={onSubmit}
        >
          <LoginForm isLogin={isLogin} />
        </Formik>
      </div>
    </div>
  );
};

export default Login;
