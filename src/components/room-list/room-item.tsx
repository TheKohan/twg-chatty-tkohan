import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetRoom } from '@chatty/hooks';
import { useAuth } from '@chatty/context';
import { Typography } from '../typography';
import { timeAgo } from '@chatty/utils';
import { StatusWrapper } from '../status-wrapper';
import { SingleRoomType } from '@chatty/__generated__/graphql';
import { RoomsNavigationProp } from '@chatty/types';
import { Icon } from '../icon';
import { DateTime } from 'luxon';
import { colors, borders } from '@chatty/theme';

export const RoomItem: React.FC<{ room: SingleRoomType }> = ({ room }) => {
  const { navigate } = useNavigation<RoomsNavigationProp>();
  const { user } = useAuth();
  const { data, loading, error, refetch } = useGetRoom({
    roomId: room.id ?? '',
    pollInterval: 1000 * 3,
  });

  const lastMessage = data?.room?.messages?.[0];
  const isLastMessageNotByMe = lastMessage?.user?.id !== user?.id;
  const dateAgo = DateTime.fromISO(lastMessage?.insertedAt ?? '');
  const active =
    dateAgo.diffNow('minutes').minutes > -1 && isLastMessageNotByMe;

  const navigateToRoom = () =>
    navigate('Room', { roomId: room.id ?? '', roomName: room.name ?? '' });

  return (
    <TouchableOpacity onPress={navigateToRoom} activeOpacity={0.8}>
      <StatusWrapper
        loading={loading}
        error={!!error}
        onTryAgain={refetch}
        style={[styles.container, active && styles.active]}
      >
        <Icon.profile />
        {active ? (
          <View style={styles.dot} />
        ) : (
          <Typography
            variant='captionText'
            color='gray500'
            style={styles.dateText}
          >
            {timeAgo(dateAgo)}
          </Typography>
        )}
        <View style={styles.content}>
          <Typography
            variant='titleInput'
            color={active ? 'white' : 'black'}
            numberOfLines={1}
          >
            {room.name}
          </Typography>
          <Typography
            variant='bodyText'
            color={active ? 'white' : 'black'}
            numberOfLines={1}
          >
            {lastMessage?.body ?? ''}
          </Typography>
        </View>
      </StatusWrapper>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: borders.sm,
    gap: 12,
  },
  active: {
    backgroundColor: colors.plum500,
  },
  dateText: {
    position: 'absolute',
    right: 16,
    top: 8,
  },
  dot: {
    backgroundColor: colors.active,
    height: 12,
    width: 12,
    borderRadius: 6,
    position: 'absolute',
    right: 12,
    top: 12,
  },
  content: {
    flex: 1,
    paddingTop: 12,
  },
});
