import React, { useMemo } from 'react';
import { getPrettyDayOfWeek, getWorkingHours } from '../utils';

import { Slot } from './slot';
import { useCalendar } from '../provider';

const Slots: React.FC<{ day: Date }> = ({ day }) => {
  const { config } = useCalendar();
  const slots = useMemo(() => getWorkingHours(day, config), [day, config]);
  const [dayOfMonth, dayName] = getPrettyDayOfWeek(day).split(',');
  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="mt-2">{dayName}</div>
      <div className="my-1 text-sm font-thin">{dayOfMonth}</div>
      {slots.map((day, index) => (
        <Slot key={index} data={day} />
      ))}
    </div>
  );
};

export default Slots;
