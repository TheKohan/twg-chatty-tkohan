/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** Chatly message */
export type Message = {
  __typename?: 'Message';
  body?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  insertedAt?: Maybe<Scalars['String']['output']>;
  /** Author of the message */
  user?: Maybe<UserType>;
};

/** Chatly room and user that created it */
export type RoomType = {
  __typename?: 'RoomType';
  id?: Maybe<Scalars['String']['output']>;
  messages?: Maybe<Array<Maybe<Message>>>;
  name?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserType>;
};

/** Chatly rooms for a given user */
export type RoomsType = {
  __typename?: 'RoomsType';
  rooms?: Maybe<Array<Maybe<SingleRoomType>>>;
  user?: Maybe<UserType>;
};

export type RootMutationType = {
  __typename?: 'RootMutationType';
  /** Log in to the Chatly and receive back the token */
  loginUser?: Maybe<SessionType>;
  /** ADMIN ONLY | Create new Chatly room */
  newRoom?: Maybe<RoomType>;
  /** Register a new Chatly app user */
  registerUser?: Maybe<UserType>;
  /** Send a new message in a given room */
  sendMessage?: Maybe<Message>;
  /** Set typing user */
  typingUser?: Maybe<UserType>;
};


export type RootMutationTypeLoginUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type RootMutationTypeNewRoomArgs = {
  name: Scalars['String']['input'];
};


export type RootMutationTypeRegisterUserArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type RootMutationTypeSendMessageArgs = {
  body: Scalars['String']['input'];
  roomId: Scalars['String']['input'];
};


export type RootMutationTypeTypingUserArgs = {
  roomId: Scalars['String']['input'];
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  /** Get Chatly room by ID */
  room?: Maybe<RoomType>;
  /** ADMIN ONLY | Get all available Chatly rooms */
  rooms?: Maybe<Array<Maybe<SingleRoomType>>>;
  /** Get current Chatly user data */
  user?: Maybe<UserType>;
  /** ADMIN ONLY | Get all Chatly app users */
  users?: Maybe<Array<Maybe<UserType>>>;
  /** Get Chatly rooms created by given user (token) */
  usersRooms?: Maybe<RoomsType>;
};


export type RootQueryTypeRoomArgs = {
  id: Scalars['ID']['input'];
};

export type RootSubscriptionType = {
  __typename?: 'RootSubscriptionType';
  /** Get notified whenever there is a new message in a given room */
  messageAdded?: Maybe<Message>;
  /** Get the name of the user that is currently typing something in a given room */
  typingUser?: Maybe<UserType>;
};


export type RootSubscriptionTypeMessageAddedArgs = {
  roomId: Scalars['String']['input'];
};


export type RootSubscriptionTypeTypingUserArgs = {
  roomId: Scalars['String']['input'];
};

/** Chatly session data */
export type SessionType = {
  __typename?: 'SessionType';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserType>;
};

/** Chatly single room */
export type SingleRoomType = {
  __typename?: 'SingleRoomType';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** Chatly user */
export type UserType = {
  __typename?: 'UserType';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
};

export type GetAllRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRoomsQuery = { __typename?: 'RootQueryType', usersRooms?: { __typename?: 'RoomsType', user?: { __typename?: 'UserType', email?: string | null, firstName?: string | null, lastName?: string | null, id?: string | null, role?: string | null } | null, rooms?: Array<{ __typename?: 'SingleRoomType', id?: string | null, name?: string | null } | null> | null } | null };

export type GetRoomQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetRoomQuery = { __typename?: 'RootQueryType', room?: { __typename?: 'RoomType', id?: string | null, name?: string | null } | null };


export const GetAllRoomsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllRooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersRooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllRoomsQuery, GetAllRoomsQueryVariables>;
export const GetRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetRoomQuery, GetRoomQueryVariables>;