import { colors } from '@chatty/theme';
import { type FC, useState } from 'react';
import { type SendProps, type IMessage, Send } from 'react-native-gifted-chat';
import { Icon } from '../icon';

export const ChatSendButton: FC<SendProps<IMessage>> = (props) => {
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
