import { View, StyleSheet } from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import { Rooms, Room } from '@chatty/screens';
import { FC } from 'react';
import { Icon, Typography } from '@chatty/components';
import { borders, colors } from '@chatty/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '@chatty/types';

//@TODO: export this
const Stack = createNativeStackNavigator<RootStackParamList>();

export const App = () => {
  return (
    <Stack.Navigator initialRouteName='Rooms'>
      <Stack.Screen
        options={{ header: Header }}
        name='Rooms'
        component={Rooms}
      />
      <Stack.Screen options={{ header: Header }} name='Room' component={Room} />
    </Stack.Navigator>
  );
};

const Header: FC<NativeStackHeaderProps> = ({ route }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Typography variant='h1' color='plum500'>
        {route.name}
      </Typography>
      <View style={styles.iconContainer}>
        <Icon.search />
        <Icon.rooms />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.blue300,
    borderBottomRightRadius: borders.lg,
    borderBottomLeftRadius: borders.lg,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
