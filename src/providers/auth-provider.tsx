import { BFF_BASE_URL } from '@/constants/constants';
import { logoutUser } from '@/lib/api/auth';
import { getUserProfile } from '@/lib/api/users';
import { buildQueryString } from '@/lib/utils';
import type { UserProfile } from '@/types';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthProviderState = {
  isLoading: boolean;
  userProfile: UserProfile | null;
  isAuthenticated: boolean;
  login: (returnTo?: string) => void;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
};

const AuthProviderContext = createContext<AuthProviderState | undefined>(
  undefined
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const isAuthenticated = useMemo(() => !!userProfile, [userProfile]);

  // ログイン処理（BFFログイン画面へリダイレクト）
  const login = (returnTo?: string) => {
    const returnToPath =
      returnTo || window.location.pathname + window.location.search;
    const queryString = buildQueryString({ return_to: returnToPath });
    window.location.href = `${BFF_BASE_URL}/login${queryString}`;
  };

  // 完全ログアウト（BFFセッション + Keycloakセッションクリア）
  const logout = async () => {
    try {
      await logoutUser();
      // トップページへリダイレクト（vite.config.tsで設定しているbaseに合わせる）
      // ページリロード後、checkAuthStatus()が自動的に認証状態を更新する
      window.location.href = '/my-books/';
    } catch (error) {
      console.error('Complete logout failed:', error);
    }
  };

  const checkAuthStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      const profile = await getUserProfile();
      setUserProfile(profile);
    } catch (e) {
      // 認証エラーはここでは単にコンソールに出力
      // 未認証状態として処理が継続される
      console.error('Not authenticated or failed to fetch profile:', e);
      setUserProfile(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const value = {
    isLoading,
    userProfile,
    isAuthenticated,
    login,
    logout,
    checkAuthStatus,
    setUserProfile,
  };

  return <AuthProviderContext value={value}>{children}</AuthProviderContext>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthProviderContext);

  if (context === undefined)
    throw new Error('useAuth must be used within an AuthProvider');

  return context;
};
