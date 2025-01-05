export interface User {
  id: number;
  email: string;
  roles: string[];
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

export interface CheckNameExistsResponse {
  exists: boolean;
}
