import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../icon';
import { Typography } from '../typography';
import { RoomRouteProp, RootStackParamList } from '@chatty/types';
import { colors, borders } from '@chatty/theme';
import { Button } from '../button';

export const Header: FC<NativeStackHeaderProps> = ({
  route,
  back,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const routeName = route.name as keyof RootStackParamList;
  const roomParams =
    routeName === 'Room' ? (route.params as RoomRouteProp) : null;

  return (
    <View style={[headerStyles.container, { paddingTop: insets.top }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {back ? (
          <Button variant='icon' icon='back' onPress={navigation.goBack} />
        ) : (
          <Typography variant='h1' color='plum500'>
            {route.name}
          </Typography>
        )}
        {roomParams ? <></> : null}
      </View>
      <View style={headerStyles.iconContainer}>
        {roomParams ? (
          <>
            <Icon.phone />
            <Icon.videocall />
          </>
        ) : (
          <>
            <Icon.search />
            <Icon.rooms />
          </>
        )}
      </View>
    </View>
  );
};

export const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
