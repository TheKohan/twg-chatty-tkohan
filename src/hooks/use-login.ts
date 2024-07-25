import { useMutation } from '@apollo/client';
import { graphql } from '@chatty/__generated__/gql';

const LOGIN_USER = graphql(`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        email
        firstName
        id
        lastName
        role
      }
    }
  }
`);

export const useLogin = () => {
  return useMutation(LOGIN_USER);
};
