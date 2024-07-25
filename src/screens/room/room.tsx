import { RoomRouteProp } from '@chatty/types';
import { useRoute } from '@react-navigation/native';
import { Chat, StatusWrapper } from '@chatty/components';
import { useAuth } from '@chatty/context';
import { useGetRoom } from '@chatty/hooks';

/**
 * Theres an issue https://github.com/FaridSafi/react-native-gifted-chat/issues/2498
 * with the GiftedChat compability with expo sdk 51, don't have time for now to dig into it, causes warnings
 */

export const Room = () => {
  const { params } = useRoute<RoomRouteProp>();
  const { user } = useAuth();
  const { data, loading, error, refetch } = useGetRoom({
    roomId: params.roomId,
  });

  const initialMessages = (data?.room?.messages ?? []).filter(v => v != null);

  return (
    <StatusWrapper
      loading={loading}
      error={!!error}
      onTryAgain={refetch}
      style={{ flex: 1 }}
    >
      <Chat
        roomId={params.roomId}
        user={user}
        initialMessages={initialMessages}
      />
    </StatusWrapper>
  );
};
