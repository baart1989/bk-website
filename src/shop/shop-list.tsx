import { PageProps, graphql } from 'gatsby';

import { Heading } from '../components/ui';
import Layout from '../components/layout';
import React from 'react';
import ShopCard from './components/shop-card';
import { ShopListQuery } from './__generated__/ShopListQuery';

export const ShopList: React.FC<PageProps<ShopListQuery, {}>> = ({ data }) => {
  const ebookList = data.shop.edges
    .filter(item => item.node.frontmatter.type === 'ebook')
    .map(item => <ShopCard key={item.node.id} data={item.node} />);

  const dietList = data.shop.edges
    .filter(item => item.node.frontmatter.type === 'diet')
    .map(item => <ShopCard key={item.node.id} data={item.node} />);

  return (
    <Layout
      seo={{
        title: 'Sklep',
      }}
    >
      <div className="container mx-auto py-12">
        <Heading title="Sklep" />
        <h4 className="text-color-default">Diety</h4>
        <div className="flex flex-wrap">{dietList}</div>
        <h4 className="text-color-default">Ebooki</h4>
        <div className="flex flex-wrap">{ebookList}</div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query ShopListQuery {
    shop: allMdx(
      filter: { fields: { sourceName: { eq: "shop" } } }
      sort: { fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          excerpt
          frontmatter {
            title
            price
            currency
            type
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

export default ShopList;
