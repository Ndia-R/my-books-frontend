export type LoginRequest = {
  email: string;
  password: string;
};

export interface LoginResponse {
  accessToken: string;
  name: string;
  roles: string[];
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface AccessTokenResponse {
  accessToken: string;
}

export interface CustomError extends Error {
  code?: string;
}
