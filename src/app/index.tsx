import { AuthProvider, useAuth } from '@chatty/context';
import { Router } from './router';
import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { client } from './apollo';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { fontAssets } from '@chatty/theme';
import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorScreen } from '@chatty/screens';

LogBox.ignoreLogs(['Avatar: Support for defaultProps']);
SplashScreen.preventAutoHideAsync();

const AppContent = () => {
  const { user } = useAuth();
  const [loaded, error] = useFonts(fontAssets);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded) return null;

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StatusBar style='auto' />
        <Router isAuthenticated={!!user} />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <ErrorBoundary
      FallbackComponent={({ resetErrorBoundary }) => (
        <ErrorScreen onReset={resetErrorBoundary} />
      )}
    >
      <ApolloProvider client={client}>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ApolloProvider>
    </ErrorBoundary>
  );
};
