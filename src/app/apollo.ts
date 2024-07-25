import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import * as SecureStore from 'expo-secure-store';
import { AUTH_TOKEN_KEY, env } from '@chatty/utils';

const httpLink = new HttpLink({
  uri: env.apiUrl,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItem(AUTH_TOKEN_KEY);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: env.wsUrl,
    connectionParams: async () => {
      console.log('wsLink connectionParams');
      const token = await SecureStore.getItem(AUTH_TOKEN_KEY);
      return {
        authorization: token ? `Bearer ${token}` : '',
      };
      3;
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

// Apollo Client
export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
