import { useSubscription } from '@apollo/client';
import { graphql } from '@chatty/__generated__/gql';

const TYPING_USER = graphql(`
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

export const useTypingSubscription = ({ roomId }: { roomId: string }) => {
  return useSubscription(TYPING_USER, { variables: { roomId } });
};
