export interface ApiResponse<T> {
  data: T;
  status: number;
  ok: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  avatarPath: string;
}

export interface AccessToken {
  accessToken: string;
}
