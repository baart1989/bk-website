import * as ApiModel from '../API';

import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api';
import { CalendarProviderComponent, useCalendar } from '../calendar/provider';
import React, { useCallback, useEffect } from 'react';

import CalendarWeekly from './components/weekly';
import Helmet from 'react-helmet';
import { awsConfig } from '../../aws-exports';
import { queries } from '../graphql';

export const Page = () => {
  const {
    setEvents,
    calendar: { currentDate },
  } = useCalendar();

  const fetchData = useCallback(async () => {
    console.log('SELECTED_DATE: ', currentDate.toISOString());
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
      ...awsConfig,
      aws_appsync_authenticationType: 'API_KEY',
    });

    return () => {
      API.configure({
        ...awsConfig,
        aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
      });
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Helmet title="Kalendarz" />
      <div className="container mx-auto py-12">
        <div className="title py-12 text-center">
          <h2 className="font-black text-5xl text-color-1">Zarezerwuj wizytę</h2>
        </div>
        <div>
          <CalendarWeekly />
        </div>
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
