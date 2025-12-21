export type UserProfile = {
  id: number;
  email: string;
  name: string;
  displayName: string;
  avatarPath: string;
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
