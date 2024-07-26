import { colors } from '@chatty/theme';
import type { FC } from 'react';
import { View, ActivityIndicator } from 'react-native';

export const Loader: FC = () => {
  return (
    <ActivityIndicator
      size='large'
      color={colors.plum500}
      style={{ paddingVertical: 12 }}
    />
  );
};
