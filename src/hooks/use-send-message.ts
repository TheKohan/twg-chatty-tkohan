import { useMutation } from '@apollo/client';
import { graphql } from '@chatty/__generated__/gql';
import { GET_ROOM } from './use-get-room';

const SEND_MESSAGE = graphql(`
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

export const useSendMessage = () => {
  return useMutation(SEND_MESSAGE, {
    refetchQueries:[
      GET_ROOM
    ]
  });
};
