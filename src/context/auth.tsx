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
import { AUTH_TOKEN_KEY, env } from '@chatty/utils';
import { useGetUser, useLogin, useRegister } from '@chatty/hooks';

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

if (env.nodeEnv === 'development') {
  // This is for local env to not needing to auth everytime
  SecureStorage.setItem(AUTH_TOKEN_KEY, env.authToken ?? '');
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserType | undefined>(undefined);

  const { loading: userLoading, client, refetch: refetchUser } = useGetUser();
  const [signUpMutation, { loading: signUpLoading, error: signUpError }] =
    useRegister();
  const [loginUserMutation, { loading: loginLoading, error: loginError }] =
    useLogin();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      if (user) return;
      const token = await SecureStorage.getItemAsync('token');
      if (token) {
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
      await SecureStorage.setItemAsync(AUTH_TOKEN_KEY, data.loginUser.token);
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
      variables: {
        email,
        password,
        passwordConfirmation,
        firstName,
        lastName,
      },
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
