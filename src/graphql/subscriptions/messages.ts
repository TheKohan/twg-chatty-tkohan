import { graphql } from '../../__generated__/gql';

export const MESSAGE_ADDED = graphql(`
  subscription MessageAdded($roomId: String!) {
    messageAdded(roomId: $roomId) {
      id
      body
      insertedAt
      user {
        id
        firstName
        lastName
        role
        email
      }
    }
  }
`);

export const TYPING_USER = graphql(`
  subscription XTypingUser($roomId: String!) {
    typingUser(roomId: $roomId) {
      id
      email
      firstName
      lastName
      role
    }
  }
`);
