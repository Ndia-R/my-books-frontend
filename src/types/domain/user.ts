import type { PermissionSet } from '@/constants/permission-sets';

export type UserProfile = {
  id: number;
  displayName: string;
  avatarPath: string;
  username: string;
  email: string;
  familyName: string;
  givenName: string;
  permissionSets: PermissionSet[];
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
