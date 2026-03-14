import type { Group } from '@/shared/config/groups';
import type { Role } from '@/shared/config/roles';
import type { SubscriptionPlan } from '@/shared/config/subscription-plans';

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
  groups: Group[];
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

export type UpdateSubscriptionPlan = {
  subscriptionPlan: SubscriptionPlan;
};
