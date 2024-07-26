import type React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetRoom } from '@chatty/hooks';
import { useAuth } from '@chatty/context';
import { Typography } from '../typography';
import {
  dateTimeFromUTCString,
  getUserNameFromMessages,
  timeAgoFromUTC,
} from '@chatty/utils';
import { StatusWrapper } from '../status-wrapper';
import type { SingleRoomType } from '@chatty/__generated__/graphql';
import type { RoomsNavigationProp } from '@chatty/types';
import { Icon } from '../icon';
import { DateTime } from 'luxon';
import { colors, borders } from '@chatty/theme';

const ROOM_POOL_INTERVAL = 2000 * 1; // 2 seconds

export const RoomItem: React.FC<{ room: SingleRoomType }> = ({ room }) => {
  const { navigate } = useNavigation<RoomsNavigationProp>();
  const { user } = useAuth();
  const { data, loading, error, refetch } = useGetRoom({
    roomId: room.id ?? '',
    pollInterval: ROOM_POOL_INTERVAL,
  });

  const lastMessage = data?.room?.messages?.[0];
  const isLastMessageNotByMe = lastMessage?.user?.id !== user?.id;

  const lastMessageDate = dateTimeFromUTCString(
    lastMessage?.insertedAt ?? '',
  );
  const lessThanOneMinuteAgo =
  DateTime.utc().diff(lastMessageDate, ['seconds']).seconds < 60;

  const isActive = lessThanOneMinuteAgo && isLastMessageNotByMe;
  const timeAgo = timeAgoFromUTC(lastMessageDate);
  const otherUserName = getUserNameFromMessages(
    user?.id ?? '',
    (data?.room?.messages ?? []).filter((m) => m != null),
  );

  const navigateToRoom = () =>
    navigate('Room', { roomId: room.id ?? '', roomName: otherUserName });

  return (
    <TouchableOpacity onPress={navigateToRoom} activeOpacity={0.8}>
      <StatusWrapper
        loading={loading}
        error={!!error}
        onTryAgain={refetch}
        style={[styles.container, isActive && styles.active]}
      >
        <Icon.profile />
        {isActive ? (
          <View style={styles.dot} />
        ) : (
          <Typography
            variant='captionText'
            color='gray500'
            style={styles.dateText}
          >
            {timeAgo}
          </Typography>
        )}
        <View style={styles.content}>
          <Typography
            variant='titleInput'
            color={isActive ? 'white' : 'black'}
            numberOfLines={1}
          >
            {room.name}
          </Typography>
          <Typography
            variant='bodyText'
            color={isActive ? 'white' : 'black'}
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
