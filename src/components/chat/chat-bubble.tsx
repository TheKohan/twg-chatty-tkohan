import { borders, colors } from '@chatty/theme';
import type { FC } from 'react';
import {
  type BubbleProps,
  type IMessage,
  Bubble,
} from 'react-native-gifted-chat';

export const ChatBubble: FC<Readonly<BubbleProps<IMessage>>> = (props) => {
  return (
    <Bubble
      {...props}
      textStyle={{
        left: { color: colors.black },
        right: { color: colors.white },
      }}
      renderTime={() => null}
      containerStyle={{
        left: { paddingBottom: 8, paddingLeft: 16 },
        right: { paddingBottom: 8, paddingRight: 16 },
      }}
      wrapperStyle={{
        left: {
          padding: 8,
          backgroundColor: colors.white,
          borderRadius: borders.sm,
          borderBottomLeftRadius: 0,
        },
        right: {
          padding: 8,
          backgroundColor: colors.plum300,
          borderRadius: borders.sm,
          borderBottomRightRadius: 0,
        },
      }}
    />
  );
};
