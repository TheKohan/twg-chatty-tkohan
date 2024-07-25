import { useSubscription } from '@apollo/client';
import { graphql } from '@chatty/__generated__/gql';

const MESSAGE_ADDED = graphql(`
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

export const useMessageAddedSubscription = ({ roomId }: { roomId: string }) => {
  return useSubscription(MESSAGE_ADDED, { variables: { roomId } });
};
