import { Button, Input, Loader, Typography } from '@chatty/components';
import { colors } from '@chatty/theme';
import { RoomsNavigationProp } from '@chatty/types';
import { useNavigation } from '@react-navigation/native';
import { FC } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@chatty/context';

type FormValues = {
  email: string;
  password: string;
};

export const Login: FC = () => {
  const insets = useSafeAreaInsets();
  const { navigate } = useNavigation<RoomsNavigationProp>();
  const { login, loading, error } = useAuth();

  const { control, handleSubmit } = useForm<FieldValues>();

  const onSubmit = async (data: FieldValues) => {
    if (data.email && data.password) {
      try {
        const formData = data as FormValues;
        await login(formData);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    // I mean we know how bad it is, but there's not much alternative on Expo Go built in
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={-insets.bottom}
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
            Welcome Back
          </Typography>
          <Typography variant='h2' color='white'>
            Log in and stay in touch with everyone!
          </Typography>
          <View style={{ paddingHorizontal: 12, gap: 8 }}>
            <Input
              control={control}
              name='email'
              label='email-address'
              defaultValue='barbara.sabich@mail.com'
              rules={{
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
              }}
              keyboardType='email-address'
            />
            <Input
              control={control}
              name='password'
              defaultValue='qsiyRk4PNLfGLbC'
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
            {error && (
              <Typography variant='specialText' color='error'>
                Something went wrong, please try again {error}
              </Typography>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={[styles.bottomContainer, { paddingBottom: insets.bottom }]}>
        {loading && <Loader />}
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue300,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  bottomContainer: {
    gap: 16,
    paddingHorizontal: 16,
    bottom: 12,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
