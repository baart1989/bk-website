import * as ApiModel from '../API';

import API, { graphqlOperation } from '@aws-amplify/api';
import { CalendarProviderComponent, useCalendar } from '../calendar/provider';
import { EventForm, WithEventForm } from '../calendar/components/event-form';
import React, { useCallback } from 'react';
import { SectionHeading, SpinIcon } from '../components/ui';
import { getCurrentUser, isLoggedIn } from '../utils/auth';

import { ActionButton } from '../shop/components/shop-ui';
import { EventDetails } from '../calendar/components/event-details';
import Helmet from 'react-helmet';
import { PageProps } from 'gatsby';
import { Toast } from '../components/toast';
import { mutations } from '../graphql';
import { toast } from 'react-toastify';
import { useAlert } from '../hooks/useAlert';
import { useFormikContext } from 'formik';

export const Appointment: React.FC<PageProps> = ({ navigate }) => {
  const { isSubmitting, handleSubmit, setSubmitting } = useFormikContext();
  const alert = useAlert();
  const {
    calendar: { selectedEvent },
  } = useCalendar();

  const loggedInUserBookEvent = useCallback(async () => {
    setSubmitting(true);
    const { sub } = getCurrentUser();
    const variables: ApiModel.AddEventMutationVariables = {
      input: {
        ...selectedEvent,
        userId: sub,
      },
    };
    try {
      await API.graphql(graphqlOperation(mutations.addEvent, variables));
      setSubmitting(false);
      toast(
        <Toast
          title="Twoja wizyta została potwierdzona"
          message="Potwierdzenie oraz dalsze instrukcje otrzymasz drogą mailową"
        />,
      );
      navigate('/app/home');
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      alert.showAlert({
        header: 'Coś poszło nie tak',
        message: 'Nie udało się dokonać rezerwacji, spróbuj ponownie',
      });
    }
  }, [selectedEvent]);

  return (
    <>
      <Helmet title="Umów wizytę" />
      <div className="container mx-auto py-12">
        <div className="title py-12 text-center">
          <h2 className="font-black text-5xl text-color-1">Umawianie wizyty</h2>
        </div>
        <SectionHeading
          title="Szczegóły wizyty"
          button={<ActionButton to="/calendar/" title="Zmień termin" />}
        />
        <EventDetails item={selectedEvent} />
        {!isLoggedIn() && <EventForm />}
        <SectionHeading
          button={
            <ActionButton
              type="button"
              onClick={event => {
                isLoggedIn() ? loggedInUserBookEvent() : handleSubmit(event);
              }}
              title="Zarezerwuj"
              iconRight={<SpinIcon spin={isSubmitting} />}
            />
          }
        />
      </div>
    </>
  );
};

export default function WithContext(props) {
  return (
    <CalendarProviderComponent>
      <WithEventForm>
        <Appointment {...props} />
      </WithEventForm>
    </CalendarProviderComponent>
  );
}
