import React, { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Icon, IconVariant } from '../icon';
import { Typography } from '../typography';
import { BaseButton, BaseButtonProps } from './base-button';
import { colors } from '@chatty/theme';

type ButtonProps = {
  variant: 'primary' | 'label';
} & Omit<BaseButtonProps, 'containerStyle' | 'iconColor'>;

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant,
  icon,
  iconPosition,
}) => {
  return (
    <BaseButton
      label={label}
      onPress={onPress}
      icon={icon}
      iconPosition={iconPosition}
      containerStyle={styles[variant]}
      iconColor={variant === 'primary' ? 'white' : 'plum500'}
    />
  );
};

const styles = StyleSheet.create({
  primary: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.plum500,
  },
  label: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
});
