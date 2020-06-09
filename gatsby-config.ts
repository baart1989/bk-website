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
      name: `blog`,
      path: `${__dirname}/contents/blog/`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `offer`,
      path: `${__dirname}/contents/offer/`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `shop`,
      path: `${__dirname}/contents/shop/`,
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
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `basepage`,
      path: `${__dirname}/contents/basepage/`,
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

if (siteMetadata.disqus) {
  plugins.push({
    resolve: `gatsby-plugin-disqus`,
    options: {
      shortname: siteMetadata.disqus,
    },
  } as any);
}

export default {
  siteMetadata: siteMetadata,
  plugins: plugins,
};
