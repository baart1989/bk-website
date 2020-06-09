/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShopItemQuery
// ====================================================

export interface ShopItemQuery_mdx_frontmatter_image_childImageSharp_fluid {
  base64: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
}

export interface ShopItemQuery_mdx_frontmatter_image_childImageSharp {
  fluid: ShopItemQuery_mdx_frontmatter_image_childImageSharp_fluid | null;
  id: string;
}

export interface ShopItemQuery_mdx_frontmatter_image {
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  childImageSharp: ShopItemQuery_mdx_frontmatter_image_childImageSharp | null;
}

export interface ShopItemQuery_mdx_frontmatter {
  title: string;
  date: any | null;
  description: string | null;
  image: ShopItemQuery_mdx_frontmatter_image | null;
}

export interface ShopItemQuery_mdx {
  body: string;
  frontmatter: ShopItemQuery_mdx_frontmatter | null;
}

export interface ShopItemQuery {
  mdx: ShopItemQuery_mdx | null;
}

export interface ShopItemQueryVariables {
  slug: string;
}
