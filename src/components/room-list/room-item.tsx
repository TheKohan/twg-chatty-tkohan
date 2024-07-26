import React, { useEffect, useState } from 'react';
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
import { SingleRoomType } from '@chatty/__generated__/graphql';
import { RoomsNavigationProp } from '@chatty/types';
import { Icon } from '../icon';
import { DateTime } from 'luxon';
import { colors, borders } from '@chatty/theme';

const ROOM_POOL_INTERVAL = 1000 * 10; // 10 seconds

export const RoomItem: React.FC<{ room: SingleRoomType }> = ({ room }) => {
  const [active, setActive] = useState(false);
  const [timeAgo, setTimeAgo] = useState('');

  const { navigate } = useNavigation<RoomsNavigationProp>();
  const { user } = useAuth();
  const { data, loading, error, refetch } = useGetRoom({
    roomId: room.id ?? '',
    pollInterval: 1000 * 10,
  });

  const lastMessage = data?.room?.messages?.[0];
  const isLastMessageNotByMe = lastMessage?.user?.id !== user?.id;

  useEffect(() => {
    const updateTimeAgo = () => {
      if (!lastMessage) return;
      const lastMessageDate = dateTimeFromUTCString(
        lastMessage?.insertedAt ?? ''
      );

      const nowUTC = DateTime.utc();
      const isActive = nowUTC.diff(lastMessageDate, ['seconds']).seconds < 60;

      setActive(isActive);
      setTimeAgo(timeAgoFromUTC(lastMessageDate));
    };
    updateTimeAgo();

    const interval = setInterval(updateTimeAgo, ROOM_POOL_INTERVAL);
    return () => clearInterval(interval);
  }, [lastMessage, isLastMessageNotByMe]);

  const otherUserName = getUserNameFromMessages(
    user?.id ?? '',
    (data?.room?.messages ?? []).filter(m => m != null)
  );

  const navigateToRoom = () =>
    navigate('Room', { roomId: room.id ?? '', roomName: otherUserName });

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
            {timeAgo}
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
