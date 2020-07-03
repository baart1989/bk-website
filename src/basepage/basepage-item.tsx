import { PageProps, graphql } from 'gatsby';

import { BasePagesQuery } from './__generated__/BasePagesQuery';
import { Heading } from '../components/ui';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';

export default function BasePageItem({ data }: PageProps<BasePagesQuery, {}>) {
  // seo={{
  //   title: data.mdx.frontmatter.title,
  //   description: data.mdx.frontmatter.description,
  //   image: data.mdx.frontmatter.image?.publicURL,
  // }}
  return (
    <>
      <div className="boxed">
        <Heading title={data.mdx.frontmatter.title} />
        <div className="post-content px-4 lg:px-24 md:px-8 pb-12">
          <MDXProvider>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </MDXProvider>
        </div>
      </div>
    </>
  );
}

export const query = graphql`
  query BasePagesQuery($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        image {
          publicURL
        }
        description
      }
    }
  }
`;
