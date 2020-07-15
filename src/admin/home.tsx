import * as ApiModel from '../API';

import { Heading, SectionHeading, SpinIcon } from '../components/ui';

import { EventCard } from './components/event-card';
import Helmet from 'react-helmet';
import React from 'react';
import { UserCard } from './components/user-card';
import { useQuery } from '../hooks/useQuery/useQuery';

const Page = () => {
  const [loadingUsers, errorUsers, users, refetchUsers] = useQuery<ApiModel.GetClientUsersQuery>(
    'getClientUsers',
    {} as ApiModel.GetClientUsersQueryVariables,
  );

  const [loadingEvents, errorEvents, events, refetchEvents] = useQuery<
    ApiModel.GetClientEventsQuery
  >('getClientEvents', {
    startDate: new Date().toISOString().slice(0, 10),
    limit: 3,
  } as ApiModel.GetClientEventsQueryVariables);

  return (
    <>
      <Helmet title="Admin Panel" />
      <div className="container mx-auto py-12">
        <Heading title="Admin Panel" />
        <SectionHeading title="Najblizsze wizyty" button={<SpinIcon spin={loadingEvents} />} />
        <div className="mt-8"></div>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {(events?.getClientEvents?.items || []).map(event => (
            <EventCard key={event.id} data={event} />
          ))}
        </ul>
        <div className="mt-8"></div>
        <SectionHeading title="Twoi podopieczni" button={<SpinIcon spin={loadingUsers} />} />
        <div className="mt-8"></div>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {(users?.getClientUsers || []).map(clientUser => (
            <UserCard key={clientUser.id} data={clientUser} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Page;
