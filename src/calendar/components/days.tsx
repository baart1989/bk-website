import React, { useMemo } from 'react';
import { getDays, now } from '../utils';
import { isPast, isSameDay, isSameMonth, isWeekend } from 'date-fns';

import Day from '../components/day';
import { useCalendar } from '../provider';

export const Days: React.FC<{ date: Date; week: Date }> = ({ date, week }) => {
  const {
    calendar: { selectedDay },
  } = useCalendar();

  const days = useMemo(() => getDays(week), [week]);
  return (
    <>
      <div className="flex flex-row border-1 border-t border-gray-200">
        {days.map((day, index) => (
          <Day
            key={index}
            day={day}
            isWeekend={isWeekend(day)}
            isSelected={isSameDay(day, selectedDay)}
            isPast={isPast(day)}
            isToday={isSameDay(day, now)}
            isCurrentMonth={isSameMonth(day, date)}
          />
        ))}
      </div>
    </>
  );
};

export default Days;
