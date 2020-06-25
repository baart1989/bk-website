import React from 'react';
import { getPrettyDate } from '../utils';
import { useCalendar } from '../provider';

export const EventDetails = () => {
  const {
    calendar: { selectedEvent },
  } = useCalendar();

  if (!selectedEvent) return null;

  const { startDate, clientName, eventType, duration, paymentType } = selectedEvent;
  return (
    <div className="mt-6 shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <h3 className="text-color-default">{getPrettyDate(new Date(startDate))}</h3>
      <div className="flex flex-wrap">
        <div className="w-1/2 py-4">Specjalista: {clientName}</div>
        <div className="w-1/2 py-4">Rodzaj wizyty: {eventType}</div>
        <div className="w-1/2 py-4">Czas trwania: {duration}min</div>
        <div className="w-1/2 py-4">Typ płatności: {paymentType}</div>
      </div>
    </div>
  );
};
