import { App } from './app';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Layout } from './layout';
import { NavigationContainer } from '@react-navigation/native';

export * from './navigation-types';

export default function Root() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Layout>
          <App />
        </Layout>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
