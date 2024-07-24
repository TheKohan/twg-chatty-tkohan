import { RoomNavigationProp, RoomRouteProp } from '@chatty/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dimensions, Text, View } from 'react-native';
import { FC, useCallback, useState } from 'react';
import {
  Bubble,
  BubbleProps,
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  Send,
  SendProps,
} from 'react-native-gifted-chat';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER, GET_ROOM } from '@chatty/graphql';
import { mapToGiftedMessages, mapUserToGifted } from '@chatty/utils';
import { colors } from '@chatty/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@chatty/components';

/**
 * Theres an issue https://github.com/FaridSafi/react-native-gifted-chat/issues/2498
 * with the GiftedChat compability with expo sdk 51, don't have time for now to dig into it, causes warnings
 */

export const Room = () => {
  const { params } = useRoute<RoomRouteProp>();
  const { loading, error, data } = useQuery(GET_ROOM, {
    variables: { id: params.roomId },
    pollInterval: 1000,
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
      user={data.room.user ? mapUserToGifted(userData?.user) : undefined}
      onSend={onSend}
      renderBubble={props => <ChatBubble {...props} />}
      // isTyping={}
      // onInputTextChanged={}
      renderMessageImage={() => <Icon.profile width={40} height={40} />}
      renderFooter={() => <Text>Footer</Text>}
      renderInputToolbar={props => <ChatInput {...props} />}
      renderSend={props => <ChatSend {...props} />}
      keyboardShouldPersistTaps='always'
    />
  );
};

const ChatSend: FC<SendProps<IMessage>> = props => {
  const [pressed, setPressed] = useState(false);

  return (
    <Send
      {...props}
      containerStyle={{
        position: 'absolute',
        right: -50,
        top: 0,
      }}
      alwaysShowSend
      sendButtonProps={{
        activeOpacity: 1,
        onPressIn: () => setPressed(true),
        onPressOut: () => setPressed(false),
      }}
    >
      <Icon.send color={pressed ? colors.plum700 : colors.plum500} />
    </Send>
  );
};

const ChatInput: FC<InputToolbarProps<IMessage>> = props => {
  const insets = useSafeAreaInsets();

  return (
    <InputToolbar
      {...props}
      containerStyle={{
        borderRadius: 12,
        borderBottomRightRadius: 0,
        // width: Layout.window.width-80,
        backgroundColor: colors.blue300,
        padding: 12,
        paddingBottom: insets.bottom,
      }}
      primaryStyle={{
        backgroundColor: colors.white,
        width: Dimensions.get('window').width - 80,
      }}
    />
  );
};

const ChatBubble: FC<Readonly<BubbleProps<IMessage>>> = props => {
  return (
    <Bubble
      {...props}
      textStyle={{
        left: { color: colors.black },
        right: { color: colors.white },
      }}
      renderTime={() => null}
      wrapperStyle={{
        left: {
          padding: 4,
          backgroundColor: colors.white,
          borderBottomLeftRadius: 0,
        },
        right: {
          backgroundColor: colors.plum300,
          borderBottomRightRadius: 0,
        },
      }}
    />
  );
};
