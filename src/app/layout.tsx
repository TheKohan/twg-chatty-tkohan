import { PropsWithChildren } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';
import { colors, fontAssets } from '@chatty/theme';
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
    <View style={{ flex: 1, backgroundColor: colors.blue100 }}>
      <StatusBar style='auto' />
      {children}
    </View>
  );
};
