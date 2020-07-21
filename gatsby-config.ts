import autoprefixer from 'autoprefixer';
import { siteMetadata } from './config';
import tailwindConfig from './tailwind.config';
import tailwindcss from 'tailwindcss';

const plugins = [
  `gatsby-plugin-sharp`,
  `gatsby-transformer-sharp`,
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-typescript`,
  `gatsby-plugin-codegen`,
  `gatsby-transformer-json`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: 'data',
      path: `${__dirname}/src/data`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `portfolio`,
      path: `${__dirname}/contents/portfolio/`,
    },
  },
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      gatsbyRemarkPlugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 1200,
          },
        },
      ],
    },
  },
  {
    resolve: `gatsby-plugin-postcss`,
    options: {
      postCssPlugins: [
        tailwindcss(tailwindConfig),
        autoprefixer,
        ...(process.env.NODE_ENV === `production` ? [require(`cssnano`)] : []),
      ],
    },
  },
];

export default {
  siteMetadata: siteMetadata,
  plugins: plugins,
};
