import { Col, Row } from '../components/shortcodes';
import { PageProps, graphql } from 'gatsby';

import Img from 'gatsby-image';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { PortfolioQuery } from './__generated__/PortfolioQuery';
import React from 'react';

export default function PortfolioItem({ data }: PageProps<PortfolioQuery, {}>) {
  // seo={{
  //   title: data.mdx.frontmatter.title,
  //   description: data.mdx.frontmatter.description,
  //   image: data.mdx.frontmatter.banner.publicURL,
  // }}
  return (
    <>
      <div className="md:px-4 py-32 md:w-11/12 mx-auto">
        <div className="mx-auto relative">
          <Img fluid={data.mdx.frontmatter.banner.childImageSharp.fluid} />
          <div className="flex items-center justify-center relative lg:absolute w-full h-full top-0 left-0">
            <div className="hidden lg:block absolute w-full h-full bg-black opacity-50"></div>
            <div className="px-4 py-8 lg:p-0 relative z-10 text-center lg:text-white bg-bgalt lg:bg-transparent">
              <h2 className="font-bold text-color-1 lg:text-white">{data.mdx.frontmatter.title}</h2>
              <h3 className="text-color-1 lg:text-white">
                Inwestor: {data.mdx.frontmatter.investor}
              </h3>
              <p className="mt-1 flex items-center justify-center">
                Data realizacji: {data.mdx.frontmatter.date}
              </p>
              <p className="mt-1 flex items-center justify-center">
                Adres: {data.mdx.frontmatter.address}
              </p>
            </div>
          </div>
        </div>
        <div className="lg:w-3/4 md:w-11/12 sm:w-full p-3 mt-4 md:mt-6 mx-auto lg:mt-12">
          <div className="boxed">
            <div className="px-4 pb-20 text-center lg:py-40 lg:px-0">
              <p className="mt-5 text-lg">{data.mdx.frontmatter.description}</p>
            </div>
          </div>
          <MDXProvider components={{ Row, Col }}>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </MDXProvider>
        </div>
      </div>
    </>
  );
}

export const query = graphql`
  query PortfolioQuery($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        address
        investor
        date(formatString: "YYYY")
        description
        banner {
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
`;
