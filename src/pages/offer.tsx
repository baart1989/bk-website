import { PageProps, graphql } from 'gatsby';

import { Heading } from '../components/ui';
import Helmet from 'react-helmet';
import { OfferQuery } from './__generated__/OfferQuery';
import { Projects } from '../components/bk';
import React from 'react';

export const Offer: React.FC<PageProps<OfferQuery>> = ({ data }) => {
  const {
    site: {
      siteMetadata: { offerText },
    },
  } = data;
  return (
    <>
      <Helmet title="Oferta" />
      <div className="container mx-auto pt-12 pb-48">
        <div className="boxed">
          <div className="px-4 pb-20 text-center lg:py-40 lg:px-0">
            <Heading title="Oferta" />
            <p className="mt-5 text-lg">{offerText}</p>
          </div>
        </div>
        <Projects />
      </div>
    </>
  );
};

export const query = graphql`
  query OfferQuery {
    site {
      siteMetadata {
        offerText
      }
    }
  }
`;

export default Offer;
