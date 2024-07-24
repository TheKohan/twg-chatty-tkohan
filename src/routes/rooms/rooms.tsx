import { useQuery } from '@apollo/client';
import { RoomsNavigationProp } from '@chatty/types';
import { Button, Icon, Typography } from '@chatty/components';
import { GET_ALL_ROOMS, GET_ROOM } from '@chatty/graphql';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { RoomsType, SingleRoomType } from '@chatty/__generated__/graphql';
import { timeAgo } from '@chatty/utils';
import { borders, colors } from '@chatty/theme';

export const Rooms = () => {
  const { loading, error, data } = useQuery(GET_ALL_ROOMS);

  return (
    <View style={{ flex: 1 }}>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error!</Text>}
      {data?.usersRooms && <RoomList userRooms={data.usersRooms} />}
    </View>
  );
};

const RoomList: React.FC<{ userRooms: RoomsType }> = ({ userRooms }) => {
  return (
    <View style={{ flex: 1, gap: 8, padding: 8 }}>
      {userRooms.rooms?.map(room => {
        if (!room) return null;

        return <>{room.id && <RoomItem key={room.id} room={room} />}</>;
      })}
    </View>
  );
};

const RoomItem: React.FC<{ room: SingleRoomType }> = ({ room }) => {
  const { navigate } = useNavigation<RoomsNavigationProp>();
  const { loading, data, error } = useQuery(GET_ROOM, {
    variables: { id: room.id ?? '' },
  });

  const lastMessage = data?.room?.messages?.[0]?.body ?? '';
  const dateAgo = new Date(data?.room?.messages?.[0]?.insertedAt ?? '');

  return (
    <Pressable onPress={() => navigate('Room', { roomId: room.id ?? '' })}>
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
