import { useMutation } from '@apollo/client';
import { Button, Input, Loader, Typography } from '@chatty/components';
import { LOGIN_USER, REGISTER_USER } from '@chatty/graphql';
import { colors } from '@chatty/theme';
import { RoomsNavigationProp } from '@chatty/types';
import { useNavigation } from '@react-navigation/native';
import { FC } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';

type FormValues = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
};

export const SignUp: FC = () => {
  const insets = useSafeAreaInsets();
  const { navigate } = useNavigation<RoomsNavigationProp>();
  const [signUp, { error: signUpError, loading: signUpLoading }] =
    useMutation(REGISTER_USER);
  const [loginUser, { error: loginError, loading: loginLoading }] =
    useMutation(LOGIN_USER);

  const { control, handleSubmit } = useForm<FieldValues>();

  const loading = signUpLoading || loginLoading;
  const error = signUpError || loginError;

  const onSubmit = async (data: FieldValues) => {
    if (
      data.email &&
      data.firstName &&
      data.lastName &&
      data.password &&
      data.passwordConfirmation
    ) {
      const formData = data as FormValues;
      //@TODO: useAuth hook login

      const registerData = await signUp({
        variables: formData,
      });

      if (!registerData.errors) {
        const loginData = await loginUser({ variables: formData });
        if (loginData.data?.loginUser?.token) {
          SecureStore.setItem('token', loginData.data.loginUser.token);
        }
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
          Create account
        </Typography>
        <View style={{ paddingHorizontal: 12, gap: 16 }}>
          <Input
            control={control}
            name='email'
            label='e-mail address'
            rules={{
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
            }}
            keyboardType='email-address'
          />
          <Input
            control={control}
            name='firstName'
            label='first name'
            rules={{
              required: 'First name is required',
            }}
          />
          <Input
            control={control}
            name='lastName'
            label='last name'
            rules={{
              required: 'Last name is required',
            }}
          />
          <Input
            control={control}
            name='password'
            label='password'
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            }}
            secureTextEntry
          />
          <Input
            control={control}
            name='passwordConfirmation'
            label='password confirmation'
            rules={{
              required: 'Password confirmation is required',
              validate: value =>
                value === control._formValues.password ||
                'Passwords do not match',
            }}
            secureTextEntry
          />
          {loading && <Loader />}
          {error && (
            <Typography variant='specialText' color='error'>
              Something went wrong, please try again
            </Typography>
          )}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Button
          variant='primary'
          label='Sign up'
          disabled={loading}
          onPress={handleSubmit(onSubmit)}
        />
        <View style={styles.termsContainer}>
          <Typography variant='captionText' color='white'>
            By signing up you agree with{' '}
          </Typography>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://www.random.org/terms/2020-08-01/website')
            }
          >
            <Typography variant='captionText-underline' color='blue500'>
              Terms and Conditions
            </Typography>
          </TouchableOpacity>
          <Typography variant='captionText' color='white'>
            {' '}
            and{' '}
          </Typography>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://www.random.org/terms/2020-08-01/privacy')
            }
          >
            <Typography variant='captionText-underline' color='blue500'>
              Privacy Policy
            </Typography>
          </TouchableOpacity>
        </View>
        <View style={styles.logInContainer}>
          <Typography variant='bodyText' color='white'>
            Already have an account?{' '}
          </Typography>
          <TouchableOpacity onPress={() => navigate('Login')}>
            <Typography variant='bodyText' color='plum500'>
              Log in
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
  logInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    marginHorizontal: 'auto',
  },
});
