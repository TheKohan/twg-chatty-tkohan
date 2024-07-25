import { useMutation } from '@apollo/client';
import { graphql } from '@chatty/__generated__/gql';

const SET_TYPING_USER = graphql(`
  mutation TypingUser($roomId: String!) {
    typingUser(roomId: $roomId) {
      email
      firstName
      lastName
      id
      role
    }
  }
`);

export const useSetTyping = ({ roomId }: { roomId: string }) => {
  return useMutation(SET_TYPING_USER, {
    variables: { roomId },
  });
};
