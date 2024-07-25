import { App } from './app';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Layout } from './layout';
import { NavigationContainer } from '@react-navigation/native';
import { client } from './apollo';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from '@chatty/context';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Avatar: Support for defaultProps']);

export default function Root() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <NavigationContainer>
          <SafeAreaProvider>
            <Layout>
              <App />
            </Layout>
          </SafeAreaProvider>
        </NavigationContainer>
      </AuthProvider>
    </ApolloProvider>
  );
}
