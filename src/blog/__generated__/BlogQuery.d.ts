/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogQuery
// ====================================================

export interface BlogQuery_mdx_frontmatter_image_childImageSharp_fluid {
  srcSet: string;
  base64: string | null;
  aspectRatio: number;
  src: string;
  sizes: string;
}

export interface BlogQuery_mdx_frontmatter_image_childImageSharp {
  fluid: BlogQuery_mdx_frontmatter_image_childImageSharp_fluid | null;
  id: string;
}

export interface BlogQuery_mdx_frontmatter_image {
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  childImageSharp: BlogQuery_mdx_frontmatter_image_childImageSharp | null;
}

export interface BlogQuery_mdx_frontmatter_banner_childImageSharp_fluid {
  srcSet: string;
  base64: string | null;
  aspectRatio: number;
  src: string;
  sizes: string;
}

export interface BlogQuery_mdx_frontmatter_banner_childImageSharp {
  fluid: BlogQuery_mdx_frontmatter_banner_childImageSharp_fluid | null;
  id: string;
}

export interface BlogQuery_mdx_frontmatter_banner {
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  childImageSharp: BlogQuery_mdx_frontmatter_banner_childImageSharp | null;
}

export interface BlogQuery_mdx_frontmatter {
  title: string;
  date: any | null;
  description: string | null;
  image: BlogQuery_mdx_frontmatter_image | null;
  banner: BlogQuery_mdx_frontmatter_banner | null;
}

export interface BlogQuery_mdx {
  body: string;
  frontmatter: BlogQuery_mdx_frontmatter | null;
}

export interface BlogQuery {
  mdx: BlogQuery_mdx | null;
}

export interface BlogQueryVariables {
  slug: string;
}
