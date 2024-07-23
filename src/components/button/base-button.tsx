import { Pressable, ViewStyle } from 'react-native';
import { Icon, IconVariant } from '../icon';
import { Typography } from '../typography';
import { ColorVariant } from '@chatty/theme';

export type BaseButtonProps = {
  label: string;
  onPress?: () => void;
  icon?: IconVariant;
  iconColor?: ColorVariant;
  iconPosition?: 'left' | 'right';
  containerStyle?: ViewStyle;
};

export const BaseButton: React.FC<BaseButtonProps> = ({
  label,
  onPress,
  icon,
  iconPosition,
  iconColor = 'white',
  containerStyle = {},
}) => {
  const ButtonIcon = icon ? Icon[icon] : null;

  return (
    <Pressable style={containerStyle} onPress={onPress}>
      {icon && iconPosition === 'left' && ButtonIcon && (
        <ButtonIcon color={iconColor} />
      )}
      <Typography variant='button'>{label}</Typography>
      {icon && iconPosition === 'right' && ButtonIcon && (
        <ButtonIcon color={iconColor} />
      )}
    </Pressable>
  );
};
