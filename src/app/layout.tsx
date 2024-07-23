import { PropsWithChildren } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fontAssets } from '@chatty/theme';

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
    <View style={styles.container}>
      <Text style={{ fontFamily: 'Inter-Black', fontSize: 30 }}>
        Inter Black
      </Text>
      <Text style={{ fontSize: 30 }}>Platform Default</Text>
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
