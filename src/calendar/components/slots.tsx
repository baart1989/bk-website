import React, { useMemo } from 'react';
import { getHours, getPrettyDayOfWeek } from '../utils';

import { Slot } from './slot';

const Slots: React.FC<{ day: Date }> = ({ day }) => {
  const slots = useMemo(() => getHours(day), [day]);
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
