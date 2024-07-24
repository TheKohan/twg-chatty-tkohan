import { useMutation } from '@apollo/client';
import { Button, Input, Loader, Typography } from '@chatty/components';
import { LOGIN_USER } from '@chatty/graphql';
import { colors } from '@chatty/theme';
import { RoomsNavigationProp } from '@chatty/types';
import { useNavigation } from '@react-navigation/native';
import { FC } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';

type FormValues = {
  email: string;
  password: string;
};

export const Login: FC = () => {
  const insets = useSafeAreaInsets();
  const { navigate } = useNavigation<RoomsNavigationProp>();
  const [loginUser, { error: loginError, loading }] = useMutation(LOGIN_USER);

  const { control, handleSubmit } = useForm<FieldValues>();

  const onSubmit = async (data: FieldValues) => {
    if (data.email && data.password) {
      const { email, password } = data as FormValues;
      const loginData = await loginUser({ variables: { email, password } });
      if (loginData.data?.loginUser?.token) {
        //@TODO: useAuth hook login
        SecureStore.setItem('token', loginData.data.loginUser.token);
      }
    }
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
          {loading && <Loader />}
          {loginError && (
            <Typography variant='specialText' color='error'>
              Something went wrong, please try again
            </Typography>
          )}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Button
          variant='primary'
          label='Log in'
          disabled={loading}
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
