import { Text } from 'react-native';
import React, { FC, useCallback, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useQuery } from '@apollo/client';
import { GET_ROOM } from '@chatty/graphql';
import { mapToGiftedMessages, mapUserToGifted } from '@chatty/utils';
import { Icon } from '@chatty/components';
import { UserType } from '@chatty/__generated__/graphql';
import { ChatBubble } from './chat-bubble';
import { ChatInput } from './chat-input';
import { ChatSendButton } from './chat-send-button';

/**
 * Theres an issue https://github.com/FaridSafi/react-native-gifted-chat/issues/2498
 * with the GiftedChat compability with expo sdk 51, don't have time for now to dig into it, causes warnings
 */

type ChatProps = {
  roomId: string;
  user?: UserType;
};

export const Chat: FC<ChatProps> = ({ roomId, user }) => {
  const { loading, error, data } = useQuery(GET_ROOM, {
    variables: { id: roomId },
    pollInterval: 1000,
  });

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
    console.log(messages);
    /** TODO send via api */
    setMessages(previousMessages =>
      GiftedChat.prepend(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      inverted={false}
      user={data.room.user ? mapUserToGifted(user) : undefined}
      onSend={onSend}
      renderBubble={props => <ChatBubble {...props} />}
      // isTyping={}
      // onInputTextChanged={}
      renderMessageImage={() => <Icon.profile width={40} height={40} />}
      renderFooter={() => <Text>Footer</Text>}
      renderInputToolbar={props => <ChatInput {...props} />}
      renderSend={props => <ChatSendButton {...props} />}
      keyboardShouldPersistTaps='always'
    />
  );
};
