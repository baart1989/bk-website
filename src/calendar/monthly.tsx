import React, { useMemo } from 'react';
import { getPrettyMonthTitle, getWeeks } from './utils';

import { Days } from './components/days';
import { SectionHeading } from '../components/ui';
import { SwitchDate } from './components/switch';
import { useCalendar } from './provider';

const MonthylCalendar = () => {
  const {
    nextMonth,
    previousMonth,
    calendar: { currentDate: date },
  } = useCalendar();

  const weeks = useMemo(() => getWeeks(date), [date]);
  return (
    <>
      <div className="container">
        <section className="px-4 md:px-0">
          <SectionHeading
            title={getPrettyMonthTitle(date)}
            button={<SwitchDate nextCallback={nextMonth} previousCallback={previousMonth} />}
          />
          <div>
            {weeks.map((week, index) => (
              <Days key={index} date={date} week={week} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default MonthylCalendar;
