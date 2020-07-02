import * as ApiModel from '../../API';
import * as Yup from 'yup';

import Auth, { CognitoUser } from '@aws-amplify/auth';
import { Formik, useFormikContext } from 'formik';

import Input from '../../components/input';
import React from 'react';
import { navigate } from 'gatsby';
import { setUser } from '../../utils/auth';
import { useAlert } from '../../hooks/useAlert';
import { useCalendar } from '../provider';

const mandatoryText = 'Pole jest obowiązkowe';

export const EventForm = () => {
  const { handleSubmit } = useFormikContext();
  return (
    <div className="mt-6 shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="mt-10 md:mt-5 md:col-span-1">
          <h3 className="text-lg font-medium leading-6">Dane odbiorcy</h3>
          <p className="mt-1 text-sm leading-5 text-color-3">
            Potrzbujemy Twoich danych żeby móc potwierdzić rezerwację.
          </p>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form
            onSubmit={event => {
              event.preventDefault();
              handleSubmit(event);
            }}
          >
            <Input
              aria-label="Imię"
              label="Imię"
              name="forename"
              placeholder="Imię"
              applyBorder={false}
            />
            <Input aria-label="Nazwisko" label="Nazwisko" name="surname" placeholder="Nazwisko" />
            <Input
              aria-label="Email"
              label="Email"
              name="email"
              type="email"
              placeholder="abc@example.com"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export const WithEventForm = ({ children }) => {
  let cognitoUser: CognitoUser;
  const alert = useAlert();
  const {
    calendar: { selectedEvent },
  } = useCalendar();

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      cognitoUser = await Auth.signIn(values.email);
      alert.showAlert({
        header: 'Wprowadź kod jednorazowy',
        message: 'Potwierdź wizytę kodem jednorazowym który wysłaliśmy na Twojego maila',
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
              const isSuccess = await answerCustomChallenge(code, cognitoUser, selectedEvent);
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
        message: 'Rezerwacja się nie powiodła, spróbuj ponownie później',
      });
    }
  };

  return (
    <>
      <Formik
        initialValues={{ forename: '', surname: '', email: '' }}
        validationSchema={Yup.object({
          forename: Yup.string().optional(mandatoryText),
          surname: Yup.string().optional(mandatoryText),
          email: Yup.string()
            .required(mandatoryText)
            .email('Wprowadź prawidłowy adres email'),
        })}
        onSubmit={onSubmit}
      >
        {children}
      </Formik>
    </>
  );
};

export async function answerCustomChallenge(
  answer: string,
  cognitoUser: CognitoUser,
  eventData: ApiModel.EventInput,
) {
  try {
    // Send the answer to the User Pool
    // This will throw an error if it’s the 3rd wrong answer
    await Auth.sendCustomChallengeAnswer(cognitoUser, answer, eventData as any);
    // It we get here, the answer was sent successfully,
    // but it might have been wrong (1st or 2nd time)
    // So we should test if the user is authenticated now
    // This will throw an error if the user is not yet authenticated:
    const user = await Auth.currentAuthenticatedUser();
    const userInfo = {
      ...user.attributes,
      username: user.username,
    };
    setUser(userInfo);
    return true;
  } catch (err) {
    console.error('Apparently the user did not enter the right code: ', err);
    return false;
  }
}
