import { FC, PropsWithChildren } from 'react';
import { Loader } from '../loader';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { Typography } from '../typography';

type StatusWrapperProps = {
  loading?: boolean;
  error?: boolean;
  errorMessage?: string;
  onTryAgain?: () => void;
  style?: ViewStyle;
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
        <Typography variant='h3' color='error'>
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
