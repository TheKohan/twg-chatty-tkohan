import {
  ApolloClient,
  InMemoryCache,
  split,
  HttpLink,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import * as SecureStore from 'expo-secure-store';
import { AUTH_TOKEN_KEY, env } from '@chatty/utils';
import AsyncParamsPhoenixSocket from '../utils/async-phoenix';
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link';
import * as AbsintheSocket from '@absinthe/socket';
import { onError } from '@apollo/client/link/error';

const phoenixSocket = new AsyncParamsPhoenixSocket(env.wsUrl, {
  params: async () => ({
    token: SecureStore.getItem(AUTH_TOKEN_KEY),
  }),
});

const absintheSocket = AbsintheSocket.create(phoenixSocket);

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.message.includes('Unauthorized')) {
        SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      }
      console.error(
        `[GraphQL error]: Message: ${err.message}, Location: ${err.locations}, Path: ${err.path}`,
        operation,
        err,
      );
    }
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`, operation);
  }
});

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

const wsLink = createAbsintheSocketLink(absintheSocket);
const link = ApolloLink.from([errorLink, authLink.concat(httpLink)]);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  // biome-ignore lint/suspicious/noExplicitAny: Possible type mismatch
  wsLink as any,
  link,
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
