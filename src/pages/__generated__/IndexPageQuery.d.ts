/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IndexPageQuery
// ====================================================

export interface IndexPageQuery_wallImage_childImageSharp_fluid {
  base64: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
}

export interface IndexPageQuery_wallImage_childImageSharp {
  fluid: IndexPageQuery_wallImage_childImageSharp_fluid | null;
}

export interface IndexPageQuery_wallImage {
  childImageSharp: IndexPageQuery_wallImage_childImageSharp | null;
}

export interface IndexPageQuery_site_siteMetadata_contact {
  api_url: string | null;
  description: string | null;
  mail: string | null;
  phone: string | null;
  address: string | null;
}

export interface IndexPageQuery_site_siteMetadata_social {
  name: string | null;
  url: string | null;
  icon: string | null;
}

export interface IndexPageQuery_site_siteMetadata {
  title: string | null;
  description: string | null;
  capitalizeTitleOnHome: boolean | null;
  titleImage: string | null;
  ogImage: string | null;
  twoColumnWall: boolean | null;
  introTag: string | null;
  about: string | null;
  contact: IndexPageQuery_site_siteMetadata_contact | null;
  social: (IndexPageQuery_site_siteMetadata_social | null)[] | null;
}

export interface IndexPageQuery_site {
  siteMetadata: IndexPageQuery_site_siteMetadata | null;
}

export interface IndexPageQuery_portfolio_edges_node_frontmatter_image_childImageSharp_fluid {
  base64: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
}

export interface IndexPageQuery_portfolio_edges_node_frontmatter_image_childImageSharp {
  fluid: IndexPageQuery_portfolio_edges_node_frontmatter_image_childImageSharp_fluid | null;
  id: string;
}

export interface IndexPageQuery_portfolio_edges_node_frontmatter_image {
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  childImageSharp: IndexPageQuery_portfolio_edges_node_frontmatter_image_childImageSharp | null;
}

export interface IndexPageQuery_portfolio_edges_node_frontmatter {
  title: string;
  description: string | null;
  image: IndexPageQuery_portfolio_edges_node_frontmatter_image | null;
}

export interface IndexPageQuery_portfolio_edges_node_fields {
  slug: string | null;
}

export interface IndexPageQuery_portfolio_edges_node {
  id: string;
  frontmatter: IndexPageQuery_portfolio_edges_node_frontmatter | null;
  fields: IndexPageQuery_portfolio_edges_node_fields | null;
}

export interface IndexPageQuery_portfolio_edges {
  node: IndexPageQuery_portfolio_edges_node;
}

export interface IndexPageQuery_portfolio {
  edges: IndexPageQuery_portfolio_edges[];
}

export interface IndexPageQuery_blog_edges_node_frontmatter_authorImage_childImageSharp_fluid {
  base64: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
}

export interface IndexPageQuery_blog_edges_node_frontmatter_authorImage_childImageSharp {
  fluid: IndexPageQuery_blog_edges_node_frontmatter_authorImage_childImageSharp_fluid | null;
}

export interface IndexPageQuery_blog_edges_node_frontmatter_authorImage {
  childImageSharp: IndexPageQuery_blog_edges_node_frontmatter_authorImage_childImageSharp | null;
}

export interface IndexPageQuery_blog_edges_node_frontmatter_image_childImageSharp_fluid {
  srcSet: string;
  base64: string | null;
  aspectRatio: number;
  src: string;
  sizes: string;
}

export interface IndexPageQuery_blog_edges_node_frontmatter_image_childImageSharp {
  fluid: IndexPageQuery_blog_edges_node_frontmatter_image_childImageSharp_fluid | null;
  id: string;
}

export interface IndexPageQuery_blog_edges_node_frontmatter_image {
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  childImageSharp: IndexPageQuery_blog_edges_node_frontmatter_image_childImageSharp | null;
}

export interface IndexPageQuery_blog_edges_node_frontmatter {
  title: string;
  description: string | null;
  author: string | null;
  date: any | null;
  authorImage: IndexPageQuery_blog_edges_node_frontmatter_authorImage | null;
  image: IndexPageQuery_blog_edges_node_frontmatter_image | null;
}

export interface IndexPageQuery_blog_edges_node_fields {
  slug: string | null;
}

export interface IndexPageQuery_blog_edges_node {
  id: string;
  timeToRead: number | null;
  excerpt: string;
  frontmatter: IndexPageQuery_blog_edges_node_frontmatter | null;
  fields: IndexPageQuery_blog_edges_node_fields | null;
}

export interface IndexPageQuery_blog_edges {
  node: IndexPageQuery_blog_edges_node;
}

export interface IndexPageQuery_blog {
  edges: IndexPageQuery_blog_edges[];
}

export interface IndexPageQuery_offer_edges_node_frontmatter_image_childImageSharp_fluid {
  srcSet: string;
  base64: string | null;
  aspectRatio: number;
  src: string;
  sizes: string;
}

export interface IndexPageQuery_offer_edges_node_frontmatter_image_childImageSharp {
  fluid: IndexPageQuery_offer_edges_node_frontmatter_image_childImageSharp_fluid | null;
  id: string;
}

export interface IndexPageQuery_offer_edges_node_frontmatter_image {
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  childImageSharp: IndexPageQuery_offer_edges_node_frontmatter_image_childImageSharp | null;
}

export interface IndexPageQuery_offer_edges_node_frontmatter {
  title: string;
  price: number | null;
  currency: string | null;
  details: (string | null)[] | null;
  description: string | null;
  image: IndexPageQuery_offer_edges_node_frontmatter_image | null;
}

export interface IndexPageQuery_offer_edges_node {
  id: string;
  frontmatter: IndexPageQuery_offer_edges_node_frontmatter | null;
}

export interface IndexPageQuery_offer_edges {
  node: IndexPageQuery_offer_edges_node;
}

export interface IndexPageQuery_offer {
  edges: IndexPageQuery_offer_edges[];
}

export interface IndexPageQuery_shop_edges_node_fields {
  slug: string | null;
}

export interface IndexPageQuery_shop_edges_node_frontmatter_image_childImageSharp_fluid {
  srcSet: string;
  base64: string | null;
  aspectRatio: number;
  src: string;
  sizes: string;
}

export interface IndexPageQuery_shop_edges_node_frontmatter_image_childImageSharp {
  fluid: IndexPageQuery_shop_edges_node_frontmatter_image_childImageSharp_fluid | null;
  id: string;
}

export interface IndexPageQuery_shop_edges_node_frontmatter_image {
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  childImageSharp: IndexPageQuery_shop_edges_node_frontmatter_image_childImageSharp | null;
}

export interface IndexPageQuery_shop_edges_node_frontmatter {
  title: string;
  price: number | null;
  currency: string | null;
  type: string | null;
  image: IndexPageQuery_shop_edges_node_frontmatter_image | null;
}

export interface IndexPageQuery_shop_edges_node {
  id: string;
  fields: IndexPageQuery_shop_edges_node_fields | null;
  excerpt: string;
  frontmatter: IndexPageQuery_shop_edges_node_frontmatter | null;
}

export interface IndexPageQuery_shop_edges {
  node: IndexPageQuery_shop_edges_node;
}

export interface IndexPageQuery_shop {
  edges: IndexPageQuery_shop_edges[];
}

export interface IndexPageQuery {
  wallImage: IndexPageQuery_wallImage | null;
  site: IndexPageQuery_site | null;
  portfolio: IndexPageQuery_portfolio;
  blog: IndexPageQuery_blog;
  offer: IndexPageQuery_offer;
  shop: IndexPageQuery_shop;
}
