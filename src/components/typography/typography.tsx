import {
  colors,
  ColorVariant,
  typography,
  TypographyVariant,
} from '@chatty/theme';
import {
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  TextProps,
} from 'react-native';
import { PropsWithChildren } from 'react';

type TypographyProps = {
  variant: TypographyVariant;
  color?: ColorVariant;
  style?: StyleProp<TextStyle>;
} & TextProps;

export const Typography: React.FC<PropsWithChildren<TypographyProps>> = ({
  children,
  variant,
  color = 'black',
  style,
  ...textProps
}) => {
  return (
    <Text
      {...textProps}
      style={[styles[variant], { color: colors[color] }, style]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  ...typography,
});
