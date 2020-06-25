import React, { useMemo } from 'react';
import { isPast, isSameDay, isSameMonth, isWeekend } from 'date-fns';

import Day from '../components/day';
import { getDays } from '../utils';
import { useCalendar } from '../provider';

export const Days: React.FC<{ date: Date; week: Date }> = ({ date, week }) => {
  const {
    calendar: { currentDate },
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
            isSelected={isSameDay(day, currentDate)}
            isPast={isPast(day)}
            isToday={isSameDay(day, new Date())}
            isCurrentMonth={isSameMonth(day, date)}
          />
        ))}
      </div>
    </>
  );
};

export default Days;
