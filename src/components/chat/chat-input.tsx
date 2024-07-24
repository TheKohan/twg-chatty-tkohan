import React, { FC, useState } from 'react';
import { Dimensions } from 'react-native';
import {
  InputToolbarProps,
  IMessage,
  InputToolbar,
  Composer,
  ComposerProps,
} from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@chatty/theme';

export const ChatInput: FC<InputToolbarProps<IMessage>> = props => {
  const insets = useSafeAreaInsets();
  const [isFocused, setIsFocused] = useState(false);

  const renderComposer = (composerProps: ComposerProps) => (
    <Composer
      {...composerProps}
      textInputProps={{
        ...composerProps.textInputProps,
        onFocus: e => {
          setIsFocused(true);
          composerProps.textInputProps?.onFocus?.(e);
        },
        onBlur: e => {
          setIsFocused(false);
          composerProps.textInputProps?.onBlur?.(e);
        },
      }}
    />
  );

  return (
    <InputToolbar
      {...props}
      containerStyle={{
        borderRadius: 12,
        backgroundColor: colors.blue300,
        padding: 12,
        paddingBottom: insets.bottom,
      }}
      primaryStyle={{
        backgroundColor: colors.white,
        borderWidth: 2,
        borderColor: isFocused ? colors.plum500 : colors.white,
        borderRadius: 12,
        borderBottomRightRadius: 0,
        width: Dimensions.get('window').width - 80,
      }}
      renderComposer={renderComposer}
    />
  );
};
