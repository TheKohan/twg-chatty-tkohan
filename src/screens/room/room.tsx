import { RoomRouteProp } from '@chatty/types';
import { useRoute } from '@react-navigation/native';
import { Chat } from '@chatty/components';
import { useAuth } from '@chatty/context';

/**
 * Theres an issue https://github.com/FaridSafi/react-native-gifted-chat/issues/2498
 * with the GiftedChat compability with expo sdk 51, don't have time for now to dig into it, causes warnings
 */

export const Room = () => {
  const { params } = useRoute<RoomRouteProp>();
  const { user } = useAuth();
  return <Chat roomId={params.roomId} user={user} />;
};
