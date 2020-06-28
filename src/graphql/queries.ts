/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getClientUsers = /* GraphQL */ `
  query GetClientUsers($clientId: String) {
    getClientUsers(clientId: $clientId) {
      id
      clientId
      email
      name
    }
  }
`;
export const getClientEvents = /* GraphQL */ `
  query GetClientEvents($startDate: String!, $clientId: String) {
    getClientEvents(startDate: $startDate, clientId: $clientId) {
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
export const getUserEvents = /* GraphQL */ `
  query GetUserEvents($startDate: String!, $userId: String!) {
    getUserEvents(startDate: $startDate, userId: $userId) {
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
    }
  }
`;
