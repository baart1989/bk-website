import { enGB, pl } from 'date-fns/locale';

import CalendarMonthly from '../calendar/monthly';
import { CalendarProviderComponent } from '../calendar/provider';
import CalendarWeekly from '../calendar/weekly';
import Helmet from 'react-helmet';
import React from 'react';
import { ViewType } from '../calendar/provider/reducer';

export const Page = () => {
  const [view, setView] = React.useState<ViewType>('weekly');
  return (
    <>
      <Helmet title="Kalendarz" />
      <div className="container mx-auto py-12">
        <div className="title py-12 text-center">
          <h2 className="font-black text-5xl text-color-1">Kalendarz</h2>
        </div>
        <div>
          <CalendarMonthly />
          <CalendarWeekly />
        </div>
      </div>
    </>
  );
};

export default function PageWithContext() {
  return (
    <CalendarProviderComponent>
      <Page />
    </CalendarProviderComponent>
  );
}
