import { RoomRouteProp } from '@chatty/types';
import { useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '@chatty/graphql';
import { Chat } from '@chatty/components';

/**
 * Theres an issue https://github.com/FaridSafi/react-native-gifted-chat/issues/2498
 * with the GiftedChat compability with expo sdk 51, don't have time for now to dig into it, causes warnings
 */

export const Room = () => {
  const { params } = useRoute<RoomRouteProp>();
  const { data: userData } = useQuery(GET_CURRENT_USER);
  return <Chat roomId={params.roomId} user={userData?.user ?? undefined} />;
};
