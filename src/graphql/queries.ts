/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getClientEvents = /* GraphQL */ `
  query GetClientEvents($clientId: String, $limit: Int, $nextToken: String, $startDate: String!) {
    getClientEvents(
      clientId: $clientId
      limit: $limit
      nextToken: $nextToken
      startDate: $startDate
    ) {
      items {
        clientId
        duration
        eventType
        id
        paymentType
        startDate
        userId
      }
      nextToken
    }
  }
`;
export const getClientUser = /* GraphQL */ `
  query GetClientUser($clientId: String) {
    getClientUser(clientId: $clientId) {
      active
      clientId
      email
      id
      name
    }
  }
`;
export const getClientUsers = /* GraphQL */ `
  query GetClientUsers($clientId: String) {
    getClientUsers(clientId: $clientId) {
      active
      clientId
      email
      id
      name
    }
  }
`;
export const getServiceVersion = /* GraphQL */ `
  query GetServiceVersion {
    getServiceVersion {
      version
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: String) {
    getUser(id: $id) {
      active
      clientId
      email
      id
      name
    }
  }
`;
export const getUserEvents = /* GraphQL */ `
  query GetUserEvents($startDate: String!) {
    getUserEvents(startDate: $startDate) {
      clientId
      duration
      eventType
      id
      paymentType
      startDate
      userId
    }
  }
`;
