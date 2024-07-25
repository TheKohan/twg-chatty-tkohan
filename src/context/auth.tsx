import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  FC,
  PropsWithChildren,
} from 'react';
import * as SecureStorage from 'expo-secure-store';
import { UserType } from '@chatty/__generated__/graphql';
import { useMutation, useQuery } from '@apollo/client';
import { REGISTER_USER, LOGIN_USER, GET_CURRENT_USER } from '@chatty/graphql';
import { set } from 'react-hook-form';

type LoginData = {
  email: string;
  password: string;
};

type SignUpData = {
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
};

type AuthContextType = {
  user?: UserType;
  loading: boolean;
  error?: string;
  login: (data: LoginData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserType | undefined>(undefined);

  const {
    loading: userLoading,
    error: userError,
    client,
    refetch: refetchUser,
  } = useQuery(GET_CURRENT_USER);
  const [signUpMutation, { loading: signUpLoading, error: signUpError }] =
    useMutation(REGISTER_USER);
  const [loginUserMutation, { loading: loginLoading, error: loginError }] =
    useMutation(LOGIN_USER);

  console.log('signUpError', signUpError);
  console.log('loginError', loginError);
  console.log('userError', userError);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      if (user) return;
      const token = await SecureStorage.getItemAsync('userToken');
      if (token) {
        console.log('REFETCHING USER');
        const userData = await refetchUser();
        setUser(userData.data?.user ?? undefined);
      }
    };

    checkUserLoggedIn();
  }, []);

  const login = async ({ email, password }: LoginData) => {
    const { data } = await loginUserMutation({
      variables: { email, password },
    });
    if (data && data.loginUser && data.loginUser.token) {
      await SecureStorage.setItemAsync('token', data.loginUser.token);
      setUser(data.loginUser.user ?? undefined);
      await client.resetStore();
    } else {
      throw new Error('Login failed');
    }
  };

  const signUp = async ({
    email,
    password,
    passwordConfirmation,
    firstName,
    lastName,
  }: SignUpData) => {
    const { data } = await signUpMutation({
      variables: { email, password, passwordConfirmation, firstName, lastName },
    });
    if (data?.registerUser) {
      await login({ email, password });
    }
  };

  const logout = async () => {
    setUser(undefined);
    await SecureStorage.deleteItemAsync('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: signUpLoading || loginLoading || userLoading,
        error: signUpError?.message || loginError?.message,
        login,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
