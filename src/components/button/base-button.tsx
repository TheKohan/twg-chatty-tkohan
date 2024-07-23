import { Pressable, View, ViewStyle } from 'react-native';
import { Icon, IconVariant } from '../icon';
import { Typography } from '../typography';
import { ColorVariant } from '@chatty/theme';
import { useState } from 'react';

export type BaseButtonProps = {
  label?: string;
  onPress: () => void;
  icon?: IconVariant;
  iconColor?: ColorVariant;
  iconColorPressed?: ColorVariant;
  iconPosition?: 'left' | 'right';
  containerStyle?: ViewStyle;
  containerStylePressed?: ViewStyle;
  disabled?: boolean;
};

export const BaseButton: React.FC<BaseButtonProps> = ({
  label,
  onPress,
  icon,
  iconPosition = 'left',
  iconColor,
  iconColorPressed,
  disabled = false,
  containerStyle = {},
  containerStylePressed = {},
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const ButtonIcon = icon ? Icon[icon] : null;

  return (
    <Pressable
      style={({ pressed }) => [
        containerStyle,
        pressed ? containerStylePressed : {},
        disabled ? { opacity: 0.5 } : {},
      ]}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={disabled}
      onPress={onPress}
    >
      {icon && iconPosition === 'left' && ButtonIcon && (
        <View style={{ paddingRight: 8 }}>
          <ButtonIcon color={iconColor} />
        </View>
      )}
      <Typography
        color={isPressed ? iconColor : iconColorPressed}
        variant='button'
      >
        {label}
      </Typography>
      {icon && iconPosition === 'right' && ButtonIcon && (
        <View style={{ paddingLeft: 8 }}>
          <ButtonIcon color={iconColor} />
        </View>
      )}
    </Pressable>
  );
};
