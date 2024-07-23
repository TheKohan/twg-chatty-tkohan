import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Icon } from '@chatty/components';

export const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 30 }}>
        Poppins Medium
      </Text>
      <Button
        label='This is a primary button'
        variant='primary'
        onPress={() => console.log('Primary clicked')}
      />
      <Button
        label='This is a label button'
        variant='label'
        onPress={() => console.log('Label clicked')}
        icon='profile'
        iconPosition='right'
      />
      <Button
        variant='icon'
        onPress={() => console.log('Icon clicked')}
        icon='profile'
      />
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
