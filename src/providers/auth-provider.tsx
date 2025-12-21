import { BFF_BASE_URL } from '@/constants/constants';
import { customFetch, getCsrfToken } from '@/lib/api/fetch-client';
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
  login: () => void;
  logout: () => Promise<void>;
};

const AuthProviderContext = createContext<AuthProviderState | undefined>(
  undefined
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const login = () => {
    window.location.href = `${BFF_BASE_URL}/login`;
  };

  // 完全ログアウト（BFFセッション + Keycloakセッションクリア）
  const logout = async () => {
    console.log('Complete logout!!!');

    try {
      const url = `${BFF_BASE_URL}/logout?complete=true`;
      const options: RequestInit = {
        method: 'POST',
        headers: {
          'X-XSRF-TOKEN': getCsrfToken(),
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      };
      const response = await fetch(url, options);

      if (response.ok) {
        const result = await response.json();
        console.log('Complete logout successful:', result.message);

        setUserProfile(null);

        // 🎯 重要：完全ログアウト後は明示的にログイン画面へリダイレクト
        // これにより次回ログイン時に確実にKeycloak認証画面が表示される
        window.location.href = '/';
      } else {
        console.error('Complete logout failed with status:', response.status);
      }
    } catch (error) {
      console.error('Complete logout failed:', error);
    }
  };

  const isAuthenticated = useMemo(() => !!userProfile, [userProfile]);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const res = await customFetch<UserProfile>('/me/profile');
        setUserProfile(res.data);
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
