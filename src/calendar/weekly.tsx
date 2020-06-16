import React, { useMemo } from 'react';

import { SectionHeading } from '../components/ui';
import Slots from './components/slots';
import { SwitchDate } from './components/switch';
import { getWeekDays } from './utils';
import { useCalendar } from './provider';

export const WeeklyCalendar = () => {
  const {
    nextWeek,
    previousWeek,
    calendar: { currentDate: date },
  } = useCalendar();

  const weekDays = useMemo(() => getWeekDays(date), [date]);
  return (
    <>
      <div className="container">
        <section className="px-4 md:px-0">
          <SectionHeading
            title="Wybierz termin"
            button={
              <SwitchDate previousCallback={() => previousWeek()} nextCallback={() => nextWeek()} />
            }
          />
          <div className="flex">
            {weekDays.map((day, index) => (
              <Slots key={index} day={day} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default WeeklyCalendar;
