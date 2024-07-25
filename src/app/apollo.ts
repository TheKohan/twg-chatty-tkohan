import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import * as SecureStore from 'expo-secure-store';
import { AUTH_TOKEN_KEY, env } from '@chatty/utils';
import AsyncParamsPhoenixSocket from '../utils/async-phoenix';
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link';
import * as AbsintheSocket from '@absinthe/socket';

const phoenixSocket = new AsyncParamsPhoenixSocket(env.wsUrl, {
  params: async () => ({
    token: SecureStore.getItem(AUTH_TOKEN_KEY),
  }),
});

const absintheSocket = AbsintheSocket.create(phoenixSocket);

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
const link = authLink.concat(httpLink); // add onError link and logout user when unauthorized

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink as any,
  link
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
