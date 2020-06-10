import { PageProps, graphql } from 'gatsby';

import { Heading } from '../components/ui';
import Layout from '../components/layout';
import Offer from './components/offer';
import { OfferListQuery } from './__generated__/OfferListQuery';
import React from 'react';

export const OfferList: React.FC<PageProps<OfferListQuery, {}>> = ({ data }) => {
  return (
    <Layout
      seo={{
        title: 'Oferta',
      }}
    >
      <div className="container mx-auto py-12">
        <Heading title="Diety" />
        <Offer data={data.allMdx.edges} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query OfferListQuery {
    allMdx(
      filter: { fields: { sourceName: { eq: "offer" } } }
      sort: { fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            price
            currency
            details
            description
            image {
              publicURL
              childImageSharp {
                fluid(maxWidth: 1920) {
                  srcSet
                  ...GatsbyImageSharpFluid
                }
                id
              }
            }
          }
        }
      }
    }
  }
`;

export default OfferList;
