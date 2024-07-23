import {
  colors,
  ColorVariant,
  typography,
  TypographyVariant,
} from '@chatty/theme';
import { Text, StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';

type TypographyProps = {
  variant: TypographyVariant;
  color?: ColorVariant;
};

export const Typography: React.FC<PropsWithChildren<TypographyProps>> = ({
  children,
  variant,
  color = 'black',
}) => {
  return (
    <Text style={[styles[variant], { color: colors[color] }]}>{children}</Text>
  );
};

const styles = StyleSheet.create({
  ...typography,
});
