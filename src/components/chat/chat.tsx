import { Text, View } from 'react-native';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { mapToGiftedMessages, mapUserToGifted } from '@chatty/utils';
import { Icon } from '../icon';
import { Message, UserType } from '@chatty/__generated__/graphql';
import { ChatBubble } from './chat-bubble';
import { ChatInput } from './chat-input';
import { ChatSendButton } from './chat-send-button';
import {
  useGetRoom,
  useKeyboardVisible,
  useMessageAddedSubscription,
  useSendMessage,
  useSetTyping,
  useTypingSubscription,
} from '@chatty/hooks';
import { colors } from '@chatty/theme';
import { TypingIndicator } from './chat-typing-indicator';
/**
 * Theres an issue https://github.com/FaridSafi/react-native-gifted-chat/issues/2498
 * with the GiftedChat compability with expo sdk 51, don't have time for now to dig into it, causes warnings
 */

type ChatProps = {
  roomId: string;
  user?: UserType;
};

//@TODO: handle error and loading states gracefully
export const Chat: FC<ChatProps> = ({ roomId, user }) => {
  const [isTyping, setIsTyping] = useState(false);
  const isKeyboardVisible = useKeyboardVisible();
  const { loading, error, data } = useGetRoom({ roomId });

  const {
    data: typingUserData,
    error: subErr,
    loading: subLoading,
  } = useTypingSubscription({ roomId });

  const { data: messageAddedData } = useMessageAddedSubscription({ roomId });

  const [setTypingUser] = useSetTyping({ roomId });

  const [sendMessageToRoom, { error: sendMessageError }] = useSendMessage();

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

  useEffect(() => {
    if (!typingUserData) return;
    setIsTyping(true);
    const timeout = setTimeout(() => {
      setIsTyping(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [typingUserData]);

  useEffect(() => {
    if (!messageAddedData || !messageAddedData.messageAdded) return;
    const newMessage = messageAddedData.messageAdded as Message;
    console.log('new message', newMessage);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, mapToGiftedMessages([newMessage]))
    );
  }, [messageAddedData]);

  const onSend = useCallback(async (messages: IMessage[] = []) => {
    for (const message of messages) {
      await sendMessageToRoom({
        variables: {
          roomId: roomId,
          body: message.text,
        },
      });
    }
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.blue100 }}>
      <GiftedChat
        messages={messages}
        inverted={true}
        user={data.room.user ? mapUserToGifted(user) : undefined}
        onSend={onSend}
        placeholder=''
        renderFooter={() => isTyping && <TypingIndicator />}
        renderBubble={props => <ChatBubble {...props} />}
        isTyping={isTyping}
        onInputTextChanged={async message => {
          if (!message) return;
          console.log('setting typing user', roomId);
          await setTypingUser({ variables: { roomId } });
        }}
        bottomOffset={-30}
        messagesContainerStyle={{
          paddingBottom: !isKeyboardVisible ? 52 : undefined,
        }}
        renderMessageImage={() => <Icon.profile width={40} height={40} />}
        renderInputToolbar={props => <ChatInput {...props} />}
        renderSend={props => <ChatSendButton {...props} />}
        renderDay={() => <View />}
        renderAvatar={null}
      />
    </View>
  );
};
