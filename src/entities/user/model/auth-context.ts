import type { Group } from '@/shared/config/groups';
import { Role } from '@/shared/config/roles';
import type { SubscriptionPlan } from '@/shared/config/subscription-plans';
import { createContext, useContext } from 'react';
import type { UserProfile } from './types';

export type AuthProviderState = {
  isLoading: boolean;
  userProfile: UserProfile | null;
  isAuthenticated: boolean;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  login: (returnTo?: string) => void;
  signup: (returnTo?: string) => void;
  changePassword: (returnTo?: string) => void;
  logout: () => Promise<void>;
  hasRole: (role: Role) => boolean;
  hasAnyRole: (roles: Role[]) => boolean;
  hasGroup: (group: Group) => boolean;
  hasAnyGroup: (groups: Group[]) => boolean;
  hasPlan: (plan: SubscriptionPlan) => boolean;
  hasAnyPlan: (plans: SubscriptionPlan[]) => boolean;
  handleUnauthorized: () => void;
};

export const AuthProviderContext = createContext<AuthProviderState | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthProviderContext);

  if (context === undefined)
    throw new Error('useAuth must be used within an AuthProvider');

  return context;
};
