import { PageProps, graphql } from 'gatsby';

import BlogCard from './components/blog-card';
import { BlogListQuery } from './__generated__/BlogListQuery';
import { Heading } from '../components/ui';
import Helmet from 'react-helmet';
import { PaginatedPageContext } from '../../gatsby-node';
import Pagination from '../components/pagination';
import React from 'react';

export const BlogList: React.FC<PageProps<BlogListQuery, PaginatedPageContext>> = ({
  data,
  pageContext,
}) => {
  const blogItems = data.allMdx.edges.map(item => <BlogCard key={item.node.id} data={item.node} />);
  return (
    <>
      <Helmet title="Blog" />
      <div className="container mx-auto py-12">
        <Heading title="Blog" />
        <div className="flex flex-wrap">{blogItems}</div>
        <Pagination pageContext={pageContext} type="blog" />
      </div>
    </>
  );
};

export const query = graphql`
  query BlogListQuery($skip: Int!, $limit: Int!) {
    allMdx(
      filter: { fields: { sourceName: { eq: "blog" } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          timeToRead
          excerpt
          frontmatter {
            title
            description
            author
            date(formatString: "DD MMMM YYYY")
            authorImage {
              childImageSharp {
                fluid(maxWidth: 200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
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
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default BlogList;
