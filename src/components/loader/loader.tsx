import { colors } from '@chatty/theme';
import { FC } from 'react';
import { View, ActivityIndicator } from 'react-native';

export const Loader: FC = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator
        size='large'
        color={colors.plum500}
        style={{ paddingVertical: 12 }}
      />
    </View>
  );
};
