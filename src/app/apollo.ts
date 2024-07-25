import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import * as SecureStore from 'expo-secure-store';
import { AUTH_TOKEN_KEY, env } from '@chatty/utils';
import AsyncParamsPhoenixSocket from './async-phoenix';
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link';
import * as AbsintheSocket from '@absinthe/socket';

const httpLink = new HttpLink({
  uri: env.apiUrl,
});

/** TODO: Add error handling when user is not AUTHENTICATED anymore */
const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItem(AUTH_TOKEN_KEY);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const phoenixSocket = new AsyncParamsPhoenixSocket(env.wsUrl, {
  params: async () => ({
    token: SecureStore.getItem(AUTH_TOKEN_KEY),
  }),
});

const absintheSocket = AbsintheSocket.create(phoenixSocket);
const wsLink = createAbsintheSocketLink(absintheSocket);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink as any, // Tried with gql-ws but for some reason the socket kept getting disconnected
  authLink.concat(httpLink)
);

// Apollo Client
export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
