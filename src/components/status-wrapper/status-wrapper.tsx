import { FC } from 'react';
import { Loader } from '../loader';
import { View } from 'react-native';
import { Typography } from '../typography';

type StatusWrapperProps<T extends object = any> = {
  loading?: boolean;
  error?: boolean;
  errorMessage?: string;
  data?: T;
  render: (data: T) => JSX.Element;
};

export const StatusWrapper: FC<StatusWrapperProps> = ({
  loading,
  error,
  errorMessage,
  data,
  render,
}) => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant='h4' color='error'>
          {errorMessage ? errorMessage : ' Error, something went wrong'}
        </Typography>
      </View>
    );
  }

  return <>{render(data)}</>;
};
