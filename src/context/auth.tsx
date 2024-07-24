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

type AuthContextType = {
  user?: UserType;
  loading: boolean;
  error?: string;
  login: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    passwordConfirmation: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
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
    refetch: refetchUser,
  } = useQuery(GET_CURRENT_USER);
  const [signUpMutation, { loading: signUpLoading, error: signUpError }] =
    useMutation(REGISTER_USER);
  const [loginUserMutation, { loading: loginLoading, error: loginError }] =
    useMutation(LOGIN_USER);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      if (user) return;
      const token = await SecureStorage.getItemAsync('userToken');
      if (token) {
        const userData = await refetchUser();
        setUser(userData.data?.user ?? undefined);
      }
    };

    checkUserLoggedIn();
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await loginUserMutation({
      variables: { email, password },
    });
    if (data && data.loginUser && data.loginUser.token) {
      await SecureStorage.setItemAsync('token', data.loginUser.token);
      setUser(data.loginUser.user ?? undefined);
    } else {
      throw new Error('Login failed');
    }
  };

  const signUp = async (
    email: string,
    password: string,
    passwordConfirmation: string,
    firstName: string,
    lastName: string
  ) => {
    const { data } = await signUpMutation({
      variables: { email, password, passwordConfirmation, firstName, lastName },
    });
    if (data?.registerUser) {
      await login(email, password);
    }
  };

  const logout = async () => {
    await SecureStorage.deleteItemAsync('token');
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: signUpLoading || loginLoading || userLoading,
        error:
          signUpError?.message || loginError?.message || userError?.message,
        login,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
