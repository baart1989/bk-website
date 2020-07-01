/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type UserInput = {
  clientId: string,
  email: string,
  name: string,
};

export type EventInput = {
  id?: string | null,
  startDate: string,
  clientId: string,
  userId?: string | null,
  duration: string,
  eventType: EventType,
  paymentType: PaymentType,
};

export enum EventType {
  consultation = "consultation",
  research_analysis = "research_analysis",
  research_analysis_with_diet = "research_analysis_with_diet",
}


export enum PaymentType {
  bank_transfer = "bank_transfer",
}


export type AddUserMutationVariables = {
  input: UserInput,
};

export type AddUserMutation = {
  addUser:  {
    __typename: "User",
    id: string,
    clientId: string,
    email: string,
    name: string,
  } | null,
};

export type AddEventMutationVariables = {
  input: EventInput,
};

export type AddEventMutation = {
  addEvent:  {
    __typename: "Event",
    id: string,
    userId: string,
    startDate: string,
    duration: string,
    clientId: string,
    eventType: EventType,
    paymentType: PaymentType,
  } | null,
};

export type GetClientUsersQueryVariables = {
  clientId?: string | null,
};

export type GetClientUsersQuery = {
  getClientUsers:  Array< {
    __typename: "User",
    id: string,
    clientId: string,
    email: string,
    name: string,
  } | null > | null,
};

export type GetClientEventsQueryVariables = {
  startDate: string,
  clientId?: string | null,
};

export type GetClientEventsQuery = {
  getClientEvents:  Array< {
    __typename: "Event",
    id: string,
    userId: string,
    startDate: string,
    duration: string,
    clientId: string,
    eventType: EventType,
    paymentType: PaymentType,
  } | null > | null,
};

export type GetUserEventsQueryVariables = {
  startDate: string,
  userId: string,
};

export type GetUserEventsQuery = {
  getUserEvents:  Array< {
    __typename: "Event",
    id: string,
    userId: string,
    startDate: string,
    duration: string,
    clientId: string,
    eventType: EventType,
    paymentType: PaymentType,
  } | null > | null,
};

export type GetUserQueryVariables = {
  id?: string | null,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    clientId: string,
    email: string,
    name: string,
  } | null,
};
