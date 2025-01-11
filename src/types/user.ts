export interface User {
  id: number;
  email: string;
  roles: string[];
  name: string;
  avatarUrl: string;
}

export interface SimpleUserInfo {
  id: number;
  name: string;
  avatarUrl: string;
}

export interface UpdateUserRequest {
  name: string;
  avatarUrl: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ChangeEmailRequest {
  email: string;
  password: string;
}

export interface CheckNameExistsResponse {
  exists: boolean;
}
