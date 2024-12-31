import { getCurrentUser } from '@/lib/data';
import { User } from '@/types/user';
import { createContext, useEffect, useState } from 'react';

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };

    initializeUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
