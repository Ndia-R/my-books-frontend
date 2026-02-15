import { APP_BASE_PATH, BFF_API_BASE_URL } from '@/constants/constants';
import { Role } from '@/constants/roles';
import type { SubscriptionPlan } from '@/constants/subscription-plans';
import { logoutUser } from '@/lib/api/auth';
import { setUnauthorizedHandler } from '@/lib/api/fetch';
import { getUserProfile } from '@/lib/api/users';
import { buildQueryString } from '@/lib/url-builder';
import type { UserProfile } from '@/types/user';
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
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  login: (returnTo?: string) => void;
  signup: (returnTo?: string) => void;
  logout: () => Promise<void>;
  hasRole: (role: Role) => boolean;
  hasAnyRole: (roles: Role[]) => boolean;
  hasPlan: (plan: SubscriptionPlan) => boolean;
  hasAnyPlan: (plans: SubscriptionPlan[]) => boolean;
  handleUnauthorized: () => void;
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
    window.location.href = `${BFF_API_BASE_URL}/login${queryString}`;
  };

  // サインアップ処理（BFFサインアップ画面へリダイレクト）
  const signup = (returnTo?: string) => {
    const returnToPath =
      returnTo || window.location.pathname + window.location.search;
    const queryString = buildQueryString({ return_to: returnToPath });
    window.location.href = `${BFF_API_BASE_URL}/signup${queryString}`;
  };

  // 完全ログアウト（BFFセッション + Keycloakセッションクリア）
  const logout = async () => {
    try {
      await logoutUser();
      // トップページへリダイレクト（vite.config.tsで設定しているbaseに合わせる）
      // ページリロード後、checkAuthStatus()が自動的に認証状態を更新する
      window.location.href = `${APP_BASE_PATH}/`;
    } catch (error) {
      console.error('Complete logout failed:', error);
    }
  };

  // 指定したロールをユーザーが持っているか確認する
  const hasRole = useCallback(
    (role: Role) => {
      // ADMINはすべてのロールを持っていると見なす
      if (userProfile?.roles.includes(Role.ADMIN)) {
        return true;
      }
      return !!userProfile?.roles.includes(role);
    },
    [userProfile]
  );

  // 指定した複数のロールのうち、いずれかをユーザーが持っているか確認する
  const hasAnyRole = useCallback(
    (roles: Role[]) => roles.some((role) => hasRole(role)),
    [hasRole]
  );

  // 指定したサブスクリプションプランをユーザーが持っているか確認する
  const hasPlan = useCallback(
    (plan: SubscriptionPlan) => userProfile?.subscriptionPlan === plan,
    [userProfile]
  );

  // 指定した複数のサブスクリプションプランのうち、いずれかプランザーが持っているか確認する
  const hasAnyPlan = useCallback(
    (plans: SubscriptionPlan[]) => plans.some((plan) => hasPlan(plan)),
    [hasPlan]
  );

  // 401エラー発生時の処理（認証状態リセット + ログイン画面へリダイレクト）
  const handleUnauthorized = useCallback(() => {
    // 認証状態をリセット
    setUserProfile(null);

    // Viteの base パスを除外したアプリケーション内部パスを取得
    const basePath = APP_BASE_PATH;
    let appPath = window.location.pathname;

    // ベースパスで始まる場合は除外（例: /my-books → /）
    if (appPath.startsWith(basePath)) {
      appPath = appPath.slice(basePath.length) || '/';
    }

    const returnToPath = appPath + window.location.search;
    const queryString = buildQueryString({ return_to: returnToPath });
    const redirectUrl = `${BFF_API_BASE_URL}/login${queryString}`;

    window.location.href = redirectUrl;
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
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
    };

    checkAuthStatus();
  }, []);

  // グローバルな401エラーハンドラーを登録
  useEffect(() => {
    setUnauthorizedHandler(handleUnauthorized);
    return () => {
      setUnauthorizedHandler(null);
    };
  }, [handleUnauthorized]);

  const value = {
    isLoading,
    userProfile,
    isAuthenticated,
    setUserProfile,
    login,
    signup,
    logout,
    hasRole,
    hasAnyRole,
    hasPlan,
    hasAnyPlan,
    handleUnauthorized,
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
