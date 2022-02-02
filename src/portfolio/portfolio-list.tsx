import { PageProps, graphql } from 'gatsby';
import React, { useEffect } from 'react';

import Helmet from 'react-helmet';
import { PaginatedPageContext } from '../../gatsby-node';
import Pagination from '../components/pagination';
import PortfolioCard from './components/portfolio-card';
import { PortfolioListQuery } from './__generated__/PortfolioListQuery';

export const PortfolioList: React.FC<PageProps<PortfolioListQuery, PaginatedPageContext>> = ({
  data,
  pageContext,
}) => {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('scroll'));
  }, []);

  const portfolioItems = data.allMdx.edges.map((item, i) => (
    <PortfolioCard data={item.node} key={item.node.id} even={(i + 1) % 2 === 0} />
  ));

  return (
    <>
      <Helmet title="Realizacje" />
      <div className="container mx-auto py-12 px-4 lg:px-0">
        <div className="title py-8 text-center">
          <h2 className="font-black text-5xl lg:text-6xl text-color-1">Realizacje</h2>
        </div>
        <div className="flex flex-wrap">{portfolioItems}</div>
        <div className="mt-8 lg:mt-24">
          <Pagination pageContext={pageContext} type="portfolio" />
        </div>
      </div>
    </>
  );
};

export const query = graphql`
  query PortfolioListQuery($skip: Int!, $limit: Int!) {
    allMdx(
      filter: { fields: { sourceName: { eq: "portfolio" } } }
      sort: { fields: [frontmatter___order], order: ASC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            description
            image: banner {
              publicURL
              childImageSharp {
                id
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default PortfolioList;
