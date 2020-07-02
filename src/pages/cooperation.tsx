import { ActionButton } from '../shop/components/shop-ui';
import Helmet from 'react-helmet';
import React from 'react';
import { SectionHeading } from '../components/ui';

export const Cooperation = () => {
  return (
    <>
      <Helmet title="Współpraca" />
      <div className="container mx-auto py-12">
        <div className="title py-12 text-center">
          <h2 className="font-black text-5xl text-color-1">Współpraca</h2>
        </div>
        <SectionHeading
          title="Oferta"
          button={<ActionButton to="/offer/" title="Zobacz ofertę" />}
        />
        <SectionHeading
          title="Zarezerwuj wizytę"
          button={<ActionButton to="/calendar/" title="Wybierz termin" />}
        />
      </div>
    </>
  );
};

export default Cooperation;
