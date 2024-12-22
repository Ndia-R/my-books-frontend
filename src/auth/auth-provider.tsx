import * as auth from '@/lib/auth';
import { UserInfo } from '@/types/user';
import { createContext, useState } from 'react';

type LoginType = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserInfo | null;
  login: ({ email, password }: LoginType) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);

  const login = async ({ email, password }: LoginType) => {
    setIsLoading(true);

    console.log('ログイン処理');
    console.log(email, password);

    const data = await auth.login(email, password);

    await auth.getUser(data.accessToken);

    setIsAuthenticated(true);
    setIsLoading(false);
  };

  const logout = async () => {
    console.log('ログアウト処理');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
