import { PropsWithChildren } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, fontAssets } from '@chatty/theme';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const [loaded, error] = useFonts(fontAssets);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar backgroundColor={colors.blue300} style='auto' />
      <View style={{ flex: 1 }}>{children}</View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
