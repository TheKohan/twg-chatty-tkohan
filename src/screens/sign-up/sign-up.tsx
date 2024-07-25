import { useMutation } from '@apollo/client';
import { Button, Input, Loader, Typography } from '@chatty/components';
import { LOGIN_USER, REGISTER_USER } from '@chatty/graphql';
import { colors } from '@chatty/theme';
import { RoomsNavigationProp } from '@chatty/types';
import { useNavigation } from '@react-navigation/native';
import { FC } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Linking,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '@chatty/context';

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
  const { loading, error, signUp } = useAuth();

  const { control, handleSubmit } = useForm<FieldValues>();

  const onSubmit = async (data: FieldValues) => {
    // Proper payload validation with zod (if needed)
    if (
      data.email &&
      data.firstName &&
      data.lastName &&
      data.password &&
      data.passwordConfirmation
    ) {
      const formData = data as FormValues;
      await signUp(formData);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={-insets.bottom + 12}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollViewContent,
          { paddingTop: insets.top + 36 },
        ]}
        keyboardShouldPersistTaps='handled'
      >
        <View style={{ paddingHorizontal: 16, gap: 32 }}>
          <Typography variant='h1' color='plum500'>
            Create account
          </Typography>
          <View style={{ paddingHorizontal: 12, gap: 8 }}>
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
      </ScrollView>
      <View style={[styles.bottomContainer, { paddingBottom: insets.bottom }]}>
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
    </KeyboardAvoidingView>
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
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
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
