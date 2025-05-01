import * as AuthApi from '@/api/auth';
import { generateErrorMessage, parseApiResponse } from '@/api/client';
import { BOOKS_API_BASE_URL } from '@/constants/constants';
import { ApiResponse, LoginRequest, SignupRequest, User } from '@/types';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthProviderState = {
  accessToken: string | null;
  user: User | null;
  isLoading: boolean;
  login: (requestBody: LoginRequest) => Promise<void>;
  signup: (requestBody: SignupRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUserInfo: () => Promise<void>;
  fetchApiWithAuth: <T>(
    endpoint: string,
    options?: RequestInit
  ) => Promise<ApiResponse<T>>;
};

const AuthProviderContext = createContext<AuthProviderState | undefined>(
  undefined
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (requestBody: LoginRequest) => {
    try {
      const response = await AuthApi.login(requestBody);
      setAccessToken(response.accessToken);
      const user = await AuthApi.getUser(response.accessToken);
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
      const user = await AuthApi.getUser(response.accessToken);
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
      const user = await AuthApi.getUser(accessToken);
      setUser(user);
    } catch (error) {
      setUser(null);
      console.error(error);
      throw new Error('ユーザー情報の取得に失敗しました。');
    }
  };

  const fetchApiWithAuth = async <T,>( // <T,>の「,」は<T>がJSXと解釈されないためにつけている
    endpoint: string,
    options: RequestInit = {}
  ) => {
    const url = `${BOOKS_API_BASE_URL}${endpoint}`;
    let response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      try {
        const newAccessToken = await AuthApi.getAccessToken();
        setAccessToken(newAccessToken);

        response = await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
      } catch {
        logout();
        toast.error('ログインセッションの期限が切れました。', {
          description: '作業を続けるには再度ログインしてください。',
          duration: 5000,
        });
        throw new Error('ログインセッションの期限が切れました。');
      }
    }

    if (!response.ok) {
      throw new Error(await generateErrorMessage(endpoint, response));
    }

    return await parseApiResponse<T>(response);
  };

  useEffect(() => {
    // リロードするとメモリからアクセストークンが消えてしまうので
    // 初期読み込み時にリフレッシュトークンを使って再取得する
    const init = async () => {
      try {
        const accessToken = await AuthApi.getAccessToken();
        setAccessToken(accessToken);
        const user = await AuthApi.getUser(accessToken);
        setUser(user);
      } catch {
        setAccessToken(null);
        setUser(null);
        console.warn('自動ログインできませんでした。');
      }

      setIsLoading(false);
    };
    init();
  }, []);

  const value = {
    accessToken,
    user,
    isLoading,
    login,
    signup,
    logout,
    refreshUserInfo,
    fetchApiWithAuth,
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
