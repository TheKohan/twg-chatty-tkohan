import { RoomList, StatusWrapper } from '@chatty/components';
import { StyleSheet } from 'react-native';
import { colors } from '@chatty/theme';
import { useGetRooms } from '@chatty/hooks';

export const Rooms = () => {
  const { loading, error, data, refetch } = useGetRooms({
    poolingInterval: 1000 * 3,
  });

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
