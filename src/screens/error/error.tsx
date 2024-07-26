import { Typography } from '@chatty/components';
import { colors } from '@chatty/theme';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

export const ErrorScreen = ({ onReset }: { onReset: () => void }) => {
  return (
    <View style={styles.container}>
      <Typography variant='h4' color='error'>
        Something went wrong, please try again
      </Typography>
      <TouchableOpacity onPress={onReset}>
        <Typography variant='h4' color='plum500'>
          Reload
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue100,
  },
});
