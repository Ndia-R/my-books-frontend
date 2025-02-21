import { User } from '@/types/user';

export type LoginRequest = {
  email: string;
  password: string;
};

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface AccessToken {
  accessToken: string;
}

export interface CustomError extends Error {
  code?: string;
}
