import React from 'react';
import { getHourSlot } from '../utils';

type SlotProps = { data: Date };

export const Slot: React.FC<SlotProps> = ({ data }) => {
  const slotStart = getHourSlot(data);
  return (
    <div
      className="bg-teal-500 hover:bg-teal-700 text-white border border-2 my-1 py-1 px-4"
      onClick={() => undefined}
    >
      {slotStart}
    </div>
  );
};
