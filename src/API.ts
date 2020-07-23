/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type EventInput = {
  clientId: string;
  duration: string;
  eventType: EventType;
  id?: string | null;
  paymentType: PaymentType;
  startDate: string;
  userId?: string | null;
};

export enum EventType {
  consultation = 'consultation',
  research_analysis = 'research_analysis',
  research_analysis_with_diet = 'research_analysis_with_diet',
}

export enum PaymentType {
  bank_transfer = 'bank_transfer',
}

export type UserInput = {
  clientId: string;
  email: string;
  name: string;
};

export type AddEventMutationVariables = {
  input: EventInput;
};

export type AddEventMutation = {
  addEvent: {
    __typename: 'Event';
    clientId: string;
    duration: string;
    eventType: EventType;
    id: string;
    paymentType: PaymentType;
    startDate: string;
    userId: string;
  } | null;
};

export type AddUserMutationVariables = {
  input: UserInput;
};

export type AddUserMutation = {
  addUser: {
    __typename: 'User';
    active: boolean | null;
    clientId: string;
    email: string;
    id: string;
    name: string;
  } | null;
};

export type GetClientEventsQueryVariables = {
  clientId?: string | null;
  limit?: number | null;
  nextToken?: string | null;
  startDate: string;
};

export type GetClientEventsQuery = {
  getClientEvents: {
    __typename: 'EventConnection';
    items: Array<{
      __typename: 'Event';
      clientId: string;
      duration: string;
      eventType: EventType;
      id: string;
      paymentType: PaymentType;
      startDate: string;
      userId: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type GetClientUserQueryVariables = {
  clientId?: string | null;
};

export type GetClientUserQuery = {
  getClientUser: {
    __typename: 'User';
    active: boolean | null;
    clientId: string;
    email: string;
    id: string;
    name: string;
  } | null;
};

export type GetClientUsersQueryVariables = {
  clientId?: string | null;
};

export type GetClientUsersQuery = {
  getClientUsers: Array<{
    __typename: 'User';
    active: boolean | null;
    clientId: string;
    email: string;
    id: string;
    name: string;
  } | null> | null;
};

export type GetServiceVersionQuery = {
  getServiceVersion: {
    __typename: 'ServiceVersion';
    version: string;
  } | null;
};

export type GetUserQueryVariables = {
  id?: string | null;
};

export type GetUserQuery = {
  getUser: {
    __typename: 'User';
    active: boolean | null;
    clientId: string;
    email: string;
    id: string;
    name: string;
  } | null;
};

export type GetUserEventsQueryVariables = {
  startDate: string;
};

export type GetUserEventsQuery = {
  getUserEvents: Array<{
    __typename: 'Event';
    clientId: string;
    duration: string;
    eventType: EventType;
    id: string;
    paymentType: PaymentType;
    startDate: string;
    userId: string;
  } | null> | null;
};
