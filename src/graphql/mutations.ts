/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addUser = /* GraphQL */ `
  mutation AddUser($input: UserInput!) {
    addUser(input: $input) {
      id
      clientId
      email
      name
      active
    }
  }
`;
export const addEvent = /* GraphQL */ `
  mutation AddEvent($input: EventInput!) {
    addEvent(input: $input) {
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
