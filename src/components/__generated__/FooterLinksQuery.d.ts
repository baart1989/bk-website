/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FooterLinksQuery
// ====================================================

export interface FooterLinksQuery_site_siteMetadata_navLinks {
  id: string | null;
  name: string | null;
  url: string | null;
}

export interface FooterLinksQuery_site_siteMetadata {
  title: string | null;
  navLinks: (FooterLinksQuery_site_siteMetadata_navLinks | null)[] | null;
}

export interface FooterLinksQuery_site {
  siteMetadata: FooterLinksQuery_site_siteMetadata | null;
}

export interface FooterLinksQuery {
  site: FooterLinksQuery_site | null;
}
