import { App } from './app';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Layout } from './layout';

export default function Root() {
  return (
    <SafeAreaProvider>
      <Layout>
        <App />
      </Layout>
    </SafeAreaProvider>
  );
}
