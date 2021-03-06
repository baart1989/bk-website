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

export type ItemPageContext = {
  slug: string;
  previousPath: string;
  nextPath: string;
  currentCount: number;
  totalPagesCount: number;
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

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql<any>(`
    query GatsbyNodeQuery {
      all: allMdx(sort: { order: DESC, fields: frontmatter___date }) {
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

  // we need sources reference for next/previous path
  result.data.all.edges.forEach(({ node }) => {
    const template = node.fields.sourceName;
    const sourceItems = sources[template] || [];
    sourceItems.push(node);
    sources[template] = sourceItems;
  });

  result.data.all.edges.forEach(({ node }) => {
    const template = node.fields.sourceName;
    const edges = sources[node.fields.sourceName];

    const currentIndex = edges.findIndex(edge => edge.fields.slug === node.fields.slug);
    const nextIndex = currentIndex + 1;
    const previousIndex = currentIndex - 1;

    const context: ItemPageContext = {
      slug: node.fields.slug,
      previousPath: edges[previousIndex] ? edges[previousIndex].fields.slug : undefined,
      nextPath: edges[nextIndex] ? edges[nextIndex].fields.slug : undefined,
      currentCount: currentIndex + 1,
      totalPagesCount: edges.length,
    };

    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/${template}/${template}-item.tsx`),
      context: context,
    });
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

const resolveFnc = (source: any, _args, context) => {
  const isValidQuery = source && source.baseImagePath;
  if (isValidQuery == null) return null;
  return context.nodeModel.runQuery({
    query: {
      filter: {
        base: { eq: source.baseImagePath },
      },
    },
    type: 'File',
    firstOnly: true,
  });
};

export const createResolvers: GatsbyNode['createResolvers'] = async ({ createResolvers }) => {
  const resolvers = {
    PartnersJson: {
      localFile: {
        type: 'File',
        resolve: resolveFnc,
      },
    },
    ProjectsJson: {
      localFile: {
        type: 'File',
        resolve: resolveFnc,
      },
    },
    EmployeeJson: {
      localFile: {
        type: 'File',
        resolve: resolveFnc,
      },
    },
  };
  return createResolvers(resolvers);
};
