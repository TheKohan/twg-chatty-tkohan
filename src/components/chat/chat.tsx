import React, { type FC, useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { GiftedChat, type IMessage } from 'react-native-gifted-chat';
import type { Message, UserType } from '@chatty/__generated__/graphql';
import { mapToGiftedMessage, mapUserToGifted } from '@chatty/utils';
import { colors } from '@chatty/theme';
import {
  useMessageAddedSubscription,
  useSendMessage,
  useSetTyping,
  useTypingSubscription,
} from '@chatty/hooks';
import { Icon } from '../icon';
import { ChatBubble } from './chat-bubble';
import { ChatInput } from './chat-input';
import { ChatSendButton } from './chat-send-button';
import { TypingIndicator } from './chat-typing-indicator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ChatProps {
  roomId: string;
  initialMessages?: Message[];
  user?: UserType;
}

const TYPING_TIMEOUT = 3000;

export const Chat: FC<ChatProps> = ({ roomId, user, initialMessages = [] }) => {
  const insets = useSafeAreaInsets();
  const { data: messageAddedData } = useMessageAddedSubscription({ roomId });
  const typingSub = useTypingSubscription({ roomId });
  const [setTypingUser] = useSetTyping({ roomId });
  const [sendMessageToRoom] = useSendMessage();

  const [messages, setMessages] = useState<IMessage[]>(
    initialMessages.map(mapToGiftedMessage),
  );
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!typingSub.data) return;
    if (typingSub.data.typingUser?.id === user?.id) return;

    setIsTyping(true);
    const timeout = setTimeout(() => setIsTyping(false), TYPING_TIMEOUT);
    return () => clearTimeout(timeout);
  }, [typingSub.data, user?.id]);

  useEffect(() => {
    const message = messageAddedData?.messageAdded;
    if (!message) return;

    setMessages((prevMessages) =>
      GiftedChat.append(prevMessages, [mapToGiftedMessage(message)]),
    );
  }, [messageAddedData]);

  const handleSend = useCallback(
    async (newMessages: IMessage[] = []) => {
      for (const message of newMessages) {
        try {
          await sendMessageToRoom({
            variables: { roomId, body: message.text },
          });
        } catch (e) {
          console.error(e);
        }
      }
    },
    [roomId, sendMessageToRoom],
  );

  const handleInputTextChanged = useCallback(
    async (text: string) => {
      if (!text) return;
      try {
        await setTypingUser({ variables: { roomId } });
      } catch (e) {
        console.error(e);
      }
    },
    [roomId, setTypingUser],
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.blue100 }}>
      <GiftedChat
        messages={messages}
        user={user ? mapUserToGifted(user) : undefined}
        onSend={handleSend}
        onInputTextChanged={handleInputTextChanged}
        isTyping={isTyping}
        inverted={true}
        placeholder=''
        bottomOffset={-30}
        messagesContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        renderFooter={() => isTyping && <TypingIndicator />}
        renderBubble={(props) => <ChatBubble {...props} />}
        renderInputToolbar={(props) => <ChatInput {...props} />}
        renderSend={(props) => <ChatSendButton {...props} />}
        renderMessageImage={() => <Icon.profile width={40} height={40} />}
        renderDay={() => <View />}
        renderAvatar={null}
      />
    </View>
  );
};
