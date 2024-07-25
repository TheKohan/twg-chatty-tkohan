import { RoomsNavigationProp } from '@chatty/types';
import { Icon, RoomList, StatusWrapper, Typography } from '@chatty/components';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { RoomsType, SingleRoomType } from '@chatty/__generated__/graphql';
import { timeAgo } from '@chatty/utils';
import { borders, colors } from '@chatty/theme';
import { useGetRoom, useGetRooms } from '@chatty/hooks';

export const Rooms = () => {
  const { loading, error, data, refetch } = useGetRooms();

  return (
    <StatusWrapper
      style={styles.roomsContainer}
      loading={loading}
      error={!!error}
      onTryAgain={refetch}
    >
      {data?.usersRooms && <RoomList userRooms={data.usersRooms} />}
    </StatusWrapper>
  );
};

const styles = StyleSheet.create({
  roomsContainer: {
    flex: 1,
    backgroundColor: colors.blue100,
    paddingHorizontal: 8,
  },
});
