import { colors } from '@chatty/theme';
import { FC } from 'react';
import { BubbleProps, IMessage, Bubble } from 'react-native-gifted-chat';

export const ChatBubble: FC<Readonly<BubbleProps<IMessage>>> = props => {
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
