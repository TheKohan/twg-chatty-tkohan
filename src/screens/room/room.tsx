import { RoomNavigationProp, RoomRouteProp } from '@chatty/types';
import { Button } from '@chatty/components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER, GET_ROOM } from '@chatty/graphql';
import { mapToGiftedMessages, mapUserToGifted } from '@chatty/utils';

export const Room = () => {
  const navigation = useNavigation<RoomNavigationProp>();
  const { params } = useRoute<RoomRouteProp>();
  const { loading, error, data } = useQuery(GET_ROOM, {
    variables: { id: params.roomId },
  });
  const { data: userData } = useQuery(GET_CURRENT_USER);

  const [messages, setMessages] = useState(
    mapToGiftedMessages(
      (data?.room?.messages ?? []).filter(message => message != null)
    )
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error!</Text>;
  }

  if (!data?.room) {
    return <Text>Room not found!</Text>;
  }

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        inverted={false}
        user={data.room.user ? mapUserToGifted(userData?.user) : undefined}
        onSend={onSend}
        renderBubble={props => <Text>{props.currentMessage?.text}</Text>}
        // isTyping={}
        // onInputTextChanged={}
        renderFooter={() => <Text>Footer</Text>}
        renderInputToolbar={props => <Text>Text Input</Text>}
        alwaysShowSend
        renderSend={props => <Text>SEND</Text>}
        keyboardShouldPersistTaps='always'
      />
      <Button
        variant='primary'
        label='Go to rooms'
        onPress={() => navigation.navigate('Rooms')}
      />
    </View>
  );
};
