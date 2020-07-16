/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addEvent = /* GraphQL */ `
  mutation AddEvent($input: EventInput!) {
    addEvent(input: $input) {
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
export const addUser = /* GraphQL */ `
  mutation AddUser($input: UserInput!) {
    addUser(input: $input) {
      active
      clientId
      email
      id
      name
    }
  }
`;
