import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '@chatty/types';
import { colors, borders } from '@chatty/theme';
import { useAuth } from '@chatty/context';
import { HeaderLeft } from './header-left';
import { HeaderRight } from './header-right';

export type RoomParams = RootStackParamList['Room'];

export const Header: FC<NativeStackHeaderProps> = ({
  route,
  back,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { logout } = useAuth();

  const routeName = route.name as keyof RootStackParamList;
  const roomParams = routeName === 'Room' ? (route.params as RoomParams) : null;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.contentContainer}>
          <HeaderLeft
            routeName={routeName}
            roomParams={roomParams}
            back={!!back}
            onBack={navigation.goBack}
          />
          <HeaderRight roomParams={roomParams} onLogout={logout} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.blue100,
  },
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
});
