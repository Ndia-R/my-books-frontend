import { getUserProfile } from '@/lib/api/user';
import { useAuth } from '@/providers/auth-provider';
import { User } from '@/types';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type UserProviderProps = {
  children: React.ReactNode;
};

type UserProviderState = {
  user: User | null;
  setCurrentUser: () => Promise<void>;
};

const UserProviderContext = createContext<UserProviderState | undefined>(
  undefined
);

export function UserProvider({ children }: UserProviderProps) {
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  const setCurrentUser = useCallback(async () => {
    if (isAuthenticated) {
      const profile = await getUserProfile();
      setUser(profile);
    } else {
      setUser(null);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const init = async () => {
      await setCurrentUser();
    };
    init();
  }, [setCurrentUser]);

  const value = {
    user,
    setCurrentUser,
  };

  return <UserProviderContext value={value}>{children}</UserProviderContext>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserProviderContext);

  if (context === undefined)
    throw new Error('useUser must be used within a UserProvider');

  return context;
};
