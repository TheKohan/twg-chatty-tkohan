import { useQuery } from '@apollo/client';
import { graphql } from '@chatty/__generated__/gql';

export const GET_ALL_ROOMS = graphql(`
  query GetAllRooms {
    usersRooms {
      user {
        email
        firstName
        lastName
        id
        role
      }
      rooms {
        id
        name
      }
    }
  }
`);

export const useGetRooms = (props?: { poolingInterval?: number }) => {
  return useQuery(GET_ALL_ROOMS, {
    pollInterval: props?.poolingInterval,
  });
};
