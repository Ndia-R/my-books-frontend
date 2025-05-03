import * as AuthApi from '@/lib/api/auth';
import { refreshToken } from '@/lib/api/fetch-api/api-client';
import { setAccessToken } from '@/lib/api/fetch-api/auth-token';
import { getCurrentUser } from '@/lib/api/user';
import { LoginRequest, SignupRequest, User } from '@/types';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthProviderState = {
  user: User | null;
  isLoading: boolean;
  login: (requestBody: LoginRequest) => Promise<void>;
  signup: (requestBody: SignupRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUserInfo: () => Promise<void>;
};

const AuthProviderContext = createContext<AuthProviderState | undefined>(
  undefined
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setisLoading] = useState(true);

  const login = async (requestBody: LoginRequest) => {
    try {
      const response = await AuthApi.login(requestBody);
      setAccessToken(response.accessToken);
      const user = await getCurrentUser();
      setUser(user);
    } catch (error) {
      setAccessToken(null);
      setUser(null);
      console.error(error);
      throw new Error('ログインに失敗しました。');
    }
  };

  const signup = async (requestBody: SignupRequest) => {
    try {
      const response = await AuthApi.signup(requestBody);
      setAccessToken(response.accessToken);
      const user = await getCurrentUser();
      setUser(user);
    } catch (error) {
      setAccessToken(null);
      setUser(null);
      console.error(error);
      throw new Error('サインアップに失敗しました。');
    }
  };

  const logout = async () => {
    try {
      await AuthApi.logout();
    } catch (error) {
      console.error(error);
      throw new Error('ログアウトに失敗しました。');
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  };

  const refreshUserInfo = async () => {
    try {
      const user = await getCurrentUser();
      setUser(user);
    } catch (error) {
      setUser(null);
      console.error(error);
      throw new Error('ユーザー情報の取得に失敗しました。');
    }
  };

  useEffect(() => {
    // リロードするとメモリからアクセストークンが消えてしまうので
    // 初期読み込み時にリフレッシュトークンを使って再取得する
    const init = async () => {
      console.log('provider useEffect');

      try {
        const accessToken = await refreshToken();
        setAccessToken(accessToken);
        const user = await getCurrentUser();
        setUser(user);
      } catch {
        setAccessToken(null);
        setUser(null);
        console.warn('自動ログインできませんでした。');
      } finally {
        setisLoading(false);
      }
    };
    init();
  }, []);

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    refreshUserInfo,
  };

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthProviderContext);

  if (context === undefined)
    throw new Error('useAuth must be used within an AuthProvider');

  return context;
};
