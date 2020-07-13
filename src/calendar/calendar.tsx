import * as ApiModel from '../API';

import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api';
import { CalendarProviderComponent, useCalendar } from '../calendar/provider';
import { Heading, SectionHeading } from '../components/ui';
import React, { useCallback, useEffect, useState } from 'react';

import { ActionButton } from '../shop/components/shop-ui';
import CalendarWeekly from './components/weekly';
import { EventSelect } from './components/event-select';
import Helmet from 'react-helmet';
import { eventTypeName } from './utils';
import { queries } from '../graphql';

export const Page = () => {
  const {
    setEvents,
    calendar: { currentDate, selectedEvent },
  } = useCalendar();

  const fetchData = useCallback(async () => {
    try {
      // TODO - add end range
      const variables: ApiModel.GetClientEventsQueryVariables = { startDate: '2020' };
      const result = (await API.graphql(
        graphqlOperation(queries.getClientEvents, variables),
      )) as GraphQLResult<ApiModel.GetClientEventsQuery>;
      setEvents(result);
    } catch (err) {
      console.error(err);
    }
  }, [currentDate]);

  useEffect(() => {
    API.configure({
      aws_appsync_authenticationType: 'API_KEY',
    });

    return () => {
      API.configure({
        aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
      });
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const [isSelectVisible, setSelectVisible] = useState(false);

  return (
    <>
      <Helmet title="Zarezerwuj wizytę" />
      <div className="container mx-auto py-12">
        <Heading title="Zarezerwuj wizytę" />
        <SectionHeading
          title={`Rodzaj wizyty`}
          subtitle={`${eventTypeName(selectedEvent.eventType)}`}
          button={
            <ActionButton
              type="button"
              onClick={() => setSelectVisible(!isSelectVisible)}
              title="Zmień"
            />
          }
        />
        <EventSelect isVisible={isSelectVisible} setVisible={setSelectVisible} />
        <CalendarWeekly />
      </div>
    </>
  );
};

export default function PageWithContext() {
  return (
    <CalendarProviderComponent>
      <Page />
    </CalendarProviderComponent>
  );
}
