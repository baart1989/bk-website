import React from 'react';
import cns from 'classnames';
import { getDayNumber } from '../utils';
import { useCalendar } from '../provider';

type DayProps = {
  day: Date;
  isSelected: boolean;
  isToday: boolean;
  isCurrentMonth: boolean;
  isWeekend: boolean;
  isPast: boolean;
};

const Day: React.FC<DayProps> = ({ day, isSelected, isToday, isCurrentMonth, isWeekend }) => {
  const { selectDay } = useCalendar();
  return (
    <>
      <div
        className={cns(
          'border-1 border-l border-gray-200',
          'flex flex-1',
          'w-16 h-16',
          'md:w-32 md:h-32',
          { 'bg-primary text-bg font-semibold': isSelected },
          { 'opacity-25': !isCurrentMonth },
          { 'bg-blue-400': isToday },
          { 'bg-secondary': isWeekend },
        )}
        style={{
          cursor: 'pointer',
          transition: 'all .2s',
        }}
        onClick={() => selectDay(day)}
      >
        <div className="columns">
          <div className="column is-2">
            <span className="pl-2 pt-2 text-xl">{getDayNumber(day)}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Day;
