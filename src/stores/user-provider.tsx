import { getCurrentUser } from '@/lib/data';
import { ProfileCounts, User, UserDetails } from '@/types/user';
import { createContext, useEffect, useState } from 'react';

type UserContextType = {
  user: User | undefined;
  profileCounts: ProfileCounts | undefined;
  setUser: (user: UserDetails | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      if (!userDetails) {
        const currentUser = await getCurrentUser();
        setUserDetails(currentUser);
      }
    };

    initializeUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: userDetails?.user,
        profileCounts: userDetails?.profieleCounts,
        setUser: setUserDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
