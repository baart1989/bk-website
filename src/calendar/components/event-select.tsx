import * as ApiModel from '../../API';

import React, { useState } from 'react';

import { Check } from 'react-feather';
import { Transition } from 'react-tailwind-component';
import { eventTypeName } from '../utils';
import { useCalendar } from '../provider';

export const EventSelect = ({ setVisible, isVisible = false }) => {
  const eventOptions = Object.values(ApiModel.EventType).map(type => ({
    id: type,
    name: eventTypeName(type),
  }));

  const {
    bookEvent,
    calendar: { selectedEvent },
  } = useCalendar();
  return (
    <Transition
      show={isVisible}
      appear={isVisible}
      enter="transition ease-out duration-100 transform"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition ease-in duration-75 transform"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div className="flex flex-col">
        {eventOptions.map(eventType => (
          <div
            key={eventType.id}
            onClick={() => {
              setVisible(false);
              bookEvent({ ...selectedEvent, eventType: eventType.id });
            }}
            className="flex items-center cursor-pointer py-4 hover:bg-medium"
          >
            <div className="w-1/12 text-center">
              {selectedEvent.eventType === eventType.id && (
                <Check size="18" className="inline-flex" />
              )}
            </div>
            <div>{eventType.name}</div>
          </div>
        ))}
      </div>
    </Transition>
  );
};
