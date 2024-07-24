import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { BaseButton, BaseButtonProps } from './base-button';
import { borders, colors } from '@chatty/theme';
import { MakeOptional } from '@chatty/utils';

type PublicButtonProps = MakeOptional<
  Omit<
    Required<BaseButtonProps>,
    | 'containerStyle'
    | 'containerStylePressed'
    | 'iconColor'
    | 'iconColorPressed'
  >,
  'disabled'
>;

type PrimaryButtonProps = {
  variant: 'primary';
} & Omit<PublicButtonProps, 'icon' | 'iconPosition'>;

type LabelButtonProps = {
  variant: 'label';
} & Required<
  Pick<PublicButtonProps, 'icon' | 'iconPosition' | 'label' | 'onPress'>
>;

type IconButtonProps = {
  variant: 'icon';
} & Omit<PublicButtonProps, 'label' | 'iconPosition'>;

type ButtonProps = PrimaryButtonProps | LabelButtonProps | IconButtonProps;

export const Button: React.FC<ButtonProps> = props => {
  const { variant, ...rest } = props;

  return (
    <BaseButton
      {...rest}
      iconColor={variant === 'primary' ? 'white' : 'plum500'}
      iconColorPressed={variant === 'primary' ? 'white' : 'plum700'}
      containerStyle={styles[variant]}
      containerStylePressed={pressedStyles[variant]}
    />
  );
};

const styles = StyleSheet.create({
  primary: {
    padding: 12,
    borderRadius: borders.sm,
    backgroundColor: colors.plum500,
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: borders.sm,
    backgroundColor: 'transparent',
  },
  icon: {
    padding: 12,
    borderRadius: borders.sm,
    backgroundColor: 'transparent',
  },
});

const pressedStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.plum700,
  },
  label: {},
  icon: {},
});
