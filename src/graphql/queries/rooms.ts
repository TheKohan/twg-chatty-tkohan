import { graphql } from '../../__generated__/gql';

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

const GET_ROOM = graphql(`
  query GetRoom($id: ID!) {
    room(id: $id) {
      id
      name
    }
  }
`);
