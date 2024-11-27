import { UserInfo } from '@/types/book';
import { createContext, useState } from 'react';

type LoginType = {
  account: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  login: ({ account, password }: LoginType) => Promise<void>;
  logout: () => Promise<void>;
  user: UserInfo | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);

  const login = async ({ account, password }: LoginType) => {
    console.log('ログイン処理');
    console.log(account, password);

    setUser({
      id: 'xxx',
      account,
      avatarUrl: '/images/avatar05.png',
    });

    setIsAuthenticated(true);
  };

  const logout = async () => {
    console.log('ログアウト処理');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
