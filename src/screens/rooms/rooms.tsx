import { RoomsNavigationProp } from '@chatty/types';
import { Icon, Typography } from '@chatty/components';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { RoomsType, SingleRoomType } from '@chatty/__generated__/graphql';
import { timeAgo } from '@chatty/utils';
import { borders, colors } from '@chatty/theme';
import { useGetRoom, useGetRooms } from '@chatty/hooks';

export const Rooms = () => {
  const { loading, error, data } = useGetRooms();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.blue100,
        paddingHorizontal: 8,
      }}
    >
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error!</Text>}
      {data?.usersRooms && <RoomList userRooms={data.usersRooms} />}
    </View>
  );
};

const RoomList: React.FC<{ userRooms: RoomsType }> = ({ userRooms }) => {
  return (
    <FlatList
      data={userRooms.rooms}
      keyExtractor={room => room?.id ?? ''}
      contentContainerStyle={{ gap: 12, paddingTop: 36 }}
      renderItem={({ item }) => (item ? <RoomItem room={item} /> : null)}
    />
  );
};
// TODO refactor all of this
const RoomItem: React.FC<{ room: SingleRoomType }> = ({ room }) => {
  const { navigate } = useNavigation<RoomsNavigationProp>();
  const { loading, data, error } = useGetRoom({ roomId: room.id ?? '' });

  const lastMessage = data?.room?.messages?.[0]?.body ?? '';
  const dateAgo = new Date(data?.room?.messages?.[0]?.insertedAt ?? '');

  return (
    <Pressable
      style={({ pressed }) => (pressed ? { elevation: 3 } : {})}
      onPress={() =>
        navigate('Room', { roomId: room.id ?? '', roomName: room.name ?? '' })
      }
    >
      <View style={styles.roomItemContainer}>
        <Icon.profile />
        <RoomItemActivityDisplay dateAgo={dateAgo} />
        <View style={{ flex: 1, paddingTop: 12 }}>
          {loading && <Text>Loading...</Text>}
          {error && <Text>Error!</Text>}
          {data && (
            <>
              <Typography
                numberOfLines={1}
                ellipsizeMode='tail'
                variant='titleInput'
                color='black'
              >
                {room.name}
              </Typography>
              <Typography
                numberOfLines={1}
                ellipsizeMode='tail'
                variant='bodyText'
                color='black'
              >
                {lastMessage}
              </Typography>
            </>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const RoomItemActivityDisplay: React.FC<{
  dateAgo: Date;
}> = ({ dateAgo }) => {
  const lastMessageDate = timeAgo(dateAgo);
  //@TODO: handle green dot scenarios
  return (
    <Typography
      variant='captionText'
      color='gray500'
      style={{
        textAlign: 'right',
        position: 'absolute',
        right: 16,
        top: 8,
      }}
    >
      {lastMessageDate}
    </Typography>
  );
};

const styles = StyleSheet.create({
  roomItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    gap: 12,
    padding: 12,
    borderRadius: borders.sm,
  },
});
