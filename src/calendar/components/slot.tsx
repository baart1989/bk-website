import { isFuture, isPast } from 'date-fns';

import React from 'react';
import cns from 'classnames';
import { getHourSlot } from '../utils';
import { navigate } from 'gatsby';
import { useAlert } from '../../hooks/useAlert';
import { useCalendar } from '../provider';

type SlotProps = { data: Date };

export const Slot: React.FC<SlotProps> = ({ data }) => {
  const {
    bookedEvents,
    unavailable,
    bookEvent,
    calendar: { selectedEvent },
  } = useCalendar();

  const dateAsString = data.toISOString();
  const slotStart = getHourSlot(data);

  const isTaken = !!bookedEvents[dateAsString];
  const isAvailable = !bookedEvents[dateAsString] && !unavailable[dateAsString] && isFuture(data);
  const isUnavailable = !!unavailable[dateAsString];

  return (
    <div
      className={cns(
        'my-1 py-1 px-4',
        'border-2',
        { 'border-transparent': !isAvailable },
        { 'bg-secondary text-white cursor-pointer': isAvailable },
        { 'hover:bg-secondary-dark': isAvailable },
        { 'line-through': isTaken },
        { 'opacity-75': !isAvailable },
      )}
      onClick={() => {
        if (isAvailable) {
          bookEvent({ ...selectedEvent, startDate: dateAsString });
          navigate('/book-event/');
        }
      }}
    >
      <span className="w-full">{isUnavailable ? '-' : slotStart}</span>
    </div>
  );
};
