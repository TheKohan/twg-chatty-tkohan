import { StyleSheet, Text, View } from 'react-native';
import { Layout } from './layout';
import { SafeAreaView } from 'react-native-safe-area-context';

export const App = () => {
  return (
    <Layout>
      <SafeAreaView style={styles.container}>
        <Text style={{ fontFamily: 'Inter-Black', fontSize: 30 }}>
          Inter Black
        </Text>
        <Text style={{ fontSize: 30 }}>Platform Default</Text>
        <View style={styles.container}>
          <Text>Open up App.tsx to start working on your app!</Text>
        </View>
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
