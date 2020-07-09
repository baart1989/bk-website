import * as ApiModel from '../API';

import { Heading, SectionHeading, SpinIcon } from '../components/ui';
import React, { useMemo } from 'react';
import { isFuture, isPast } from 'date-fns';

import { ErrorPanel } from '../components/error';
import { EventDetails } from './components/event-details';
import Helmet from 'react-helmet';
import { getCurrentUser } from '../utils/auth';
import { useQuery } from '../hooks/useQuery/useQuery';

const EventsSection: React.FC<{
  items: ApiModel.EventInput[];
  loading: boolean;
  title: string;
  inPast?: boolean;
}> = ({ items, inPast, loading, title }) => {
  return (
    <section className="px-4 md:px-0">
      <SectionHeading title={title} button={<SpinIcon spin={loading} />} />
      <div className="flex flex-col">
        {items.map(item => (
          <EventDetails key={item.id} item={item} inPast={inPast} />
        ))}
      </div>
    </section>
  );
};

export const UserEvents = () => {
  const { sub } = getCurrentUser();

  const variables: ApiModel.GetUserEventsQueryVariables = { userId: sub, startDate: '2020' };
  const [loading, error, result, refetch] = useQuery<ApiModel.GetUserEventsQuery>(
    'getUserEvents',
    variables,
  );

  const inFuture = useMemo(
    () => (result.getUserEvents || []).filter(event => isFuture(new Date(event.startDate))),
    [result],
  );

  const inPast = useMemo(
    () => (result.getUserEvents || []).filter(event => isPast(new Date(event.startDate))),
    [result],
  );

  const noPlannedEvents = !inFuture.length;

  if (error) {
    return <ErrorPanel text="Panel użytkownika" retryCallback={refetch} />;
  }

  return (
    <>
      <Helmet title="Panel użytkownika" />
      <div className="container mx-auto py-12">
        <Heading title="Panel użytkownika" />
        {noPlannedEvents && <SectionHeading title="Brak zaplanowanych wizyt" />}
        {!!inFuture.length && (
          <EventsSection title="Zaplanowane wizyty" items={inFuture} loading={loading} />
        )}
        <div className="py-4"></div>
        {!!inPast.length && (
          <EventsSection title="Odbyte wizyty" items={inPast} loading={loading} inPast={true} />
        )}
      </div>
    </>
  );
};

export default UserEvents;
