export interface User {
  id: number;
  email: string;
  roles: string[];
  name: string;
  avatarPath: string;
}

export interface UserProfile {
  id: number;
  email: string;
  roles: string[];
  name: string;
  avatarPath: string;
}

export interface UserProfileCounts {
  favoriteCount: number;
  bookmarkCount: number;
  reviewCount: number;
}

export interface UpdateUserProfile {
  name: string;
  avatarPath: string;
}

export interface UpdateUserPassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateUserEmail {
  email: string;
  password: string;
}
