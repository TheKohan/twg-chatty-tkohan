import { useQuery } from '@apollo/client';
import { graphql } from '@chatty/__generated__/gql';

export const GET_ROOM = graphql(`
  query GetRoom($id: ID!) {
    room(id: $id) {
      id
      name
      user {
        id
        firstName
        lastName
        role
        email
      }
      messages {
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
  }
`);

export const useGetRoom = ({ roomId }: { roomId: string }) => {
  return useQuery(GET_ROOM, {
    variables: { id: roomId },
    pollInterval: 1000 * 3,
  });
};
