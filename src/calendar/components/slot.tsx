import React from 'react';
import cns from 'classnames';
import { getHourSlot } from '../utils';
import { navigate } from 'gatsby';
import { useAlert } from '../../hooks/useAlert';
import { useCalendar } from '../provider';

type SlotProps = { data: Date };

export const Slot: React.FC<SlotProps> = ({ data }) => {
  const { bookedEvents, unavailable, bookEvent } = useCalendar();

  const dateAsString = data.toISOString();
  const slotStart = getHourSlot(data);

  const isTaken = !!bookedEvents[dateAsString];
  const isAvailable = !bookedEvents[dateAsString] && !unavailable[dateAsString];
  const isUnavailable = !!unavailable[dateAsString];
  const alert = useAlert();

  return (
    <div
      className={cns(
        'my-1 py-1 px-4',
        'border-2',
        { 'border-transparent': !isAvailable },
        { 'bg-teal-500 text-white cursor-pointer': isAvailable },
        { 'hover:bg-teal-700': isAvailable },
        { 'line-through': isTaken },
        { 'opacity-75': !isAvailable },
      )}
      onClick={() => {
        if (isAvailable) {
          alert.showAlert({
            header: 'Umówić wizytę?',
            buttons: [
              {
                text: 'Zarezerwuj',
                role: 'confirm',
                handler: () => {
                  bookEvent(dateAsString);
                  navigate('/book-event/');
                },
              },
              { text: 'Anuluj', role: 'cancel' },
            ],
          });
        }
      }}
    >
      <span className="w-full">{isUnavailable ? '-' : slotStart}</span>
    </div>
  );
};