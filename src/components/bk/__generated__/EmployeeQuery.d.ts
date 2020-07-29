/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EmployeeQuery
// ====================================================

export interface EmployeeQuery_items_edges_node_localFile_childImageSharp_fixed {
  src: string;
  srcSet: string;
  width: number;
  height: number;
}

export interface EmployeeQuery_items_edges_node_localFile_childImageSharp {
  fixed: EmployeeQuery_items_edges_node_localFile_childImageSharp_fixed | null;
}

export interface EmployeeQuery_items_edges_node_localFile {
  childImageSharp: EmployeeQuery_items_edges_node_localFile_childImageSharp | null;
}

export interface EmployeeQuery_items_edges_node {
  id: string;
  name: string | null;
  title: string | null;
  email: string | null;
  baseImagePath: string | null;
  localFile: EmployeeQuery_items_edges_node_localFile | null;
}

export interface EmployeeQuery_items_edges {
  node: EmployeeQuery_items_edges_node;
}

export interface EmployeeQuery_items {
  edges: EmployeeQuery_items_edges[];
}

export interface EmployeeQuery {
  items: EmployeeQuery_items;
}
