/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getClientUser = /* GraphQL */ `
  query GetClientUser($clientId: String) {
    getClientUser(clientId: $clientId) {
      id
      clientId
      email
      name
      active
    }
  }
`;
export const getClientUsers = /* GraphQL */ `
  query GetClientUsers($clientId: String) {
    getClientUsers(clientId: $clientId) {
      id
      clientId
      email
      name
      active
    }
  }
`;
export const getClientEvents = /* GraphQL */ `
  query GetClientEvents(
    $startDate: String!
    $clientId: String
    $limit: Int
    $nextToken: String
  ) {
    getClientEvents(
      startDate: $startDate
      clientId: $clientId
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        startDate
        duration
        clientId
        eventType
        paymentType
      }
      nextToken
    }
  }
`;
export const getUserEvents = /* GraphQL */ `
  query GetUserEvents($startDate: String!) {
    getUserEvents(startDate: $startDate) {
      id
      userId
      startDate
      duration
      clientId
      eventType
      paymentType
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: String) {
    getUser(id: $id) {
      id
      clientId
      email
      name
      active
    }
  }
`;
