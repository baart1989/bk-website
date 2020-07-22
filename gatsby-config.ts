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
    resolve: `gatsby-plugin-modal-routing`,
    options: {
      // A selector to set react-modal's app root to, default is `#___gatsby`
      // See http://reactcommunity.org/react-modal/accessibility/#app-element
      appElement: '#___gatsby',
      // Object of props that will be passed to the react-modal container
      // See http://reactcommunity.org/react-modal/#usage
      modalProps: {
        closeTimeoutMS: 2000,
      },
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
