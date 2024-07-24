import { colors } from '@chatty/theme';
import { FC } from 'react';
import { Dimensions } from 'react-native';
import {
  InputToolbarProps,
  IMessage,
  InputToolbar,
} from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ChatInput: FC<InputToolbarProps<IMessage>> = props => {
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
