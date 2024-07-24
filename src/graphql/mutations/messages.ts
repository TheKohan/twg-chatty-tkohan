import { graphql } from '../../__generated__/gql';

export const SEND_MESSAGE = graphql(`
  mutation SendMessage($roomId: String!, $body: String!) {
    sendMessage(roomId: $roomId, body: $body) {
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
