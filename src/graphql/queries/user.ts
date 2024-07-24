import { graphql } from '../../__generated__/gql';

export const GET_CURRENT_USER = graphql(`
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
