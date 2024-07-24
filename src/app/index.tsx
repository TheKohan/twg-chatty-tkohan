import { App } from './app';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Layout } from './layout';
import { NavigationContainer } from '@react-navigation/native';
import { client } from './apollo';
import { ApolloProvider } from '@apollo/client';

export default function Root() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Layout>
            <App />
          </Layout>
        </SafeAreaProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
}
