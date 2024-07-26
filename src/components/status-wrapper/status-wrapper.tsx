import type { FC, PropsWithChildren } from 'react';
import { Loader } from '../loader';
import {
  type StyleProp,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import { Typography } from '../typography';

type StatusWrapperProps = {
  loading?: boolean;
  error?: boolean;
  errorMessage?: string;
  onTryAgain?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const StatusWrapper: FC<PropsWithChildren<StatusWrapperProps>> = ({
  loading,
  error,
  errorMessage,
  children,
  style,
  onTryAgain,
}) => {
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Loader />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant='h4' color='error'>
          {errorMessage ? errorMessage : ' Error, something went wrong'}
        </Typography>
        {onTryAgain && (
          <TouchableOpacity onPress={onTryAgain}>
            <Typography variant='h4' color='plum500'>
              Try again
            </Typography>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return <View style={style}>{children}</View>;
};
