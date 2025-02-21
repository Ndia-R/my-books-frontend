import { BOOKS_API_ENDPOINT } from '@/constants/constants';
import { AccessToken, LoginRequest, LoginResponse, SignupRequest, User } from '@/types';
import { createContext, useEffect, useState } from 'react';

type ContextType = {
  accessToken: string | null;
  user: User | null;
  setUser: (user: User | null) => void;
  login: (loginRequest: LoginRequest) => Promise<boolean>;
  signup: (signupRequest: SignupRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
};

const AuthContext = createContext<ContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
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
      const loginResponse = (await response.json()) as LoginResponse;

      setUser(loginResponse.user);
      setAccessToken(loginResponse.accessToken);
      return true;
    } catch (error) {
      console.error('Failed login:', error);
      setUser(null);
      setAccessToken(null);
      return false;
    }
  };

  const signup = async ({ name, email, password }: SignupRequest) => {
    try {
      const url = `${BOOKS_API_ENDPOINT}/signup`;
      const options: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      };

      await fetch(url, options);
      await login({ email, password });

      return true;
    } catch (error) {
      console.error('Failed signup:', error);
      setAccessToken(null);
      return false;
    }
  };

  const logout = async () => {
    const url = `${BOOKS_API_ENDPOINT}/logout`;
    const options: RequestInit = {
      method: 'POST',
      credentials: 'include',
    };

    await fetch(url, options);
    setUser(null);
    setAccessToken(null);
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
        throw new Error();
      }
      const data = (await response.json()) as AccessToken;

      setAccessToken(data.accessToken);
    } catch {
      setUser(null);
      setAccessToken(null);
    }
  };

  useEffect(() => {
    refreshAccessToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
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
