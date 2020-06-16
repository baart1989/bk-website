import { CalendarProviderComponent } from '../calendar/provider';
import CalendarWeekly from '../calendar/weekly';
import Helmet from 'react-helmet';
import React from 'react';

export const Page = () => {
  return (
    <>
      <Helmet title="Kalendarz" />
      <div className="container mx-auto py-12">
        <div className="title py-12 text-center">
          <h2 className="font-black text-5xl text-color-1">Kalendarz</h2>
        </div>
        <div>
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
