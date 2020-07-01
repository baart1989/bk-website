import React, { useMemo } from 'react';
import { getWeekDays, isCurrentWeek } from '../utils';

import { SectionHeading } from '../../components/ui';
import Slots from '../components/slots';
import { SwitchDate } from '../components/switch';
import { useCalendar } from '../provider';

export const WeeklyCalendar = () => {
  const {
    nextWeek,
    previousWeek,
    calendar: { currentDate },
  } = useCalendar();

  const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate]);
  return (
    <>
      <div className="container">
        <section className="px-4 md:px-0">
          <SectionHeading
            title="Wybierz termin"
            button={
              <SwitchDate
                previousDisabled={isCurrentWeek(currentDate)}
                previousCallback={previousWeek}
                nextCallback={nextWeek}
              />
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
