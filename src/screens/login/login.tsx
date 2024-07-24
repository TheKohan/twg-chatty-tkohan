import { Typography } from '@chatty/components';
import { colors } from '@chatty/theme';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Login: FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 36 }]}>
      <Typography
        variant='h1'
        style={{ paddingHorizontal: 16 }}
        color='plum500'
      >
        Welcome Back
      </Typography>
      <Typography
        style={{ paddingHorizontal: 16, paddingTop: 24 }}
        variant='h2'
        color='white'
      >
        Log in and stay in touch with everyone!
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue300,
  },
});
