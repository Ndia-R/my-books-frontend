import * as auth from '@/lib/auth';
import { getCurrentUser } from '@/lib/data';
import { User } from '@/types/user';
import { createContext, useEffect, useState } from 'react';

type LoginType = {
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  login: ({ email, password }: LoginType) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (e) {
        console.log(e);
        setUser(null);
      }
    };

    initializeUser();
  }, []);

  const login = async ({ email, password }: LoginType) => {
    try {
      await auth.login(email, password);
      const user = await getCurrentUser();
      setUser(user);
      return true;
    } catch (e) {
      console.log(e);
      setUser(null);
      return false;
    }
  };

  const logout = async () => {
    await auth.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
