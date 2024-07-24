import { graphql } from '../../__generated__/gql';

export const LOGIN_USER = graphql(`
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

export const REGISTER_USER = graphql(`
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
