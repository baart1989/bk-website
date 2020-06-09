import { OfferListQuery_allMdx_edges } from '../__generated__/OfferListQuery';
import OfferMain from './offer-main';
import OfferStandard from './offer-standard';
import React from 'react';

export const Offer: React.FC<{ data: OfferListQuery_allMdx_edges[] }> = ({ data }) => {
  return (
    <>
      <div className="text-center">
        <p className="mt- text-3xl leading-9 font-extrabold text-primary sm:text-4xl sm:leading-10 lg:text-5xl lg:leading-none">
          Indywidualne plany odżywiania
        </p>
        <p className="mt-3 max-w-4xl mx-auto text-xl leading-7 sm:mt-5 sm:text-2xl sm:leading-8">
          Plan odżywiania indywidualnie dopasowane do Twojego celu, stanu zdrowia, aktywności i
          preferencji
        </p>
      </div>
      <div className="mt-16 pb-12 lg:mt-20 lg:pb-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-7">
            <OfferStandard key={data[0].node.id} {...data[0].node} position="left" />
            <OfferMain key={data[1].node.id} {...data[1].node} />
            <OfferStandard key={data[2].node.id} {...data[2].node} position="right" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Offer;
