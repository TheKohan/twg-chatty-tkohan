import { Pressable, View, type ViewStyle } from 'react-native';
import { Icon, type IconVariant } from '../icon';
import { Typography } from '../typography';
import { colors, type ColorVariant } from '@chatty/theme';
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
  iconColor = 'black',
  iconColorPressed = 'black',
  disabled = false,
  containerStyle = {},
  containerStylePressed = {},
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const ButtonIcon = icon ? Icon[icon] : null;

  const getIconColor = () => {
    if (disabled) return colors.white;
    if (isPressed) return colors[iconColorPressed];
    return colors[iconColor];
  };

  const getTextColor = () => {
    if (disabled) return 'white';
    if (isPressed) return iconColorPressed;
    return iconColor;
  };

  return (
    <Pressable
      style={({ pressed }) => [
        containerStyle,
        pressed && !disabled ? containerStylePressed : {},
        disabled ? { backgroundColor: colors.gray300 } : {},
      ]}
      onPressIn={() => !disabled && setIsPressed(true)}
      onPressOut={() => !disabled && setIsPressed(false)}
      disabled={disabled}
      onPress={disabled ? undefined : onPress}
    >
      {icon && iconPosition === 'left' && ButtonIcon && (
        <View style={label ? { paddingRight: 8 } : {}}>
          <ButtonIcon color={getIconColor()} />
        </View>
      )}
      {label ? (
        <Typography color={getTextColor()} variant='button'>
          {label}
        </Typography>
      ) : null}
      {icon && iconPosition === 'right' && ButtonIcon && (
        <View style={{ paddingLeft: 8 }}>
          <ButtonIcon color={getIconColor()} />
        </View>
      )}
    </Pressable>
  );
};
