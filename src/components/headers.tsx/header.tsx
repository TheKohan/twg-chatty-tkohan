import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../icon';
import { Typography } from '../typography';
import { RootStackParamList } from '@chatty/types';
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
    routeName === 'Room' ? (route.params as RootStackParamList['Room']) : null;
  return (
    <View
      style={{
        backgroundColor: colors.blue100,
      }}
    >
      <View style={[headerStyles.container, { paddingTop: insets.top }]}>
        <View style={headerStyles.contentContainer}>
          <View style={headerStyles.leftContainer}>
            {back ? (
              <Button variant='icon' icon='back' onPress={navigation.goBack} />
            ) : (
              <Typography variant='h1' color='plum500'>
                {route.name}
              </Typography>
            )}
            {roomParams && (
              <View style={headerStyles.roomInfoContainer}>
                <Icon.profile width={44} height={44} />
                <View style={headerStyles.textContainer}>
                  <Typography
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    variant='h4-header'
                    color='plum500'
                  >
                    {roomParams.roomName}
                  </Typography>
                  <Typography variant='bodyText' color='white'>
                    Active now
                  </Typography>
                </View>
              </View>
            )}
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
      </View>
    </View>
  );
};

export const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue300,
    borderBottomRightRadius: borders.lg,
    borderBottomLeftRadius: borders.lg,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8, // Add some margin to separate from icons
  },
  roomInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
