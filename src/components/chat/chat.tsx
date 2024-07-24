import { Text } from 'react-native';
import React, { FC, useCallback, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ROOM, SEND_MESSAGE } from '@chatty/graphql';
import { mapToGiftedMessages, mapUserToGifted } from '@chatty/utils';
import { Icon } from '../icon';
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

  const [sendMessageToRoom, { error: sendMessageError }] =
    useMutation(SEND_MESSAGE);

  const [messages, setMessages] = useState(
    mapToGiftedMessages(
      (data?.room?.messages ?? []).filter(message => message != null)
    )
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error || sendMessageError) {
    return <Text>Error! Something went wrong !</Text>;
  }

  if (!data?.room) {
    return <Text>Room not found!</Text>;
  }

  const onSend = useCallback(async (messages: IMessage[] = []) => {
    for (const message of messages) {
      await sendMessageToRoom({
        variables: {
          roomId: roomId,
          body: message.text,
        },
      });
    }
    /** TODO send via api */
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      inverted={true}
      user={data.room.user ? mapUserToGifted(user) : undefined}
      onSend={onSend}
      placeholder=''
      renderBubble={props => <ChatBubble {...props} />}
      // isTyping={}
      // onInputTextChanged={}
      alignTop={true}
      bottomOffset={-30}
      renderMessageImage={() => <Icon.profile width={40} height={40} />}
      renderInputToolbar={props => <ChatInput {...props} />}
      renderSend={props => <ChatSendButton {...props} />}
    />
  );
};
