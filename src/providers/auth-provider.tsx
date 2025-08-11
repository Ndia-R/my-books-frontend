import { AUTH_SESSION_EXPIRED_EVENT } from '@/constants/constants';
import * as AuthApi from '@/lib/api/auth';
import { refreshAccessToken, setAccessToken } from '@/lib/api/fetch-client';
import { LoginRequest, SignupRequest } from '@/types';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'sonner';

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthProviderState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (requestBody: LoginRequest) => Promise<void>;
  signup: (requestBody: SignupRequest) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthProviderContext = createContext<AuthProviderState | undefined>(
  undefined
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setisLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (requestBody: LoginRequest) => {
    try {
      const response = await AuthApi.login(requestBody);
      setAccessToken(response.accessToken);
      setIsAuthenticated(true);
    } catch {
      setAccessToken(null);
      setIsAuthenticated(false);
      throw new Error('ログインに失敗しました。');
    }
  };

  const signup = async (requestBody: SignupRequest) => {
    try {
      const response = await AuthApi.signup(requestBody);
      setAccessToken(response.accessToken);
      setIsAuthenticated(true);
    } catch {
      setAccessToken(null);
      setIsAuthenticated(false);
      throw new Error('サインアップに失敗しました。');
    }
  };

  const logout = useCallback(async () => {
    try {
      await AuthApi.logout();
    } catch {
      throw new Error('ログアウトに失敗しました。');
    } finally {
      setAccessToken(null);
      setIsAuthenticated(false);
    }
  }, []);

  // リロードするとメモリからアクセストークンが消えてしまうので
  // 初期読み込み時にリフレッシュトークンを使って再取得する
  // アクセストークンはrefreshAccessToken()内でセットしている
  useEffect(() => {
    const init = async () => {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        // eslint-disable-next-line no-console
        console.warn('自動ログインできませんでした。');
      }
      setisLoading(false);
    };
    init();
  }, []);

  // リフレッシュトークンが期限切れの場合のイベントハンドラ
  useEffect(() => {
    const handleSessionExpired = async () => {
      await logout();
      toast.error(
        'セッションの有効期限が切れました。再ログインしてください。',
        { duration: 5000 }
      );
    };

    window.addEventListener(AUTH_SESSION_EXPIRED_EVENT, handleSessionExpired);
    return () => {
      window.removeEventListener(
        AUTH_SESSION_EXPIRED_EVENT,
        handleSessionExpired
      );
    };
  }, [logout]);

  const value = {
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
  };

  return (
    <AuthProviderContext value={value}>
      {children}
    </AuthProviderContext>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthProviderContext);

  if (context === undefined)
    throw new Error('useAuth must be used within an AuthProvider');

  return context;
};
