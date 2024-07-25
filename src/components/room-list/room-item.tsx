import { SingleRoomType } from '@chatty/__generated__/graphql';
import { useGetRoom } from '@chatty/hooks';
import { RoomsNavigationProp } from '@chatty/types';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, View, StyleSheet, Text } from 'react-native';
import { Icon } from '../icon';
import { Typography } from '../typography';
import { timeAgo } from '@chatty/utils';
import { colors, borders } from '@chatty/theme';

export const RoomItem: React.FC<{ room: SingleRoomType }> = ({ room }) => {
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
  roomsContainer: {
    flex: 1,
    backgroundColor: colors.blue100,
    paddingHorizontal: 8,
  },
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
