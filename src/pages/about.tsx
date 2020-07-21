import { PageProps, graphql } from 'gatsby';

import { AboutQuery } from './__generated__/AboutQuery';
import { Heading } from '../components/ui';
import Helmet from 'react-helmet';
import React from 'react';
import { Team } from '../components/bk';

export const About: React.FC<PageProps<AboutQuery>> = ({ data }) => {
  const {
    site: {
      siteMetadata: { aboutText },
    },
  } = data;
  return (
    <>
      <Helmet title="O nas" />
      <div className="container mx-auto py-12">
        <div className="boxed">
          <div className="px-4 pb-20 text-center lg:py-40 lg:px-0">
            <Heading title="O nas" />
            <p className="mt-5 text-lg">{aboutText}</p>
          </div>
        </div>
        <Heading title="Nasz zespół" />
        <Team />
      </div>
    </>
  );
};

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        aboutText
      }
    }
  }
`;

export default About;
