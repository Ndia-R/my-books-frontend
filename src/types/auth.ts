export type LoginRequest = {
  email: string;
  password: string;
};

export interface LoginResponse {
  accessToken: string;
  username: string;
  roles: string[];
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

export interface AccessTokenResponse {
  accessToken: string;
}
