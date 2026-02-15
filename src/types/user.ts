import type { Role } from '@/constants/roles';
import type { SubscriptionPlan } from '@/constants/subscription-plans';

export type UserProfile = {
  id: number;
  displayName: string;
  avatarPath: string;
  subscriptionPlan: SubscriptionPlan;

  username: string;
  email: string;
  familyName: string;
  givenName: string;
  roles: Role[];
};

export type UserProfileCounts = {
  favoriteCount: number;
  bookmarkCount: number;
  reviewCount: number;
};

export type UpdateUserProfile = {
  displayName: string;
  avatarPath: string;
};
