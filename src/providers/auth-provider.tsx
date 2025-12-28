import { BFF_BASE_URL } from '@/constants/constants';
import { logoutUser } from '@/lib/api/auth';
import { getUserProfile } from '@/lib/api/users';
import type { UserProfile } from '@/types';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthProviderState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  setUserProfile: (userProfile: UserProfile) => void;
  login: (redirectTo?: string) => void;
  logout: () => Promise<void>;
};

const AuthProviderContext = createContext<AuthProviderState | undefined>(
  undefined
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // ログイン処理（BFFログイン画面へリダイレクト）
  const login = (redirectTo?: string) => {
    const loginUrl = redirectTo
      ? `${BFF_BASE_URL}/login?return_to=${encodeURIComponent(redirectTo)}`
      : `${BFF_BASE_URL}/login`;
    window.location.href = loginUrl;
  };

  // 完全ログアウト（BFFセッション + Keycloakセッションクリア）
  const logout = async () => {
    try {
      await logoutUser();
      setUserProfile(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Complete logout failed:', error);
    }
  };

  const isAuthenticated = useMemo(() => !!userProfile, [userProfile]);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const profile = await getUserProfile();
        setUserProfile(profile);
      } catch (e) {
        console.error('Error fetching profile:', e);
      } finally {
        setIsLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const value = {
    isLoading,
    isAuthenticated,
    userProfile,
    setUserProfile,
    login,
    logout,
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
