import { Heading, SectionHeading } from '../components/ui';

import { ActionButton } from '../shop/components/shop-ui';
import Helmet from 'react-helmet';
import React from 'react';

export const Cooperation = () => {
  return (
    <>
      <Helmet title="Współpraca" />
      <div className="container mx-auto py-12">
        <Heading title="Współpraca" />
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
