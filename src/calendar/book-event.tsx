import * as ApiModel from '../API';

import API, { graphqlOperation } from '@aws-amplify/api';
import { CalendarProviderComponent, useCalendar } from '../calendar/provider';
import { EventForm, WithEventForm } from '../calendar/components/event-form';
import { Heading, SectionHeading, SpinIcon } from '../components/ui';
import React, { useCallback, useState } from 'react';
import { getCurrentUser, isLoggedIn } from '../utils/auth';

import { ActionButton } from '../shop/components/shop-ui';
import { EventDetails } from '../calendar/components/event-details';
import { EventSelect } from './components/event-select';
import Helmet from 'react-helmet';
import { PageProps } from 'gatsby';
import { Toast } from '../components/toast';
import { eventTypeName } from './utils';
import { mutations } from '../graphql';
import { toast } from 'react-toastify';
import { useAlert } from '../hooks/useAlert';
import { useFormikContext } from 'formik';

export const Appointment: React.FC<PageProps> = ({ navigate }) => {
  const { isSubmitting, handleSubmit, setSubmitting } = useFormikContext();
  const [isSelectVisible, setSelectVisible] = useState(false);
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
        <Heading title="Umawianie wizyty" />
        <SectionHeading
          title={`Rodzaj wizyty`}
          subtitle={`${eventTypeName(selectedEvent.eventType)}`}
          button={
            <ActionButton
              type="button"
              onClick={() => setSelectVisible(!isSelectVisible)}
              title="Zmień rodzaj"
            />
          }
        />
        <SectionHeading button={<ActionButton to="/calendar/" title="Zmień termin" />} />
        <EventSelect isVisible={isSelectVisible} setVisible={setSelectVisible} />
        <EventDetails item={selectedEvent} />
        {!isLoggedIn() && <EventForm />}
        <SectionHeading
          title=" "
          button={
            <ActionButton
              type="submit"
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
