import { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import fs from 'fs';
import path from 'path';
import { siteMetadata } from './config';

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
    const prefix = sourceName === 'basepage' ? '' : '/' + sourceName;

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

export const onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;
  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = `/app/*`;
    // Update the page.
    createPage(page);
  }
};

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql<any>(`
    query GatsbyNodeQuery {
      all: allMdx {
        edges {
          node {
            id
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
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const sources: { [id: string]: any[] } = {};

  result.data.all.edges.forEach(({ node }) => {
    const template = node.fields.sourceName;
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/${template}/${template}-item.tsx`),
      context: {
        slug: node.fields.slug,
      },
    });

    const sourceItems = sources[template] || [];
    sourceItems.push(node);

    sources[template] = sourceItems;
  });

  Object.keys(siteMetadata.sourcePages).forEach(sourceName => {
    siteMetadata.sourcePages[sourceName].forEach(pageName => {
      createPage({
        path: pageName,
        component: path.resolve(`./src/${sourceName}/${pageName}.tsx`),
        context: {},
      });
    });
  });

  Object.keys(sources).forEach(sourceName => {
    const listPagePath = `./src/${sourceName}/${sourceName}-list.tsx`;

    if (!fs.existsSync(listPagePath)) {
      console.warn(`ListPageCreateError: ${listPagePath} does not exists`);
      console.info(`ListPageCreateError: ${listPagePath} skipped`);
      return;
    }

    const edges = sources[sourceName];
    const edgesPerPage = siteMetadata[`${sourceName}ItemsPerPage`] || 10;
    const pageCount = Math.ceil(edges.length / edgesPerPage);

    Array.from({ length: pageCount }).forEach((_, i) => {
      const slug = i === 0 ? `/${sourceName}` : `/${sourceName}/${i + 1}`;
      createPage({
        path: slug,
        component: path.resolve(listPagePath),
        context: paginatedPageContext(edgesPerPage, i, pageCount),
      });
    });
  });
};
