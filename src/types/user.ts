export interface User {
  id: number;
  email: string;
  roles: string[];
  name: string;
  avatarUrl: string;
}

export interface ProfileCounts {
  favoriteCount: number;
  bookmarkCount: number;
  reviewCount: number;
}

export interface UserDetails {
  user: User;
  profieleCounts: ProfileCounts;
}

export interface SimpleUserInfo {
  id: number;
  name: string;
  avatarUrl: string;
}

export interface UpdateCurrentUser {
  name: string;
  avatarUrl: string;
}

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ChangeEmail {
  email: string;
  password: string;
}

export interface CheckUsernameExists {
  exists: boolean;
}
