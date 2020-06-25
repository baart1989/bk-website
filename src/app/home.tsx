import API, { graphqlOperation } from '@aws-amplify/api';
import React, { useCallback, useEffect, useState } from 'react';
import { isFuture, isPast } from 'date-fns';

import Helmet from 'react-helmet';
import { SectionHeading } from '../components/ui';
import { getCurrentUser } from '../utils/auth';
import { getPrettyDate } from '../calendar/utils';

export const getUserEvents = /* GraphQL */ `
  query GetUserEvents($userId: String!, $startDate: String!) {
    getUserEvents(userId: $userId, startDate: $startDate) {
      id
      userId
      clientId
      startDate
    }
  }
`;

export const Home = () => {
  const [eventsInPast, setPastEvents] = useState([]);
  const [eventsInFuture, setFutureEvents] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const { sub } = getCurrentUser();
      const queryParams = { userId: sub, startDate: '2020' };
      const result: any = await API.graphql(graphqlOperation(getUserEvents, queryParams));
      const { inPast, inFuture } = result.data.getUserEvents.reduce(
        (acc, next) => {
          isFuture(new Date(next.startDate))
            ? acc['inFuture'].unshift(next)
            : acc['inPast'].unshift(next);
          return acc;
        },
        { inPast: [] as any[], inFuture: [] as any[] },
      );
      setPastEvents(inPast);
      setFutureEvents(inFuture);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Helmet title="Strona startowa" />
      <div className="container mx-auto py-12">
        <div className="title py-12 text-center">
          <h2 className="font-black text-5xl text-color-1">Panel użytkownika</h2>
        </div>
        <section className="px-4 md:px-0">
          <SectionHeading title="Zaplanowane wizyty" />
          <div className="flex flex-col divide-y divide-gray-200">
            {eventsInFuture.map(item => (
              <div key={item.id} className="mt-6 shadow px-4 py-5 sm:rounded-lg sm:p-6">
                <h3 className="text-color-default">{getPrettyDate(new Date(item.startDate))}</h3>
                <div className="flex flex-wrap">
                  <div className="w-1/2 py-4">Specjalista: Anna Podsiadło</div>
                  <div className="w-1/2 py-4">Rodzaj wizyty: Rozmowa telefoniczna</div>
                  <div className="w-1/2 py-4">Czas trwania: 60min</div>
                  <div className="w-1/2 py-4">Status płatności: Zapłacone</div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="px-4 md:px-0">
          <SectionHeading title="Poprzednie wizyty" />
          <div className="flex flex-col divide-y divide-gray-200">
            {eventsInPast.map(item => (
              <div key={item.id} className="mt-6 shadow px-4 py-5 sm:rounded-lg sm:p-6">
                <h3 className="text-color-default">{getPrettyDate(new Date(item.startDate))}</h3>
                <div className="flex flex-wrap">
                  <div className="w-1/2 py-4">Specjalista: Anna Podsiadło</div>
                  <div className="w-1/2 py-4">Rodzaj wizyty: Rozmowa telefoniczna</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
