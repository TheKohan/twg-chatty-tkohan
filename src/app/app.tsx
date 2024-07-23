import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@chatty/components';

export const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 30 }}>
        Poppins Medium
      </Text>

      <View>
        <Icon.phone />
      </View>

      <Text style={{ fontSize: 30 }}>Platform Default</Text>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
