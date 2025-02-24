import { BOOKS_API_ENDPOINT } from '@/constants/constants';
import { AccessToken, ErrorResponse, LoginRequest, SignupRequest, User } from '@/types';
import { createContext, useEffect, useState } from 'react';

type ContextType = {
  accessToken: string | null;
  isLoading: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  login: (requestBody: LoginRequest) => Promise<void>;
  signup: (requestBody: SignupRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<string | null>;
};

const AuthContext = createContext<ContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const login = async ({ email, password }: LoginRequest) => {
    try {
      const url = `${BOOKS_API_ENDPOINT}/login`;
      const options: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`[STATUS] ${response.status} [URL] ${url}`);
      }

      const data = (await response.json()) as AccessToken;
      setAccessToken(data.accessToken);
      const user = await fetchUser(data.accessToken);
      setUser(user);
    } catch (error) {
      setAccessToken(null);
      setUser(null);
      throw new Error('ログインできませんでした。' + error);
    }
  };

  const signup = async ({ email, password, name, avatarUrl }: SignupRequest) => {
    try {
      const url = `${BOOKS_API_ENDPOINT}/signup`;
      const options: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, avatarUrl }),
        credentials: 'include',
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        const data = (await response.json()) as ErrorResponse;
        throw new Error(
          `[STATUS] ${response.status} [MESSAGE] ${data.message} [URL] ${url}`
        );
      }

      const data = (await response.json()) as AccessToken;
      setAccessToken(data.accessToken);
      const user = await fetchUser(data.accessToken);
      setUser(user);
    } catch (error) {
      setAccessToken(null);
      setUser(null);
      throw new Error('サインアップできませんでした。' + error);
    }
  };

  const logout = async () => {
    try {
      const url = `${BOOKS_API_ENDPOINT}/logout`;
      const options: RequestInit = {
        method: 'POST',
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`[STATUS] ${response.status} [URL] ${url}`);
      }

      setAccessToken(null);
      setUser(null);
    } catch (error) {
      throw new Error('ログアウトに失敗しました。' + error);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const url = `${BOOKS_API_ENDPOINT}/refresh-token`;
      const options: RequestInit = {
        method: 'POST',
        credentials: 'include',
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = (await response.json()) as AccessToken;
      setAccessToken(data.accessToken);
      return data.accessToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      setUser(null);
      setAccessToken(null);
      return null;
    }
  };

  const fetchUser = async (accessToken: string) => {
    const url = `${BOOKS_API_ENDPOINT}/me`;
    const options: RequestInit = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`[STATUS] ${response.status} [URL] ${url}`);
    }

    const user = (await response.json()) as User;
    return user;
  };

  useEffect(() => {
    const init = async () => {
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        const user = await fetchUser(newAccessToken);
        setUser(user);
      } else {
        logout();
      }
      setIsLoading(false);
    };
    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isLoading,
        user,
        setUser,
        login,
        signup,
        logout,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
