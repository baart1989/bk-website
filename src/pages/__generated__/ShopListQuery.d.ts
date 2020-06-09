/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShopListQuery
// ====================================================

export interface ShopListQuery_shop_edges_node_fields {
  slug: string | null;
}

export interface ShopListQuery_shop_edges_node_frontmatter_image_childImageSharp_fluid {
  srcSet: string;
  base64: string | null;
  aspectRatio: number;
  src: string;
  sizes: string;
}

export interface ShopListQuery_shop_edges_node_frontmatter_image_childImageSharp {
  fluid: ShopListQuery_shop_edges_node_frontmatter_image_childImageSharp_fluid | null;
  id: string;
}

export interface ShopListQuery_shop_edges_node_frontmatter_image {
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  childImageSharp: ShopListQuery_shop_edges_node_frontmatter_image_childImageSharp | null;
}

export interface ShopListQuery_shop_edges_node_frontmatter {
  title: string;
  price: number | null;
  currency: string | null;
  details: (string | null)[] | null;
  description: string | null;
  type: string | null;
  image: ShopListQuery_shop_edges_node_frontmatter_image | null;
}

export interface ShopListQuery_shop_edges_node {
  id: string;
  fields: ShopListQuery_shop_edges_node_fields | null;
  excerpt: string;
  frontmatter: ShopListQuery_shop_edges_node_frontmatter | null;
}

export interface ShopListQuery_shop_edges {
  node: ShopListQuery_shop_edges_node;
}

export interface ShopListQuery_shop {
  edges: ShopListQuery_shop_edges[];
}

export interface ShopListQuery {
  shop: ShopListQuery_shop;
}
