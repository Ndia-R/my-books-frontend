export type User = {
  id: number;
  email: string;
  roles: string[];
  name: string;
  avatarPath: string;
};

export type UserProfile = {
  id: number;
  email: string;
  roles: string[];
  name: string;
  avatarPath: string;
};

export type UserProfileCounts = {
  favoriteCount: number;
  bookmarkCount: number;
  reviewCount: number;
};

export type UpdateUserProfile = {
  name: string;
  avatarPath: string;
};

export type UpdateUserPassword = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type UpdateUserEmail = {
  email: string;
  password: string;
};
