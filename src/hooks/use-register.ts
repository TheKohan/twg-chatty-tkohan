import { useMutation } from '@apollo/client';
import { graphql } from '@chatty/__generated__/gql';

const REGISTER_USER = graphql(`
  mutation RegisterUser(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    registerUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      passwordConfirmation: $passwordConfirmation
    ) {
      email
      firstName
      id
      lastName
      role
    }
  }
`);

export const useRegister = () => {
  return useMutation(REGISTER_USER);
};
