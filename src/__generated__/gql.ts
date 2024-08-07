/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  mutation LoginUser($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      token\n      user {\n        email\n        firstName\n        id\n        lastName\n        role\n      }\n    }\n  }\n':
    types.LoginUserDocument,
  '\n  mutation RegisterUser(\n    $email: String!\n    $firstName: String!\n    $lastName: String!\n    $password: String!\n    $passwordConfirmation: String!\n  ) {\n    registerUser(\n      email: $email\n      firstName: $firstName\n      lastName: $lastName\n      password: $password\n      passwordConfirmation: $passwordConfirmation\n    ) {\n      email\n      firstName\n      id\n      lastName\n      role\n    }\n  }\n':
    types.RegisterUserDocument,
  '\n  mutation SendMessage($roomId: String!, $body: String!) {\n    sendMessage(roomId: $roomId, body: $body) {\n      id\n      body\n      insertedAt\n      user {\n        id\n        firstName\n        lastName\n        role\n        email\n      }\n    }\n  }\n':
    types.SendMessageDocument,
  '\n  mutation TypingUser($roomId: String!) {\n    typingUser(roomId: $roomId) {\n      email\n      firstName\n      lastName\n      id\n      role\n    }\n  }\n':
    types.TypingUserDocument,
  '\n  query GetAllRooms {\n    usersRooms {\n      user {\n        email\n        firstName\n        lastName\n        id\n        role\n      }\n      rooms {\n        id\n        name\n      }\n    }\n  }\n':
    types.GetAllRoomsDocument,
  '\n  query GetRoom($id: ID!) {\n    room(id: $id) {\n      id\n      name\n      user {\n        id\n        firstName\n        lastName\n        role\n        email\n      }\n      messages {\n        id\n        body\n        insertedAt\n        user {\n          id\n          firstName\n          lastName\n          role\n          email\n        }\n      }\n    }\n  }\n':
    types.GetRoomDocument,
  '\n  query GetCurrentUser {\n    user {\n      email\n      firstName\n      id\n      lastName\n      role\n    }\n  }\n':
    types.GetCurrentUserDocument,
  '\n  subscription MessageAdded($roomId: String!) {\n    messageAdded(roomId: $roomId) {\n      id\n      body\n      insertedAt\n      user {\n        id\n        firstName\n        lastName\n        role\n        email\n      }\n    }\n  }\n':
    types.MessageAddedDocument,
  '\n  subscription XTypingUser($roomId: String!) {\n    typingUser(roomId: $roomId) {\n      id\n      email\n      firstName\n      lastName\n      role\n    }\n  }\n':
    types.XTypingUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation LoginUser($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      token\n      user {\n        email\n        firstName\n        id\n        lastName\n        role\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation LoginUser($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      token\n      user {\n        email\n        firstName\n        id\n        lastName\n        role\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RegisterUser(\n    $email: String!\n    $firstName: String!\n    $lastName: String!\n    $password: String!\n    $passwordConfirmation: String!\n  ) {\n    registerUser(\n      email: $email\n      firstName: $firstName\n      lastName: $lastName\n      password: $password\n      passwordConfirmation: $passwordConfirmation\n    ) {\n      email\n      firstName\n      id\n      lastName\n      role\n    }\n  }\n',
): (typeof documents)['\n  mutation RegisterUser(\n    $email: String!\n    $firstName: String!\n    $lastName: String!\n    $password: String!\n    $passwordConfirmation: String!\n  ) {\n    registerUser(\n      email: $email\n      firstName: $firstName\n      lastName: $lastName\n      password: $password\n      passwordConfirmation: $passwordConfirmation\n    ) {\n      email\n      firstName\n      id\n      lastName\n      role\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation SendMessage($roomId: String!, $body: String!) {\n    sendMessage(roomId: $roomId, body: $body) {\n      id\n      body\n      insertedAt\n      user {\n        id\n        firstName\n        lastName\n        role\n        email\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation SendMessage($roomId: String!, $body: String!) {\n    sendMessage(roomId: $roomId, body: $body) {\n      id\n      body\n      insertedAt\n      user {\n        id\n        firstName\n        lastName\n        role\n        email\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation TypingUser($roomId: String!) {\n    typingUser(roomId: $roomId) {\n      email\n      firstName\n      lastName\n      id\n      role\n    }\n  }\n',
): (typeof documents)['\n  mutation TypingUser($roomId: String!) {\n    typingUser(roomId: $roomId) {\n      email\n      firstName\n      lastName\n      id\n      role\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetAllRooms {\n    usersRooms {\n      user {\n        email\n        firstName\n        lastName\n        id\n        role\n      }\n      rooms {\n        id\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetAllRooms {\n    usersRooms {\n      user {\n        email\n        firstName\n        lastName\n        id\n        role\n      }\n      rooms {\n        id\n        name\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetRoom($id: ID!) {\n    room(id: $id) {\n      id\n      name\n      user {\n        id\n        firstName\n        lastName\n        role\n        email\n      }\n      messages {\n        id\n        body\n        insertedAt\n        user {\n          id\n          firstName\n          lastName\n          role\n          email\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetRoom($id: ID!) {\n    room(id: $id) {\n      id\n      name\n      user {\n        id\n        firstName\n        lastName\n        role\n        email\n      }\n      messages {\n        id\n        body\n        insertedAt\n        user {\n          id\n          firstName\n          lastName\n          role\n          email\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetCurrentUser {\n    user {\n      email\n      firstName\n      id\n      lastName\n      role\n    }\n  }\n',
): (typeof documents)['\n  query GetCurrentUser {\n    user {\n      email\n      firstName\n      id\n      lastName\n      role\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  subscription MessageAdded($roomId: String!) {\n    messageAdded(roomId: $roomId) {\n      id\n      body\n      insertedAt\n      user {\n        id\n        firstName\n        lastName\n        role\n        email\n      }\n    }\n  }\n',
): (typeof documents)['\n  subscription MessageAdded($roomId: String!) {\n    messageAdded(roomId: $roomId) {\n      id\n      body\n      insertedAt\n      user {\n        id\n        firstName\n        lastName\n        role\n        email\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  subscription XTypingUser($roomId: String!) {\n    typingUser(roomId: $roomId) {\n      id\n      email\n      firstName\n      lastName\n      role\n    }\n  }\n',
): (typeof documents)['\n  subscription XTypingUser($roomId: String!) {\n    typingUser(roomId: $roomId) {\n      id\n      email\n      firstName\n      lastName\n      role\n    }\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
