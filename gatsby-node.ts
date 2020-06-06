import { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import path from 'path';

const paginatedPageContext = (
  itemPerPage: number,
  currentIndex: number,
  totalPagesCount: number,
) => {
  return {
    limit: itemPerPage,
    skip: currentIndex * itemPerPage,
    totalPagesCount: totalPagesCount,
    currentPage: currentIndex + 1,
  };
};
export type PaginatedPageContext = ReturnType<typeof paginatedPageContext>;

export const onCreateNode: GatsbyNode['onCreateNode'] = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode });
    const sourceName = getNode(node.parent).sourceInstanceName;
    const prefix = sourceName === 'basepages' ? '' : '/' + sourceName;

    createNodeField({
      node,
      name: `slug`,
      value: `${prefix}${slug}`,
    });
    createNodeField({
      node,
      name: `sourceName`,
      value: sourceName,
    });
  }
};

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql<any>(`
    query GatsbyNodeQuery {
      all: allMdx {
        edges {
          node {
            fields {
              slug
              sourceName
            }
          }
        }
      }
      blog: allMdx(filter: { fields: { sourceName: { eq: "blog" } } }) {
        edges {
          node {
            id
          }
        }
      }
      portfolio: allMdx(filter: { fields: { sourceName: { eq: "portfolio" } } }) {
        edges {
          node {
            id
          }
        }
      }
      limitPost: site {
        siteMetadata {
          blogItemsPerPage
          portfolioItemsPerPage
        }
      }
    }
  `).then(result => {
    result.data.all.edges.forEach(({ node }) => {
      const template = node.fields.sourceName;
      createPage({
        path: node.fields.slug,
        component: path.resolve('./src/templates/' + template + '.tsx'),
        context: {
          slug: node.fields.slug,
        },
      });
    });

    const blogPosts = result.data.blog.edges;
    const blogPostsPerPage = result.data.limitPost.siteMetadata.blogItemsPerPage;
    const numBlogPages = Math.ceil(blogPosts.length / blogPostsPerPage);

    Array.from({ length: numBlogPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog` : `/blog/${i + 1}`,
        component: path.resolve('./src/templates/blog-list.tsx'),
        context: paginatedPageContext(blogPostsPerPage, i, numBlogPages),
      });
    });

    const portfolioItems = result.data.portfolio.edges;
    const { portfolioItemsPerPage } = result.data.limitPost.siteMetadata;
    const numPortfolioItems = Math.ceil(portfolioItems.length / portfolioItemsPerPage);

    Array.from({ length: numPortfolioItems }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/portfolio` : `/portfolio/${i + 1}`,
        component: path.resolve('./src/templates/portfolio-list.tsx'),
        context: paginatedPageContext(portfolioItemsPerPage, i, numPortfolioItems),
      });
    });
  });
};
