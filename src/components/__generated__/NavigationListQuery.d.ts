/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NavigationListQuery
// ====================================================

export interface NavigationListQuery_site_siteMetadata_navLinks {
  name: string | null;
  url: string | null;
  isDropdown: boolean | null;
  requireAuth: boolean | null;
  callbackFnc: string | null;
  adminAccessOnly: boolean | null;
}

export interface NavigationListQuery_site_siteMetadata_sourcePages {
  shop: (string | null)[] | null;
}

export interface NavigationListQuery_site_siteMetadata {
  navLinks: (NavigationListQuery_site_siteMetadata_navLinks | null)[] | null;
  sourcePages: NavigationListQuery_site_siteMetadata_sourcePages | null;
  darkmode: boolean | null;
  switchTheme: boolean | null;
}

export interface NavigationListQuery_site {
  siteMetadata: NavigationListQuery_site_siteMetadata | null;
}

export interface NavigationListQuery {
  site: NavigationListQuery_site | null;
}
