import type { RoleType } from '@/constants/roles';

export type UserProfile = {
  id: number;
  displayName: string;
  avatarPath: string;
  username: string;
  email: string;
  familyName: string;
  givenName: string;
  roles: RoleType[];
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
