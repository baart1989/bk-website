/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OfferListQuery
// ====================================================

export interface OfferListQuery_allMdx_edges_node_frontmatter_image_childImageSharp_fluid {
  srcSet: string;
  base64: string | null;
  aspectRatio: number;
  src: string;
  sizes: string;
}

export interface OfferListQuery_allMdx_edges_node_frontmatter_image_childImageSharp {
  fluid: OfferListQuery_allMdx_edges_node_frontmatter_image_childImageSharp_fluid | null;
  id: string;
}

export interface OfferListQuery_allMdx_edges_node_frontmatter_image {
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  childImageSharp: OfferListQuery_allMdx_edges_node_frontmatter_image_childImageSharp | null;
}

export interface OfferListQuery_allMdx_edges_node_frontmatter {
  title: string;
  price: number | null;
  currency: string | null;
  details: (string | null)[] | null;
  description: string | null;
  image: OfferListQuery_allMdx_edges_node_frontmatter_image | null;
}

export interface OfferListQuery_allMdx_edges_node {
  id: string;
  frontmatter: OfferListQuery_allMdx_edges_node_frontmatter | null;
}

export interface OfferListQuery_allMdx_edges {
  node: OfferListQuery_allMdx_edges_node;
}

export interface OfferListQuery_allMdx {
  edges: OfferListQuery_allMdx_edges[];
}

export interface OfferListQuery {
  allMdx: OfferListQuery_allMdx;
}
