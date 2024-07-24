import { Button, Input, Typography } from '@chatty/components';
import { colors } from '@chatty/theme';
import { RoomsNavigationProp } from '@chatty/types';
import { useNavigation } from '@react-navigation/native';
import { FC } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Login: FC = () => {
  const insets = useSafeAreaInsets();
  const { navigate } = useNavigation<RoomsNavigationProp>();

  const { control, handleSubmit } = useForm<FieldValues>();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 36, paddingBottom: insets.bottom },
      ]}
    >
      <View style={{ paddingHorizontal: 16, gap: 32 }}>
        <Typography variant='h1' color='plum500'>
          Welcome Back
        </Typography>
        <Typography variant='h2' color='white'>
          Log in and stay in touch with everyone!
        </Typography>
        <View style={{ paddingHorizontal: 12, gap: 16 }}>
          <Input
            control={control}
            name='email'
            label='email-address'
            rules={{
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
            }}
            keyboardType='email-address'
          />
          <Input
            control={control}
            name='password'
            label='Password'
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            }}
            secureTextEntry
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Button
          variant='primary'
          label='Log in'
          onPress={handleSubmit(onSubmit)}
        />
        <View style={styles.signUpContainer}>
          <Typography variant='bodyText' color='white'>
            Don't have an account?{' '}
          </Typography>
          <TouchableOpacity onPress={() => navigate('SignUp')}>
            <Typography variant='bodyText' color='plum500'>
              Sign up
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.blue300,
  },
  bottomContainer: {
    gap: 16,
    paddingHorizontal: 16,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
