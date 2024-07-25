import { useQuery } from '@apollo/client';
import { graphql } from '@chatty/__generated__/gql';

const GET_CURRENT_USER = graphql(`
  query GetCurrentUser {
    user {
      email
      firstName
      id
      lastName
      role
    }
  }
`);

export const useGetUser = () => {
  return useQuery(GET_CURRENT_USER, {
    pollInterval: 1000 * 3,
  });
};
