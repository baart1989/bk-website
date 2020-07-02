import { Col, Row } from '../components/shortcodes/index';
import { PageProps, graphql } from 'gatsby';

import { BlogQuery } from './__generated__/BlogQuery';
import { Calendar } from 'react-feather';
import Comments from '../components/comments';
import Img from 'gatsby-image';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';

export const BlogItem: React.FC<PageProps<BlogQuery, {}>> = ({ data }) => {
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
          <div className="relative bg-bg w-full lg:w-3/4 md:w-11/12 sm:w-full p-6 box-border lg:box-content mx-auto blog-wall-content shadow-xl md:-mt-16 ">
            <div className="p-3">
              <h1 className="text-5xl font-bold text-primary">{data.mdx.frontmatter.title}</h1>
              <p className="mt-1 flex">
                <Calendar /> <span className="ml-2">{data.mdx.frontmatter.date}</span>
              </p>
              <p className="mt-3">{data.mdx.frontmatter.description}</p>
            </div>
          </div>
        </div>
        <div className="lg:w-3/4 md:w-11/12 sm:w-full p-3 mx-auto mt-12 post-content">
          <MDXProvider components={{ Row, Col }}>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </MDXProvider>
        </div>
        <div className="comments mt-8">
          <Comments title={data.mdx.frontmatter.title} />
        </div>
      </div>
    </>
  );
};

export const query = graphql`
  query BlogQuery($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
        description
        image {
          publicURL
          childImageSharp {
            fluid(maxWidth: 200) {
              srcSet
              ...GatsbyImageSharpFluid
            }
            id
          }
        }
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

export default BlogItem;
